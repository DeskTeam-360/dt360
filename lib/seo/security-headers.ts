/**
 * F13 — standard security response headers (fix report 2026-09-24).
 *
 * Applied via next.config `headers()`. Hiding the nginx `Server` version
 * (`server_tokens off`) must be done on the host nginx — not in this repo.
 *
 * HSTS starts without `includeSubDomains` until every live subdomain is
 * confirmed on HTTPS (report caution).
 */
export const SECURITY_HEADERS: Array<{ key: string; value: string }> = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Report-only first: site loads GoHighLevel + Meta Pixel; tighten after reports settle.
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self'",
  },
];
