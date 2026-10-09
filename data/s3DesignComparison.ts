/**
 * Gate 5 S3 — design-comparison posts retired in favor of the replacement guide.
 * 12 posts × (/blog/{slug} + /{slug}) = 24 permanent redirects.
 */

export const S3_REPLACEMENT_POST_PATH =
  "/blog/how-to-choose-a-done-for-you-production-team" as const;

export const S3_DESIGN_COMPARISON_SLUGS = [
  "best-design-pickle-alternatives",
  "deskteam360-vs-designjoy",
  "deskteam360-vs-manypixels",
  "deskteam360-vs-kimp",
  "graphic-design-subscription-services-guide",
  "deskteam360-vs-flocksy",
  "deskteam360-vs-penji",
  "deskteam360-vs-design-pickle",
  "best-web-design-subscription-services",
  "best-unlimited-graphic-design-services",
  "best-superside-alternatives",
  "best-manypixels-alternatives",
] as const;

export const S3_DESIGN_COMPARISON_SLUG_SET = new Set<string>(S3_DESIGN_COMPARISON_SLUGS);
