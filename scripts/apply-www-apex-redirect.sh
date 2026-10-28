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

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE" >&2
  exit 1
fi

if [[ "$(id -u)" -eq 0 ]]; then
  run() { "$@"; }
else
  run() { sudo -n "$@"; }
fi

if ! run true 2>/dev/null; then
  echo "ERROR: passwordless sudo required to install nginx www→apex redirect." >&2
  echo "Grant the deploy user NOPASSWD for nginx/install/systemctl, then re-run:" >&2
  echo "  bash scripts/apply-www-apex-redirect.sh" >&2
  exit 1
fi

echo "Host diagnostics:"
hostname -f 2>/dev/null || hostname || true
run bash -c 'hostname -I 2>/dev/null || true'
run bash -c 'ls -la /etc/nginx 2>/dev/null | head -40' || true

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
  echo "Could not locate an SSL fullchain for www (check apex nginx ssl_certificate / Let's Encrypt)." >&2
  exit 1
}
KEY="$(dirname "$CERT")/privkey.pem"
if ! run test -f "$KEY"; then
  echo "Missing privkey next to $CERT" >&2
  exit 1
fi

echo "Using cert: $CERT"
TMP="$(mktemp)"
sed \
  -e "s|__SSL_CERTIFICATE__|$CERT|g" \
  -e "s|__SSL_CERTIFICATE_KEY__|$KEY|g" \
  "$TEMPLATE" >"$TMP"

# Install into every common include path so the vhost is actually loaded.
INSTALLED=0
if run test -d "$SITE_AVAILABLE"; then
  run install -m 644 "$TMP" "$SITE_AVAILABLE/$CONF_NAME"
  if run test -d "$SITE_ENABLED"; then
    run ln -sfn "$SITE_AVAILABLE/$CONF_NAME" "$SITE_ENABLED/$CONF_NAME"
  fi
  echo "Installed $SITE_AVAILABLE/$CONF_NAME (+ sites-enabled link if present)"
  INSTALLED=1
fi
if run test -d "$CONF_D"; then
  run install -m 644 "$TMP" "$CONF_D/$CONF_NAME"
  echo "Installed $CONF_D/$CONF_NAME"
  INSTALLED=1
fi
rm -f "$TMP"

if [[ "$INSTALLED" -ne 1 ]]; then
  echo "ERROR: neither $SITE_AVAILABLE nor $CONF_D exists on this host." >&2
  exit 1
fi

# If another vhost also claims www, prefer ours by renaming conflicting names.
# Duplicate server_name → nginx keeps the first loaded; welcome/default often wins.
run bash -c '
shopt -s nullglob
for f in /etc/nginx/sites-enabled/* /etc/nginx/sites-available/* /etc/nginx/conf.d/*; do
  base=$(basename "$f")
  [[ "$base" == "www-to-apex.conf" ]] && continue
  [[ -f "$f" || -L "$f" ]] || continue
  target="$f"
  [[ -L "$f" ]] && target=$(readlink -f "$f" || true)
  [[ -n "$target" && -f "$target" ]] || continue
  if grep -qE "server_name[^;]*www\.deskteam360\.com" "$target" 2>/dev/null; then
    echo "Stripping www.deskteam360.com from server_name in $target"
    sed -i -E "s/www\.deskteam360\.com[[:space:]]*//g" "$target"
  fi
done
' || true

echo "Testing nginx config..."
run nginx -t

echo "Active www server blocks (nginx -T):"
run bash -c "nginx -T 2>/dev/null | grep -n \"www.deskteam360.com\" | head -40" || true

echo "Reloading nginx..."
run systemctl reload nginx || run service nginx reload

echo "Smoke checks (loopback Host: www) — must be 301/308 to apex..."
fail=0
if command -v curl >/dev/null 2>&1; then
  for scheme in https http; do
    for path in "/" "/blog/what-is-insourcing?x=1"; do
      headers="$(curl -skI --max-redirs 0 -H "Host: www.deskteam360.com" \
        "${scheme}://127.0.0.1${path}" || true)"
      code="$(printf '%s' "$headers" | awk 'NR==1{print $2}')"
      loc="$(printf '%s' "$headers" | tr -d '\r' | awk 'BEGIN{IGNORECASE=1} /^location:/{print $2; exit}')"
      echo "  ${scheme} www${path} -> ${code:-err} Location: ${loc:-none}"
      case "${code:-}" in
        301|308)
          case "${loc:-}" in
            https://deskteam360.com/*|https://deskteam360.com) ;;
            *)
              echo "ERROR: Location must be https://deskteam360.com… (got ${loc:-none})" >&2
              fail=1
              ;;
          esac
          ;;
        *)
          echo "ERROR: expected 301/308, got ${code:-err}" >&2
          fail=1
          ;;
      esac
    done
  done
else
  echo "ERROR: curl missing; cannot smoke-test www redirect" >&2
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  echo "ERROR: www→apex redirect not active on this host after reload." >&2
  exit 1
fi

echo "Applied $CONF_NAME"
