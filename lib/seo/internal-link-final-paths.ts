import {
  F3_CASE_STUDY_BLOG_COPY_SLUG_SET,
  F19_CONVERT_ON_COMMAND_WP_SLUG,
  toCaseStudyPublicSlug,
} from "@/lib/seo/fix-report-redirects";

/**
 * F8 — bare / renamed paths that do not simply become `/blog/{same-slug}`.
 * Keys are pathname without leading slash (no trailing slash).
 */
const INTERNAL_LINK_PATH_OVERRIDES: Record<string, string> = {
  // Dead showcase case study (not on approved list) → listing
  "case-studies/relish-studio-deskteam360-partnership": "/case-studies",
  "relish-studio-deskteam360-partnership": "/case-studies",

  // next.config slug renames (legacy bare paths)
  "how-to-outsource-presentation-design": "/blog/how-to-outsource-web-design",
  "outsource-web-development": "/blog/outsourced-web-development-guide",
  "website-redesign-process": "/blog/website-redesign-cost",
  "why-unlimited-design-subscriptions-fail":
    "/blog/graphic-design-subscription-services-guide",

  // F19 Convert on Command
  [`case-studies/${F19_CONVERT_ON_COMMAND_WP_SLUG}`]: `/case-studies/${toCaseStudyPublicSlug(F19_CONVERT_ON_COMMAND_WP_SLUG)}`,
  [F19_CONVERT_ON_COMMAND_WP_SLUG]: `/case-studies/${toCaseStudyPublicSlug(F19_CONVERT_ON_COMMAND_WP_SLUG)}`,
  [`blog/${F19_CONVERT_ON_COMMAND_WP_SLUG}`]: `/case-studies/${toCaseStudyPublicSlug(F19_CONVERT_ON_COMMAND_WP_SLUG)}`,
};

const KNOWN_STATIC_PATH_PREFIXES = [
  "services/",
  "showcase/",
  "blog/category/",
  "blog/page/",
  "wp-content/",
] as const;

const KNOWN_STATIC_PATHS = new Set([
  "",
  "about",
  "services",
  "contact",
  "how-it-works",
  "showcase",
  "blog",
  "book-a-call",
  "demo-call-scheduled-thank-you",
  "onboarding-call-scheduled-thank-you",
  "onboarding-call-am2",
  "client-meeting-with-am2",
  "client-meeting-with-am3",
  "client-meeting-with-am4",
  "privacy-policy",
  "terms-conditions",
  "case-studies",
  "affiliate-program",
]);

export type ResolvedInternalContentLink =
  | { kind: "href"; pathname: string }
  | { kind: "draft" }
  | { kind: "unchanged" };

/**
 * Map an internal content pathname to its final public path (F8 / F3 / F19).
 * `pathname` should be without domain, with or without leading slash, no trailing slash preferred.
 */
export function resolveInternalContentLink(
  pathname: string,
  publishedSlugs: string[],
): ResolvedInternalContentLink {
  const path = pathname.replace(/\/$/, "").replace(/^\//, "");

  const override = INTERNAL_LINK_PATH_OVERRIDES[path];
  if (override) {
    return { kind: "href", pathname: override };
  }

  if (path.startsWith("blog/")) {
    const slug = path.slice("blog/".length);
    if (!slug || slug.includes("/")) {
      return { kind: "unchanged" };
    }
    if (F3_CASE_STUDY_BLOG_COPY_SLUG_SET.has(slug)) {
      return {
        kind: "href",
        pathname: `/case-studies/${toCaseStudyPublicSlug(slug)}`,
      };
    }
    if (!publishedSlugs.includes(slug)) {
      return { kind: "draft" };
    }
    return { kind: "unchanged" };
  }

  if (path.startsWith("case-studies/")) {
    const slug = path.slice("case-studies/".length);
    if (!slug || slug.includes("/")) {
      return { kind: "unchanged" };
    }
    const publicSlug = toCaseStudyPublicSlug(slug);
    if (publicSlug !== slug) {
      return { kind: "href", pathname: `/case-studies/${publicSlug}` };
    }
    return { kind: "unchanged" };
  }

  // Bare /{slug} (Appendix E majority: one hop via redirect today)
  if (!path.includes("/")) {
    if (KNOWN_STATIC_PATHS.has(path)) {
      return { kind: "unchanged" };
    }
    if (F3_CASE_STUDY_BLOG_COPY_SLUG_SET.has(path)) {
      return {
        kind: "href",
        pathname: `/case-studies/${toCaseStudyPublicSlug(path)}`,
      };
    }
    if (publishedSlugs.includes(path)) {
      return { kind: "href", pathname: `/blog/${path}` };
    }
    return { kind: "draft" };
  }

  if (
    KNOWN_STATIC_PATH_PREFIXES.some((prefix) => path.startsWith(prefix)) ||
    KNOWN_STATIC_PATHS.has(path.split("/")[0] ?? "")
  ) {
    return { kind: "unchanged" };
  }

  return { kind: "unchanged" };
}
