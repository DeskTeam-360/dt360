#!/usr/bin/env bash
# Configure origin nginx so www.deskteam360.com permanently redirects to
# https://deskteam360.com while preserving path and query.
# Safe to re-run (idempotent). Needs passwordless sudo for nginx install/reload.
set -euo pipefail

SITE_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
SITE_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
CONF_D="${NGINX_CONF_D:-/etc/nginx/conf.d}"
CONF_NAME="www-to-apex.conf"
TEMPLATE_REL="deploy/nginx/www-to-apex.conf.template"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$ROOT_DIR/$TEMPLATE_REL"
DEBUG_OUT="$ROOT_DIR/public/www-redirect-debug.txt"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE" >&2
  exit 1
fi

if [[ "$(id -u)" -eq 0 ]]; then
  run() { "$@"; }
else
  run() { sudo -n "$@"; }
fi

debug_reset() {
  mkdir -p "$(dirname "$DEBUG_OUT")"
  {
    echo "ts=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo "user=$(id -u -n) uid=$(id -u)"
    echo "pwd=$(pwd)"
    echo "host=$(hostname -f 2>/dev/null || hostname)"
    hostname -I 2>/dev/null || true
  } >"$DEBUG_OUT"
}

debug() {
  printf '%s\n' "$*" | tee -a "$DEBUG_OUT"
}

debug_reset

if ! run true 2>/dev/null; then
  debug "ERROR: passwordless sudo required"
  echo "ERROR: passwordless sudo required to install nginx www→apex redirect." >&2
  exit 1
fi

debug "sudo=ok"
run bash -c 'ls -la /etc/nginx 2>/dev/null; echo ---; ls -la /etc/nginx/sites-enabled 2>/dev/null; echo ---; ls -la /etc/nginx/conf.d 2>/dev/null' \
  >>"$DEBUG_OUT" 2>&1 || true

find_cert() {
  local path live preferred

  path="$(
    run bash -c "grep -RhsE '^[[:space:]]*ssl_certificate[[:space:]]+' \
      /etc/nginx 2>/dev/null" \
      | grep -v 'ssl_certificate_key' \
      | grep -vi 'www-to-apex' \
      | awk '{print $2}' | tr -d ';' \
      | while read -r p; do
          if run test -f "$p"; then echo "$p"; break; fi
        done
  )"
  if [[ -n "${path:-}" ]]; then
    echo "$path"
    return 0
  fi

  live="${LETSENCRYPT_LIVE:-/etc/letsencrypt/live}"
  preferred="$live/deskteam360.com/fullchain.pem"
  if run test -f "$preferred"; then
    echo "$preferred"
    return 0
  fi

  path="$(run bash -c "find '$live' -type f -name fullchain.pem 2>/dev/null | head -n 1" || true)"
  if [[ -n "${path:-}" ]] && run test -f "$path"; then
    echo "$path"
    return 0
  fi

  return 1
}

CERT="$(find_cert)" || {
  debug "ERROR: no SSL fullchain found"
  echo "Could not locate an SSL fullchain for www." >&2
  exit 1
}
KEY="$(dirname "$CERT")/privkey.pem"
if ! run test -f "$KEY"; then
  debug "ERROR: missing privkey for $CERT"
  echo "Missing privkey next to $CERT" >&2
  exit 1
fi

debug "cert=$CERT"
TMP="$(mktemp)"
sed \
  -e "s|__SSL_CERTIFICATE__|$CERT|g" \
  -e "s|__SSL_CERTIFICATE_KEY__|$KEY|g" \
  "$TEMPLATE" >"$TMP"

INSTALLED_PATHS=()
if run test -d "$SITE_AVAILABLE"; then
  run install -m 644 "$TMP" "$SITE_AVAILABLE/$CONF_NAME"
  INSTALLED_PATHS+=("$SITE_AVAILABLE/$CONF_NAME")
  if run test -d "$SITE_ENABLED"; then
    run ln -sfn "$SITE_AVAILABLE/$CONF_NAME" "$SITE_ENABLED/$CONF_NAME"
    INSTALLED_PATHS+=("$SITE_ENABLED/$CONF_NAME")
  fi
fi
if run test -d "$CONF_D"; then
  run install -m 644 "$TMP" "$CONF_D/$CONF_NAME"
  INSTALLED_PATHS+=("$CONF_D/$CONF_NAME")
fi

# Also drop next to the apex vhost directory (covers nonstandard layouts).
APEX_HIT="$(run bash -c "grep -Rsl --include='*.conf' -E 'server_name[^;]*\bdeskteam360\.com\b' /etc/nginx 2>/dev/null | head -n 1" || true)"
if [[ -n "${APEX_HIT:-}" ]]; then
  APEX_DIR="$(dirname "$(run readlink -f "$APEX_HIT" 2>/dev/null || echo "$APEX_HIT")")"
  debug "apex_conf=$APEX_HIT apex_dir=$APEX_DIR"
  if [[ -n "$APEX_DIR" && "$APEX_DIR" != "$SITE_AVAILABLE" && "$APEX_DIR" != "$CONF_D" ]]; then
    run install -m 644 "$TMP" "$APEX_DIR/$CONF_NAME"
    INSTALLED_PATHS+=("$APEX_DIR/$CONF_NAME")
  fi
fi
rm -f "$TMP"

debug "installed=${INSTALLED_PATHS[*]:-none}"
if [[ "${#INSTALLED_PATHS[@]}" -eq 0 ]]; then
  debug "ERROR: no install path"
  echo "ERROR: could not find an nginx conf directory to install into." >&2
  exit 1
fi

# Duplicate server_name → first wins; strip www from other vhosts.
run bash -c '
shopt -s nullglob
for f in /etc/nginx/sites-enabled/* /etc/nginx/sites-available/* /etc/nginx/conf.d/*; do
  base=$(basename "$f")
  [[ "$base" == "www-to-apex.conf" ]] && continue
  [[ -e "$f" ]] || continue
  target=$(readlink -f "$f" 2>/dev/null || echo "$f")
  [[ -f "$target" ]] || continue
  if grep -qE "server_name[^;]*www\.deskteam360\.com" "$target" 2>/dev/null; then
    echo "Stripping www.deskteam360.com from $target"
    sed -i -E "s/www\.deskteam360\.com[[:space:]]*//g" "$target"
  fi
done
' >>"$DEBUG_OUT" 2>&1 || true

debug "nginx -t..."
if ! run nginx -t >>"$DEBUG_OUT" 2>&1; then
  debug "ERROR: nginx -t failed"
  echo "ERROR: nginx -t failed after installing www→apex" >&2
  exit 1
fi

{
  echo "--- nginx -T www matches ---"
  run bash -c "nginx -T 2>/dev/null | grep -n \"www.deskteam360.com\" | head -50" || true
} >>"$DEBUG_OUT"

debug "reload nginx"
run systemctl reload nginx >>"$DEBUG_OUT" 2>&1 \
  || run service nginx reload >>"$DEBUG_OUT" 2>&1 \
  || run nginx -s reload >>"$DEBUG_OUT" 2>&1

debug "smoke (SNI via --resolve)..."
fail=0
if ! command -v curl >/dev/null 2>&1; then
  debug "ERROR: curl missing"
  fail=1
else
  # Critical: use --resolve so TLS SNI is www.deskteam360.com (Host header alone is not enough).
  while read -r scheme port path; do
    url="${scheme}://www.deskteam360.com${path}"
    headers="$(curl -skI --max-redirs 0 --resolve "www.deskteam360.com:${port}:127.0.0.1" "$url" || true)"
    code="$(printf '%s' "$headers" | awk 'NR==1{print $2}')"
    loc="$(printf '%s' "$headers" | tr -d '\r' | awk 'BEGIN{IGNORECASE=1} /^location:/{print $2; exit}')"
    line="  ${scheme} www${path} -> ${code:-err} Location: ${loc:-none}"
    debug "$line"
    echo "$line"
    case "${code:-}" in
      301|308)
        case "${loc:-}" in
          https://deskteam360.com|https://deskteam360.com/*) ;;
          *)
            debug "ERROR: bad Location"
            fail=1
            ;;
        esac
        ;;
      *)
        debug "ERROR: expected 301/308"
        fail=1
        ;;
    esac
  done <<'EOF'
https 443 /
https 443 /blog/what-is-insourcing?x=1
http 80 /
http 80 /blog/what-is-insourcing?x=1
EOF
fi

if [[ "$fail" -ne 0 ]]; then
  debug "RESULT=FAIL"
  echo "ERROR: www→apex redirect not active on loopback after reload. See /www-redirect-debug.txt on apex after next successful static sync, or $DEBUG_OUT on server." >&2
  exit 1
fi

debug "RESULT=OK"
echo "Applied $CONF_NAME"
