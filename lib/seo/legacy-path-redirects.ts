/**
 * Legacy marketing URLs → current Next.js destinations (permanent).
 * Sources omit trailing slash (`trailingSlash: false`). Trailing-slash
 * one-hop variants are handled in `middleware.ts`.
 */

export type LegacyRedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

/** Paths that previously fell through to portal.deskteam360.com and must stay on the main site. */
export const LEGACY_PATH_REDIRECTS: LegacyRedirectRule[] = [
  {
    source: "/faqs",
    destination: "/",
    permanent: true,
  },
  {
    source: "/website-maintenance",
    destination: "/services/website-maintenance",
    permanent: true,
  },
  {
    source: "/websites",
    destination: "/services/web-design-development",
    permanent: true,
  },
  {
    source: "/partner-program",
    destination: "/affiliate-program",
    permanent: true,
  },
  {
    source: "/lost-opportunity-calculator",
    destination: "https://open.deskteam360.com/roi-calculator",
    permanent: true,
  },
  {
    source: "/how-to-delegate-tasks",
    destination: "/blog/how-to-delegate-tasks-effectively",
    permanent: true,
  },
  {
    source: "/product/membership",
    destination: "/pricing",
    permanent: true,
  },
  {
    source: "/product/deskteam360-monthly-membership",
    destination: "/pricing",
    permanent: true,
  },
];

/**
 * Trailing-slash → final destination in one hop (308).
 * Keys include the trailing slash; values are absolute or site-relative.
 */
export const LEGACY_TRAILING_SLASH_ONE_HOP: Record<string, string> = Object.fromEntries(
  LEGACY_PATH_REDIRECTS.map((rule) => [`${rule.source}/`, rule.destination]),
);

export function legacyPathRedirects(): LegacyRedirectRule[] {
  return LEGACY_PATH_REDIRECTS;
}
