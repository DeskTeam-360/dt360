#!/usr/bin/env bash
# Configure origin nginx so www.deskteam360.com permanently redirects to
# https://deskteam360.com while preserving path and query.
# Safe to re-run (idempotent). Needs passwordless sudo for nginx install/reload.
set -euo pipefail

SITE_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
SITE_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
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
  # Never write diagnostics to stdout — callers capture command substitutions.
  printf '%s\n' "$*" >>"$DEBUG_OUT"
  printf '%s\n' "$*" >&2
}

debug_reset

if ! run true 2>/dev/null; then
  debug "ERROR: passwordless sudo required"
  echo "ERROR: passwordless sudo required to install nginx www→apex redirect." >&2
  exit 1
fi
debug "sudo=ok"

# Undo a previous failed strip that left invalid server_name directives on disk.
restore_strip_backups() {
  run bash -c '
shopt -s nullglob
for bak in /etc/nginx/sites-available/*.bak-www-redirect /etc/nginx/conf.d/*.bak-www-redirect; do
  target="${bak%.bak-www-redirect}"
  echo "Restoring $bak -> $target"
  cp -a "$bak" "$target"
  rm -f "$bak"
done
# Remove duplicate copy in conf.d from older script versions (sites-enabled is enough).
rm -f /etc/nginx/conf.d/www-to-apex.conf
' >>"$DEBUG_OUT" 2>&1 || true
}
debug "restoring any *.bak-www-redirect from prior failed runs"
restore_strip_backups

find_cert_and_key() {
  local apex_conf cert key

  apex_conf="$(run bash -c "ls -1 $SITE_AVAILABLE/deskteam360.com.conf $SITE_ENABLED/deskteam360.com.conf 2>/dev/null | head -n 1" || true)"
  if [[ -z "${apex_conf:-}" ]]; then
    apex_conf="$(run bash -c "grep -Rsl --include='*.conf' -E 'server_name[^;]*\bdeskteam360\.com\b' /etc/nginx 2>/dev/null | head -n 1" || true)"
  fi
  debug "apex_conf=${apex_conf:-none}"

  if [[ -n "${apex_conf:-}" ]]; then
    cert="$(run bash -c "grep -E '^[[:space:]]*ssl_certificate[[:space:]]+' '$apex_conf'" \
      | grep -v ssl_certificate_key | awk '{print $2}' | tr -d ';' | head -n 1 || true)"
    key="$(run bash -c "grep -E '^[[:space:]]*ssl_certificate_key[[:space:]]+' '$apex_conf'" \
      | awk '{print $2}' | tr -d ';' | head -n 1 || true)"
  fi

  if [[ -z "${cert:-}" || -z "${key:-}" ]]; then
    for candidate in \
      /etc/letsencrypt/live/deskteam360.com/fullchain.pem \
      /etc/letsencrypt/live/www.deskteam360.com/fullchain.pem; do
      if run test -f "$candidate"; then
        cert="$candidate"
        key="$(dirname "$candidate")/privkey.pem"
        break
      fi
    done
  fi

  if [[ -z "${cert:-}" || -z "${key:-}" ]]; then
    return 1
  fi

  case "$cert" in
    *snakeoil*) debug "ERROR: refused snakeoil cert $cert"; return 1 ;;
  esac

  if ! run test -f "$cert" || ! run test -f "$key"; then
    debug "ERROR: cert/key missing ($cert / $key)"
    return 1
  fi

  printf '%s\t%s\n' "$cert" "$key"
}

CERT_KEY="$(find_cert_and_key)" || {
  debug "ERROR: could not resolve apex TLS cert/key"
  echo "Could not locate apex SSL cert/key for www redirect vhost." >&2
  exit 1
}
CERT="$(printf '%s' "$CERT_KEY" | cut -f1)"
KEY="$(printf '%s' "$CERT_KEY" | cut -f2)"
debug "cert=$CERT"
debug "key=$KEY"

TMP="$(mktemp)"
sed \
  -e "s|__SSL_CERTIFICATE__|$CERT|g" \
  -e "s|__SSL_CERTIFICATE_KEY__|$KEY|g" \
  "$TEMPLATE" >"$TMP"

if ! run test -d "$SITE_AVAILABLE"; then
  debug "ERROR: $SITE_AVAILABLE missing"
  rm -f "$TMP"
  exit 1
fi

run install -m 644 "$TMP" "$SITE_AVAILABLE/$CONF_NAME"
rm -f "$TMP"
run ln -sfn "$SITE_AVAILABLE/$CONF_NAME" "$SITE_ENABLED/$CONF_NAME"
# Avoid loading the same vhost twice.
run rm -f /etc/nginx/conf.d/"$CONF_NAME"

{
  echo "--- installed www-to-apex.conf ---"
  run cat "$SITE_AVAILABLE/$CONF_NAME"
} >>"$DEBUG_OUT"

# default/deskteam360 load before www-to-apex alphabetically; duplicate server_name
# keeps the FIRST vhost. Remove www from other confs without leaving empty server_name.
STRIP_PY="$ROOT_DIR/scripts/nginx-strip-www-server-name.py"
debug "removing www.deskteam360.com from other server_name directives (safe)"
if [[ ! -f "$STRIP_PY" ]]; then
  debug "ERROR: missing $STRIP_PY"
  exit 1
fi
run python3 "$STRIP_PY" >>"$DEBUG_OUT" 2>&1

debug "nginx -t"
NGINX_T_OUT="$(mktemp)"
if ! run nginx -t >"$NGINX_T_OUT" 2>&1; then
  cat "$NGINX_T_OUT" | tee -a "$DEBUG_OUT" >&2
  debug "ERROR: nginx -t failed; restoring *.bak-www-redirect"
  restore_strip_backups
  run nginx -t >>"$DEBUG_OUT" 2>&1 || true
  rm -f "$NGINX_T_OUT"
  echo "ERROR: nginx -t failed after installing www→apex (backups restored)" >&2
  exit 1
fi
cat "$NGINX_T_OUT" >>"$DEBUG_OUT"
rm -f "$NGINX_T_OUT"

{
  echo "--- nginx -T www matches ---"
  run bash -c "nginx -T 2>/dev/null | grep -nE \"www\\.deskteam360\\.com|www-to-apex\" | head -80" || true
  echo "--- sites-enabled ---"
  run ls -la /etc/nginx/sites-enabled
} >>"$DEBUG_OUT"

debug "reload nginx"
run systemctl reload nginx >>"$DEBUG_OUT" 2>&1 \
  || run service nginx reload >>"$DEBUG_OUT" 2>&1 \
  || run nginx -s reload >>"$DEBUG_OUT" 2>&1

debug "smoke (SNI via --resolve)"
fail=0
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
        *) debug "ERROR: bad Location"; fail=1 ;;
      esac
      ;;
    *) debug "ERROR: expected 301/308"; fail=1 ;;
  esac
done <<'EOF'
https 443 /
https 443 /blog/what-is-insourcing?x=1
http 80 /
http 80 /blog/what-is-insourcing?x=1
EOF

if [[ "$fail" -ne 0 ]]; then
  debug "RESULT=FAIL"
  echo "ERROR: www→apex redirect not active on loopback. See https://deskteam360.com/www-redirect-debug.txt" >&2
  exit 1
fi

debug "RESULT=OK"
echo "Applied $CONF_NAME"
