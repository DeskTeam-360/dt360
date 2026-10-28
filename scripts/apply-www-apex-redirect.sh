#!/usr/bin/env bash
# Configure origin nginx so www.deskteam360.com permanently redirects to
# https://deskteam360.com while preserving path and query.
# Safe to re-run (idempotent). Requires sudo for nginx paths.
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

if [[ "$(id -u)" -eq 0 ]]; then
  SUDO=()
else
  SUDO=(sudo)
fi

find_cert() {
  local live="${LETSENCRYPT_LIVE:-/etc/letsencrypt/live}"
  local preferred="$live/deskteam360.com/fullchain.pem"
  if [[ -f "$preferred" ]]; then
    echo "$preferred"
    return 0
  fi
  # Fallback: first fullchain that exists under live/
  local found
  found="$(find "$live" -type f -name fullchain.pem 2>/dev/null | head -n 1 || true)"
  if [[ -n "$found" ]]; then
    echo "$found"
    return 0
  fi
  return 1
}

CERT="$(find_cert)" || {
  echo "Could not locate Let's Encrypt fullchain.pem under /etc/letsencrypt/live" >&2
  exit 1
}
KEY="$(dirname "$CERT")/privkey.pem"
if [[ ! -f "$KEY" ]]; then
  echo "Missing privkey next to $CERT" >&2
  exit 1
fi

echo "Using cert: $CERT"
TMP="$(mktemp)"
sed \
  -e "s|__SSL_CERTIFICATE__|$CERT|g" \
  -e "s|__SSL_CERTIFICATE_KEY__|$KEY|g" \
  "$TEMPLATE" >"$TMP"

"${SUDO[@]}" install -m 644 "$TMP" "$SITE_AVAILABLE/$CONF_NAME"
rm -f "$TMP"

# Enable site (replace dangling symlink if needed)
"${SUDO[@]}" ln -sfn "$SITE_AVAILABLE/$CONF_NAME" "$SITE_ENABLED/$CONF_NAME"

# If a default site explicitly lists www, leave a note (redirect block still wins by name match).
if grep -Rsl --include='*.conf' 'server_name.*www\.deskteam360\.com' "$SITE_AVAILABLE" "$SITE_ENABLED" 2>/dev/null \
  | grep -v "$CONF_NAME" >/tmp/www-server-name-hits.txt 2>/dev/null; then
  echo "Note: other nginx confs also mention www.deskteam360.com:"
  cat /tmp/www-server-name-hits.txt || true
fi

echo "Testing nginx config..."
"${SUDO[@]}" nginx -t
echo "Reloading nginx..."
"${SUDO[@]}" systemctl reload nginx

echo "Smoke checks (origin, Host: www)..."
# Local loopback checks if curl available; otherwise skip.
if command -v curl >/dev/null 2>&1; then
  for path in "/" "/blog/what-is-insourcing?x=1"; do
    code="$(curl -sI -o /dev/null -w '%{http_code}' --max-redirs 0 \
      -H "Host: www.deskteam360.com" "https://127.0.0.1$path" -k || true)"
    loc="$(curl -sI --max-redirs 0 -H "Host: www.deskteam360.com" "https://127.0.0.1$path" -k \
      | tr -d '\r' | awk 'BEGIN{IGNORECASE=1} /^location:/{print $2; exit}')"
    echo "  https www$path -> $code Location: ${loc:-none}"
  done
fi

echo "Applied $CONF_NAME"
