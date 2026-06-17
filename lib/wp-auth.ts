/** Shared WordPress / Gravity Forms REST auth (Application Password or JWT). */

export function getWordPressSiteOrigin(): string {
  const explicit = process.env.WORDPRESS_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const apiUrl = process.env.WORDPRESS_API_URL;
  if (apiUrl) {
    try {
      return new URL(apiUrl).origin;
    } catch {
      // fall through
    }
  }

  const publicSite = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL?.replace(/\/$/, "");
  if (publicSite) return publicSite;

  throw new Error("Missing WORDPRESS_SITE_URL (or WORDPRESS_API_URL) environment variable.");
}

export function getWordPressAuthHeaders(): Record<string, string> {
  const token = process.env.WORDPRESS_AUTH_TOKEN;
  const user = process.env.WORDPRESS_USER;

  if (!token) return {};

  if (token.startsWith("ey")) {
    return { Authorization: `Bearer ${token}` };
  }

  if (user && token) {
    const auth = Buffer.from(`${user}:${token}`).toString("base64");
    return { Authorization: `Basic ${auth}` };
  }

  return { Authorization: `Bearer ${token}` };
}
