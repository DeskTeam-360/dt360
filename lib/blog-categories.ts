/** Match WordPress category slug generation used in sitemap + blog filters. */
export function categoryNameToSlug(name: string): string {
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
  return categories.find((name) => categoryNameToSlug(name) === normalized);
}
