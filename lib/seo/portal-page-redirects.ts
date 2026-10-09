/**
 * Portal pages that are still published on portal.deskteam360.com
 * but return 404 on the Next.js marketing site. Main-domain requests
 * permanently redirect to the portal URL.
 *
 * Source paths omit trailing slash (trailingSlash: false).
 */
export const PORTAL_PAGE_FALLBACK_PATHS = [
  "/affiliate-terms-of-use",
  "/agency-details-a-c",
  "/beginning-a-website-project",
  "/book-a-call-e",
  "/calculator-results",
  "/client-satisfaction-rating",
  "/client-satisfaction-rating-2",
  "/customer-portal",
  "/deskteam360-member-interview",
  "/domain-moving",
  "/dtmoffer",
  "/duct-tape-marketing-websites",
  "/faqs",
  "/free",
  "/freelance-roi-calculator",
  "/gaynor-email-submission-form",
  "/hosting",
  "/job-interview",
  "/learn",
  "/learn/book-a-call",
  "/learn/book-call",
  "/loom",
  "/marketer-details-d-c",
  "/monthly-maintenance-website",
  "/onboarding-questionnaire",
  "/thank-you-additional-revisions",
  "/thank-you-page-website",
  "/thank-you-website-change-order",
  "/website-maintenance",
  "/website-showcase",
  "/welcome",
  "/working-with-deskteam360",
] as const;

const PORTAL_ORIGIN = "https://portal.deskteam360.com";

/**
 * Custom portal page redirects where the slug differs from the destination on portal.
 */
export const PORTAL_CUSTOM_REDIRECTS = [
  {
    source: "/new-duct-tape-subscription-discount",
    destination: `${PORTAL_ORIGIN}/dtmoffer/`,
    permanent: true,
  },
  {
    source: "/duct-tape-subscription-discount",
    destination: `${PORTAL_ORIGIN}/dtmoffer/`,
    permanent: true,
  },
  {
    source: "/duct-tape-websites",
    destination: `${PORTAL_ORIGIN}/duct-tape-marketing-websites/`,
    permanent: true,
  },
] as const;

export function portalPageFallbackRedirects() {
  const fallbackRedirects = PORTAL_PAGE_FALLBACK_PATHS.map((path) => ({
    source: path,
    destination: `${PORTAL_ORIGIN}${path}/`,
    permanent: true as const,
  }));

  return [...fallbackRedirects, ...PORTAL_CUSTOM_REDIRECTS];
}
