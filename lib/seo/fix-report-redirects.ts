/**
 * Redirects from DeskTeam360 website fix report (2026-09-24): F3, F5, F19, S1,
 * plus Gate 5 merge redirects F18b and S4.
 * Kept separate from next.config so lists stay reviewable.
 */

/**
 * F19 — Convert on Command case study: URL said 120k, page/facts say $160k.
 * WordPress may still use the 120k slug until the portal post is renamed;
 * the public URL is always the 160k form.
 */
export const F19_CONVERT_ON_COMMAND_WP_SLUG =
  "freed-up-16-hours-a-week-added-120k-a-month-to-their-bottom-line" as const;
export const F19_CONVERT_ON_COMMAND_PUBLIC_SLUG =
  "freed-up-16-hours-a-week-added-160k-a-month-to-their-bottom-line" as const;

/** Map a case-study slug to the public (canonical) URL slug. */
export function toCaseStudyPublicSlug(slug: string): string {
  return slug === F19_CONVERT_ON_COMMAND_WP_SLUG
    ? F19_CONVERT_ON_COMMAND_PUBLIC_SLUG
    : slug;
}

/**
 * Slugs to try when loading a case study from WordPress for a public URL.
 * Prefer the current WP slug, then the public slug (if WP was renamed).
 */
export function caseStudyWordpressSlugCandidates(publicSlug: string): string[] {
  if (publicSlug === F19_CONVERT_ON_COMMAND_PUBLIC_SLUG) {
    return [F19_CONVERT_ON_COMMAND_WP_SLUG, F19_CONVERT_ON_COMMAND_PUBLIC_SLUG];
  }
  return [publicSlug];
}

/** F3 — 23 case-study posts that also answer under /blog/{slug}. */
export const F3_CASE_STUDY_BLOG_COPY_SLUGS = [
  "one-of-those-consistent-pieces-we-can-rely-on-how-the-tobie-group-transformed-from-ad-agency-to-full-service-provider-with-deskteam360",
  F19_CONVERT_ON_COMMAND_WP_SLUG,
  "see-how-duct-tape-marketing-was-able-to-get-better-quality-projects-done-faster-and-less-expensive-than-their-previous-provider",
  "i-now-have-a-peace-of-mind-and-predictability-around-projects-getting-done-i-think-of-deskteam360-as-a-partner-and-not-just-a-vendor",
  "i-was-able-to-eliminate-frustrations-from-working-with-people-overseas-to-being-able-to-do-more-quality-work",
  "with-the-help-of-deskteam360-charisma-ink-is-saving-20000-a-month-without-the-stress-or-hassle-of-the-hiring-process",
  "see-how-deskteam360-has-helped-sidecar-marketing-solutions-save-thousands-of-dollars-a-month-and-free-countless-hours-a-week",
  "libra-growth-labs-switched-to-deskteam360-and-they-are-now-able-to-focus-on-strategy-and-growth-without-the-dread-of-the-back-and-forth",
  "first-call-digital-agency-has-increased-their-quality-of-work-and-reduced-their-wait-time-on-tasks-with-deskteam360",
  "smash-wave-has-been-able-to-save-20-hours-a-week-and-has-tripled-their-profit-i-couldnt-have-done-it-without-deskteam360",
  "tripled-their-revenue-and-increased-their-net-profits-dramatically",
  "sidekick-marketing-is-easily-saving-20-hours-a-week-and-with-that-time-tripled-his-investment-the-first-month",
  "bobby-k-designs-has-a-cleaner-plate-to-work-on-growing-their-business-without-getting-stuck-in-the-nitty-gritty",
  "saved-25-of-her-time-each-week-saved-thousands-of-dollar",
  "website-looked-better-than-she-couldve-imagined",
  "wicked-wine-run-fit-tribe-gym-launched-a-new-business-in-2-weeks-during-pandemic",
  "women-in-white-coats-freed-up-half-her-day-started-to-grow-the-business",
  "fitbodies4life-1500-month-to-500",
  "living-the-potential-scaled-my-business-because-of-deskteam360",
  "deskteam360-was-able-to-help-lemonade-legend-recover-hijacked-website-from-previous-provider",
  "special-ed-resource-case-study",
  "the-lands-end-school-deskteam360s-process-made-everything-so-easy",
  "steph-lee-md-website-looked-better-than-she-could-have-imagined",
] as const;

export const F3_CASE_STUDY_BLOG_COPY_SLUG_SET = new Set<string>(F3_CASE_STUDY_BLOG_COPY_SLUGS);

/**
 * S1 — bare legacy post paths whose trailing-slash form currently chains:
 * /{slug}/ → /{slug} → /blog/{slug}. Middleware sends /{slug}/ straight to /blog/{slug}.
 */
export const S1_TRAILING_SLASH_BLOG_SLUGS = [
  "best-unlimited-web-development-services",
  "fiverr-vs-upwork-vs-subscription",
  "how-to-create-marketing-budget",
  "outsource-hubspot-setup",
  "website-content-audit",
] as const;

export const S1_TRAILING_SLASH_BLOG_SLUG_SET = new Set<string>(S1_TRAILING_SLASH_BLOG_SLUGS);

type RedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

/**
 * F19 — one-hop redirects to the 160k public URL (no chain via the old 120k case-study path).
 */
export function f19ConvertOnCommandRedirects(): RedirectRule[] {
  const dest = `/case-studies/${F19_CONVERT_ON_COMMAND_PUBLIC_SLUG}`;
  const wp = F19_CONVERT_ON_COMMAND_WP_SLUG;
  return [
    {
      source: `/case-studies/${wp}`,
      destination: dest,
      permanent: true,
    },
    {
      source: `/${wp}`,
      destination: dest,
      permanent: true,
    },
  ];
}

/** F3 redirects for next.config — destinations use public case-study slugs (F19). */
export function f3CaseStudyBlogCopyRedirects(): RedirectRule[] {
  return F3_CASE_STUDY_BLOG_COPY_SLUGS.map((slug) => ({
    source: `/blog/${slug}`,
    destination: `/case-studies/${toCaseStudyPublicSlug(slug)}`,
    permanent: true,
  }));
}

/**
 * F5 — dead pages that still receive backlinks (Appendix D / fix report table).
 * Hash destinations (#pricing) are included; browsers keep the fragment after the 308.
 */
export function f5DeadPageRedirects(): RedirectRule[] {
  return [
    {
      source: "/new-duct-tape-subscription-discount",
      destination: "/",
      permanent: true,
    },
    {
      source: "/pricing",
      destination: "/#pricing",
      permanent: true,
    },
    {
      source: "/download-report",
      destination: "/",
      permanent: true,
    },
    {
      source: "/book-call",
      destination: "/book-a-call",
      permanent: true,
    },
    {
      source: "/my-account",
      destination: "https://portal.deskteam360.com/my-account/",
      permanent: true,
    },
    {
      source: "/my-account/:path*",
      destination: "https://portal.deskteam360.com/my-account/:path*/",
      permanent: true,
    },
    {
      source: "/affiliates",
      destination: "/affiliate-program",
      permanent: true,
    },
    {
      source: "/affiliate-area",
      destination: "https://portal.deskteam360.com/affiliate-area/",
      permanent: true,
    },
    {
      source: "/ref/upto2018",
      destination: "/",
      permanent: true,
    },
    {
      source: "/product-category/regular-subscriptions",
      destination: "/#pricing",
      permanent: true,
    },
  ];
}

/**
 * Gate 5 F18b — merge loser `/blog/ai-for-marketing-agencies-2` into the survivor.
 * Bare `/ai-for-marketing-agencies-2` must one-hop to the survivor (not via /blog/-2).
 */
export function f18bAiForMarketingAgenciesRedirects(): RedirectRule[] {
  const dest = "/blog/ai-for-marketing-agencies";
  return [
    {
      source: "/blog/ai-for-marketing-agencies-2",
      destination: dest,
      permanent: true,
    },
    {
      source: "/ai-for-marketing-agencies-2",
      destination: dest,
      permanent: true,
    },
  ];
}

/**
 * Gate 5 S4 — merge loser `/blog/scale-agency-without-hiring` into the survivor.
 * Bare `/scale-agency-without-hiring` must one-hop to the survivor.
 */
export function s4ScaleAgencyRedirects(): RedirectRule[] {
  const dest = "/blog/how-to-scale-a-marketing-agency-without-hiring";
  return [
    {
      source: "/blog/scale-agency-without-hiring",
      destination: dest,
      permanent: true,
    },
    {
      source: "/scale-agency-without-hiring",
      destination: dest,
      permanent: true,
    },
  ];
}

/** All fix-report redirects to merge into next.config `redirects()`. */
export function fixReportRedirects(): RedirectRule[] {
  return [
    ...f19ConvertOnCommandRedirects(),
    ...f3CaseStudyBlogCopyRedirects(),
    ...f5DeadPageRedirects(),
    ...f18bAiForMarketingAgenciesRedirects(),
    ...s4ScaleAgencyRedirects(),
  ];
}
