export type NavMenuItem = {
  href: string;
  label: string;
  /** Open in a new tab (external funnels / portal). */
  external?: boolean;
};

/**
 * Gate 5 S7 — Services dropdown (labels only).
 * Held until live: "See Everything the Team Can Do" → /blog/tasks-a-team-can-take-off-your-plate
 */
export const navServices: NavMenuItem[] = [
  { href: "/services/web-design-development", label: "Websites and Development" },
  { href: "/services/website-maintenance", label: "Website Care and Tech Support" },
  { href: "/services/crm-automation", label: "CRM and Automation (GoHighLevel)" },
  { href: "/services/ai-automation", label: "AI Workflows" },
  { href: "/services/email-funnels", label: "Email and Funnels" },
  { href: "/services/video-editing", label: "Video" },
  { href: "/services/social-media-content", label: "Social Content" },
  { href: "/services/graphic-design", label: "Design" },
];

/**
 * Gate 5 S7 — Who We Help dropdown (no top-level page).
 * Held until live: White Label Marketing Help, Small Businesses
 */
export const navWhoWeHelp: NavMenuItem[] = [
  { href: "/services/white-label", label: "Agencies" },
];

/** Gate 5 S7 — Resources dropdown (top-level target /blog). */
export const navResources: NavMenuItem[] = [
  { href: "/blog", label: "Blog" },
  {
    href: "https://start.deskteam360.com/ultimate-task-delegation-template",
    label: "Ultimate Task Delegation Template",
    external: true,
  },
  {
    href: "https://open.deskteam360.com/roi-calculator",
    label: "ROI Calculator",
    external: true,
  },
];

/** @deprecated Kept for any leftover imports; prefer navServices. */
export const navHowItWorks: NavMenuItem[] = [
  { href: "/how-it-works", label: "How It Works" },
];

/** @deprecated Showcase moved to footer (S7). */
export const navShowcase: NavMenuItem[] = [
  { href: "/showcase", label: "Showcase" },
];

/** @deprecated About moved to footer (S7). */
export const navAbout: NavMenuItem[] = [
  { href: "/about", label: "About" },
];
