import type { SitemapUrlEntry } from "@/lib/sitemap/types";

/** Static marketing routes included in page-sitemap.xml (noindex / thank-you pages excluded). */
export const STATIC_SITEMAP_PAGES: Array<{ path: string; changeFrequency?: string }> = [
  { path: "/" },
  { path: "/about" },
  { path: "/how-it-works" },
  { path: "/services" },
  { path: "/services/web-design-development" },
  { path: "/services/graphic-design" },
  { path: "/services/video-editing" },
  { path: "/services/email-funnels" },
  { path: "/services/crm-automation" },
  { path: "/services/social-media-content" },
  { path: "/services/website-maintenance" },
  { path: "/services/ai-automation" },
  { path: "/services/white-label" },
  { path: "/showcase" },
  { path: "/blog" },
  { path: "/case-studies" },
  { path: "/book-a-call" },
  { path: "/contact" },
  { path: "/privacy-policy" },
  { path: "/terms-conditions" },
  { path: "/affiliate-program" },
];

export function buildStaticPageEntries(siteUrl: string, generatedAt: string): SitemapUrlEntry[] {
  return STATIC_SITEMAP_PAGES.map(({ path }) => ({
    loc: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastmod: generatedAt,
  }));
}
