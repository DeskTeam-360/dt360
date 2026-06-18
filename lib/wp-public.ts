/** Legacy WP hosts whose /wp-content/ URLs should resolve to the current CMS origin. */
const LEGACY_WP_CONTENT_URL =
  /https?:\/\/(?:www\.)?(?:deskteam360|clone\.deskteam360)\.com(\/wp-content\/)/gi;

/** WordPress CMS origin used for media URL rewriting (portal). */
export function getWordPressMediaOrigin(): string {
  const explicit =
    process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL?.replace(/\/$/, "") ??
    process.env.WORDPRESS_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const api = process.env.WORDPRESS_API_URL?.replace(/\/$/, "");
  if (api) {
    try {
      return new URL(api).origin;
    } catch {
      // ignore invalid URL
    }
  }

  return "";
}

/** Rewrite legacy deskteam360.com / clone wp-content URLs to the current CMS origin. */
export function rewriteWordPressMediaUrl(url: string | undefined | null): string {
  if (!url) return "";
  const origin = getWordPressMediaOrigin();
  if (!origin) return url;
  return url.replace(LEGACY_WP_CONTENT_URL, `${origin}$1`);
}

/** Rewrite wp-content URLs inside WordPress HTML content. */
export function rewriteWordPressContentHtml(html: string | undefined | null): string {
  if (!html) return html ?? "";
  const origin = getWordPressMediaOrigin();
  if (!origin) return html;
  return html.replace(LEGACY_WP_CONTENT_URL, `${origin}$1`);
}

/** WordPress site origin for public/client-safe link building. */
export function getPublicWordPressOrigin(): string {
  return process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL?.replace(/\/$/, "") ?? "";
}

/** Hostnames treated as same-site for blog link resolution (client-safe). */
export function getWordPressInternalHostnames(): string[] {
  const hosts = new Set<string>(["deskteam360.com", "www.deskteam360.com"]);
  const origin = getPublicWordPressOrigin();

  if (origin) {
    try {
      hosts.add(new URL(origin).hostname);
    } catch {
      // ignore invalid URL
    }
  }

  return [...hosts];
}

/** Build an absolute WordPress blog URL from a path segment. */
export function wordPressBlogPath(path: string): string {
  const origin = getPublicWordPressOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${normalized}` : normalized;
}
