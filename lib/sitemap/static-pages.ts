import type { SitemapUrlEntry } from "@/lib/sitemap/types";

/**
 * Static marketing routes included in page-sitemap.xml (noindex / thank-you pages excluded).
 *
 * Intentional omissions (do not add without CMO sign-off):
 * - `/blog/page/2`…`/7` — crawlable + self-canonical + indexable, but omitted from
 *   the sitemap by design (CMO-REV.2). Keep pagination reachable; do not noindex.
 * - `www.deskteam360.com/*` — host redirect to apex; never list www URLs.
 * - `start.` / `open.` lead URLs — host-owned sitemaps only (see
 *   `deploy/lead-host-sitemaps/`); never cross-list in this main-domain sitemap.
 */
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
  { path: "/services/white-label/marketing" },
  { path: "/small-business" },
  { path: "/showcase" },
  { path: "/blog" },
  { path: "/case-studies" },
  { path: "/book-a-call" },
  { path: "/contact" },
  { path: "/careers" },
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
