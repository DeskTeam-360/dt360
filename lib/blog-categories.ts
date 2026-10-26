import {
  getGate5BlogCategoryByName,
  getGate5BlogCategoryBySlug,
  type Gate5BlogCategory,
} from "@/data/gate5BlogCategories";

/**
 * Legacy category slugs that redirect (CMO P1). Use final destinations in nav/UI
 * so crawlers never see internal links to the old URLs.
 */
export const REDIRECTING_BLOG_CATEGORY_HREFS: Record<string, string> = {
  comparisons: "/blog/category/in-house-vs-team",
  guides: "/blog",
  "industry-insights": "/blog/category/small-business",
  "pricing-cost": "/blog",
  "small-business-website": "/blog/category/small-business",
};

/** Match WordPress category slug generation used in sitemap + blog filters. */
export function categoryNameToSlug(name: string): string {
  const gate5 = getGate5BlogCategoryByName(name);
  if (gate5) return gate5.slug;

  return name
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Public href for a blog category name (skips legacy redirecting slugs). */
export function blogCategoryHref(name: string): string {
  const slug = categoryNameToSlug(name);
  return REDIRECTING_BLOG_CATEGORY_HREFS[slug] ?? `/blog/category/${slug}`;
}

export function resolveCategoryNameFromSlug(
  slug: string,
  categories: string[],
): string | undefined {
  const normalized = slug.trim().toLowerCase();
  const gate5 = getGate5BlogCategoryBySlug(normalized);
  if (gate5) return gate5.name;

  return categories.find((name) => categoryNameToSlug(name) === normalized);
}

export function resolveGate5BlogCategory(
  slug: string,
): Gate5BlogCategory | undefined {
  return getGate5BlogCategoryBySlug(slug);
}
