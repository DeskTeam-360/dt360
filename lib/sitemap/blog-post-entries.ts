import {
  BLOG_SITEMAP_EXCLUDED_SLUGS,
  BLOG_SITEMAP_EXTRA_SLUGS,
} from "@/data/blogSitemapExtraSlugs";
import { F3_CASE_STUDY_BLOG_COPY_SLUG_SET } from "@/lib/seo/fix-report-redirects";
import type { SitemapUrlEntry } from "@/lib/sitemap/types";

function slugFromBlogLoc(loc: string): string | null {
  const match = loc.match(/\/blog\/([^/?#]+)\/?$/);
  return match?.[1] ?? null;
}

/**
 * F2: union WordPress blog URLs with Appendix C live-but-missing slugs.
 * Drops /blog/test and case-study copies that redirect to /case-studies/.
 */
export function mergeBlogSitemapEntries(
  wordpressEntries: SitemapUrlEntry[],
  siteUrl: string,
  generatedAt: string,
): { entries: SitemapUrlEntry[]; addedExtraCount: number } {
  const base = siteUrl.replace(/\/$/, "");
  const bySlug = new Map<string, SitemapUrlEntry>();

  for (const entry of wordpressEntries) {
    const slug = slugFromBlogLoc(entry.loc);
    if (!slug) continue;
    if (BLOG_SITEMAP_EXCLUDED_SLUGS.has(slug)) continue;
    if (F3_CASE_STUDY_BLOG_COPY_SLUG_SET.has(slug)) continue;
    bySlug.set(slug, entry);
  }

  let addedExtraCount = 0;
  for (const slug of BLOG_SITEMAP_EXTRA_SLUGS) {
    if (BLOG_SITEMAP_EXCLUDED_SLUGS.has(slug)) continue;
    if (F3_CASE_STUDY_BLOG_COPY_SLUG_SET.has(slug)) continue;
    if (bySlug.has(slug)) continue;
    bySlug.set(slug, {
      loc: `${base}/blog/${slug}`,
      lastmod: generatedAt,
    });
    addedExtraCount += 1;
  }

  const entries = [...bySlug.values()].sort((a, b) => a.loc.localeCompare(b.loc));
  return { entries, addedExtraCount };
}

/** Slugs that should count as published for internal blog link checks. */
export function getExtraPublishedBlogSlugs(): string[] {
  return BLOG_SITEMAP_EXTRA_SLUGS.filter((slug) => !BLOG_SITEMAP_EXCLUDED_SLUGS.has(slug));
}
