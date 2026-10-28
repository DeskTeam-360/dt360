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

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE" >&2
  exit 1
fi

# Non-interactive only — CI SSH has no TTY for a password prompt.
if [[ "$(id -u)" -eq 0 ]]; then
  SUDO=()
  run() { "$@"; }
else
  SUDO=(sudo -n)
  run() { sudo -n "$@"; }
fi

if ! run true 2>/dev/null; then
  echo "ERROR: passwordless sudo required to install nginx www→apex redirect." >&2
  echo "Grant the deploy user NOPASSWD for nginx/install/systemctl, then re-run:" >&2
  echo "  bash scripts/apply-www-apex-redirect.sh" >&2
  exit 1
fi

# Resolve cert paths. Prefer paths already used by apex vhost (readable conf),
# then Let's Encrypt layout via sudo (live/ is often mode 700).
find_cert() {
  local path

  # 1) ssl_certificate from existing enabled/available configs (apex site)
  path="$(
    run bash -c "grep -RhsE '^[[:space:]]*ssl_certificate[[:space:]]+' \
      '$SITE_ENABLED' '$SITE_AVAILABLE' 2>/dev/null" \
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

  # 2) Preferred LE name
  local live="${LETSENCRYPT_LIVE:-/etc/letsencrypt/live}"
  local preferred="$live/deskteam360.com/fullchain.pem"
  if run test -f "$preferred"; then
    echo "$preferred"
    return 0
  fi

  # 3) Any LE fullchain
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

run install -m 644 "$TMP" "$SITE_AVAILABLE/$CONF_NAME"
rm -f "$TMP"

run ln -sfn "$SITE_AVAILABLE/$CONF_NAME" "$SITE_ENABLED/$CONF_NAME"

if run bash -c "grep -Rsl --include='*.conf' 'server_name.*www\\.deskteam360\\.com' \
  '$SITE_AVAILABLE' '$SITE_ENABLED' 2>/dev/null | grep -v '$CONF_NAME'" \
  >/tmp/www-server-name-hits.txt 2>/dev/null; then
  echo "Note: other nginx confs also mention www.deskteam360.com:"
  cat /tmp/www-server-name-hits.txt || true
fi

echo "Testing nginx config..."
run nginx -t
echo "Reloading nginx..."
run systemctl reload nginx

echo "Smoke checks (origin, Host: www)..."
if command -v curl >/dev/null 2>&1; then
  for path in "/" "/blog/what-is-insourcing?x=1"; do
    code="$(curl -skI -o /dev/null -w '%{http_code}' --max-redirs 0 \
      -H "Host: www.deskteam360.com" "https://127.0.0.1$path" || true)"
    loc="$(curl -skI --max-redirs 0 -H "Host: www.deskteam360.com" "https://127.0.0.1$path" \
      | tr -d '\r' | awk 'BEGIN{IGNORECASE=1} /^location:/{print $2; exit}')"
    echo "  https www$path -> $code Location: ${loc:-none}"
  done
fi

echo "Applied $CONF_NAME"
