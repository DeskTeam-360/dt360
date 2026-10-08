import {
  getGate5BlogCategoryByName,
  getGate5BlogCategoryBySlug,
  type Gate5BlogCategory,
} from "@/data/gate5BlogCategories";

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
