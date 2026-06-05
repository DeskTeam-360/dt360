/** Shared WordPress / Gravity Forms REST auth (Application Password or JWT). */

export function getWordPressSiteOrigin(): string {
  const explicit = process.env.WORDPRESS_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const apiUrl =
    process.env.WORDPRESS_URL ||
    process.env.WORDPRESS_API_URL ||
    "https://clone.deskteam360.com/endpoint";

  try {
    return new URL(apiUrl).origin;
  } catch {
    return "https://clone.deskteam360.com";
  }
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
