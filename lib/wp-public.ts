import { getGate5ImageAlt } from "@/data/gate5ImageAlts";

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

/**
 * Oversized WP media swapped for local optimized assets (SEO audit P2 showcase GIF).
 * Match on filename so portal/clone hosts both resolve.
 */
const WORDPRESS_MEDIA_LOCAL_OVERRIDES: Record<string, string> = {
  "Showcase-Christmas-Card-Aluminex-Inc-5414.gif":
    "/images/showcase/Showcase-Christmas-Card-Aluminex-Inc-5414.webp",
};

function localOverrideForMediaUrl(url: string): string | undefined {
  try {
    const path = url.startsWith("http")
      ? new URL(url).pathname
      : url.split("?")[0] ?? url;
    const file = path.split("/").pop()?.trim();
    if (!file) return undefined;
    return WORDPRESS_MEDIA_LOCAL_OVERRIDES[file];
  } catch {
    return undefined;
  }
}

/** Rewrite legacy deskteam360.com / clone wp-content URLs to the current CMS origin. */
export function rewriteWordPressMediaUrl(url: string | undefined | null): string {
  if (!url) return "";
  const local = localOverrideForMediaUrl(url);
  if (local) return local;
  const origin = getWordPressMediaOrigin();
  if (!origin) return url;
  return url.replace(LEGACY_WP_CONTENT_URL, `${origin}$1`);
}

/** Dead internal booking host (SEO developer-report-v2 P1.1). */
const DEAD_SCHEDULE_DEMO_HREF =
  /https?:\/\/internal\.deskteam360\.com\/deskteam360-schedule-demo-call\/?/gi;

/** Old maintenance-cost slug → guide (SEO developer-report-v2 P1.3). */
const OLD_MAINTENANCE_COST_HREF =
  /(?:https?:\/\/(?:www\.)?deskteam360\.com)?\/blog\/website-maintenance-cost(?!-guide)\/?/gi;

/** Missing post — unwrap link, keep anchor text (SEO developer-report D1). */
const MISSING_DELEGATE_WITHOUT_CONTROL_ANCHOR =
  /<a\b[^>]*\bhref=["'](?:https?:\/\/(?:www\.)?deskteam360\.com)?\/blog\/how-to-delegate-without-losing-control\/?["'][^>]*>([\s\S]*?)<\/a>/gi;

/**
 * P2 redirecting inlinks — seven blog pairs that still use a trailing slash.
 * Source anchors stay the same; only the href loses the final "/".
 * Slugs: marketing-implementation-team-for-agencies,
 * how-to-scale-a-marketing-agency-without-hiring,
 * white-label-vs-in-house-agency-production.
 */
const BLOG_TRAILING_SLASH_HREF =
  /((?:https?:\/\/(?:www\.)?deskteam360\.com)?\/blog\/(?:marketing-implementation-team-for-agencies|how-to-scale-a-marketing-agency-without-hiring|white-label-vs-in-house-agency-production))\/(?=[?"'#\s>]|$)/gi;

/** Rewrite wp-content URLs inside WordPress HTML content. */
export function rewriteWordPressContentHtml(html: string | undefined | null): string {
  if (!html) return html ?? "";
  const origin = getWordPressMediaOrigin();
  let out = origin ? html.replace(LEGACY_WP_CONTENT_URL, `${origin}$1`) : html;

  // P1.1 — dead demo host → live booking page
  out = out.replace(DEAD_SCHEDULE_DEMO_HREF, "/book-a-call");

  // P1.3 — broken maintenance-cost links → guide
  out = out.replace(OLD_MAINTENANCE_COST_HREF, "/blog/website-maintenance-cost-guide");

  // D1 — missing post: keep surrounding text, drop the href
  out = out.replace(MISSING_DELEGATE_WITHOUT_CONTROL_ANCHOR, "$1");

  // P2 — trailing-slash blog hrefs that only resolve via redirect (L05–L06, L08–L12).
  // Keep absolute or root-relative form; strip the final slash before ?, #, or ".
  out = out.replace(BLOG_TRAILING_SLASH_HREF, "$1");

  // Gate 5 F16 — apply approved alts to <img> tags when we have a match.
  out = out.replace(/<img\b([^>]*?)>/gi, (full, attrs: string) => {
    const srcMatch = attrs.match(/\bsrc=["']([^"']+)["']/i);
    if (!srcMatch) return full;
    const alt = getGate5ImageAlt(srcMatch[1]);
    if (alt === undefined) return full;
    if (/\balt=["']/.test(attrs)) {
      return `<img${attrs.replace(/\balt=["'][^"']*["']/i, `alt="${alt.replace(/"/g, "&quot;")}"`)}>`;
    }
    return `<img alt="${alt.replace(/"/g, "&quot;")}"${attrs}>`;
  });

  return out;
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
