/**
 * Gate 5 S6 — six blog category pages (name, description, absolute title + meta).
 * Source: DeskTeam360 website copy for developer 2026-10-06.
 *
 * "In-House vs a Team" uses the "version for today" description until
 * /blog/what-is-insourcing answers 200 (then switch to the later version).
 */

export type Gate5BlogCategory = {
  slug: string;
  name: string;
  titleTag: string;
  metaDescription: string;
  pageDescription: string;
};

export const GATE5_BLOG_CATEGORIES: Gate5BlogCategory[] = [
  {
    slug: "website-care",
    name: "Website Care",
    titleTag: "Website Care and WordPress Maintenance Guides | DeskTeam360",
    metaDescription:
      "Website care guides: what maintenance covers, what it costs, how to keep a WordPress site secure, and what to check first when your website goes down.",
    pageDescription:
      "Your website needs care after it launches. These guides cover what maintenance includes, what it costs, how to keep a WordPress site secure, and what to check when your site goes down.",
  },
  {
    slug: "white-label",
    name: "White Label",
    titleTag: "White Label Guides for Agencies | DeskTeam360",
    metaDescription:
      "White label guides for agency owners: what white label work is, how it runs under your brand, how to pick a partner, and how it stacks up against hiring.",
    pageDescription:
      "Want client work done under your agency's name? These guides cover what white label means, how it works, how to pick a partner, and how it compares with hiring in-house.",
  },
  {
    slug: "automation",
    name: "Automation",
    titleTag: "GoHighLevel, CRM and Automation Guides | DeskTeam360",
    metaDescription:
      "Guides on CRM setup and marketing automation in GoHighLevel, HubSpot and other tools: what to automate first, and when to bring in help to set it all up.",
    pageDescription:
      "Is your CRM half set up? These guides cover CRM setup and marketing automation in GoHighLevel, HubSpot, and other tools. You'll see what to automate first and when it makes sense to get help.",
  },
  {
    slug: "delegation",
    name: "Delegation",
    titleTag: "Delegation Guides: How to Hand Off Work | DeskTeam360",
    metaDescription:
      "Guides on how to delegate tasks: what to hand off first, how to brief a task so it comes back right, and how to grow an agency without hiring more people.",
    pageDescription:
      "Still doing it all yourself? These guides show how to hand off work and get your time back. They cover what to delegate first, how to brief a task, and how to grow an agency without hiring.",
  },
  {
    slug: "in-house-vs-team",
    name: "In-House vs a Team",
    titleTag: "In-House vs a Team: Marketing Help Compared | DeskTeam360",
    // Version for today — switch when /blog/what-is-insourcing is live.
    metaDescription:
      "Hire in-house, pay an agency, or work with a dedicated team? These guides compare the options and show what each one costs, so you can pick what fits you.",
    pageDescription:
      "Hire in-house, pay an agency, or work with a dedicated team? These guides compare the options and the costs.",
  },
  {
    slug: "small-business",
    name: "Small Business",
    titleTag: "Small Business Marketing and Website Guides | DeskTeam360",
    metaDescription:
      "Guides for small business owners: which marketing work to hand off, how a remote team works, and what a small business website really needs to do for you.",
    pageDescription:
      "Run a small business and need marketing and website work done? These guides cover what to hand off, how a remote team works, and what your website really needs.",
  },
];

const BY_SLUG = new Map(GATE5_BLOG_CATEGORIES.map((c) => [c.slug, c]));
const BY_NAME = new Map(
  GATE5_BLOG_CATEGORIES.map((c) => [c.name.toLowerCase(), c]),
);

export function getGate5BlogCategoryBySlug(
  slug: string,
): Gate5BlogCategory | undefined {
  return BY_SLUG.get(slug.trim().toLowerCase());
}

export function getGate5BlogCategoryByName(
  name: string,
): Gate5BlogCategory | undefined {
  return BY_NAME.get(name.trim().toLowerCase());
}

/** Display names for blog index filters (All Posts first). */
export const GATE5_BLOG_CATEGORY_NAMES = [
  "All Posts",
  ...GATE5_BLOG_CATEGORIES.map((c) => c.name),
] as const;
