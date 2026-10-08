export type FooterSimpleLink = {
  href: string;
  label: string;
  external?: boolean;
};

/**
 * Gate 5 S7 footer — four groups: Company, Services, Guides, Legal.
 * Careers still held (needs resume form).
 */

export const footerCompany: FooterSimpleLink[] = [
  { href: "/about", label: "About" },
  { href: "/showcase", label: "Showcase" },
  { href: "/affiliate-program", label: "Affiliate Program" },
  { href: "/contact", label: "Contact" },
];

export const footerServices: FooterSimpleLink[] = [
  { href: "/services/web-design-development", label: "Websites and Development" },
  { href: "/services/website-maintenance", label: "Website Care and Tech Support" },
  { href: "/services/crm-automation", label: "CRM and Automation (GoHighLevel)" },
  { href: "/services/ai-automation", label: "AI Workflows" },
  { href: "/services/email-funnels", label: "Email and Funnels" },
  { href: "/services/video-editing", label: "Video" },
  { href: "/services/social-media-content", label: "Social Content" },
  { href: "/services/white-label", label: "Agencies" },
  {
    href: "/services/white-label/marketing",
    label: "White Label Marketing Help",
  },
  { href: "/services/graphic-design", label: "Design" },
];

export const footerGuides: FooterSimpleLink[] = [
  { href: "/blog/what-is-insourcing", label: "What Is Insourcing?" },
  { href: "/blog/website-maintenance-cost-guide", label: "Website Maintenance Cost" },
  {
    href: "/blog/white-label-web-development-guide",
    label: "White Label Web Development Guide",
  },
  { href: "/blog/how-to-delegate-tasks-effectively", label: "How to Delegate Tasks" },
  {
    href: "/blog/virtual-assistant-vs-dedicated-team",
    label: "Virtual Assistant or a Whole Team?",
  },
  { href: "/blog/hire-a-gohighlevel-expert", label: "Hiring a GoHighLevel Expert" },
  {
    href: "/blog/marketing-agency-vs-in-house-team",
    label: "In-House Marketing Team vs Outside Help",
  },
  {
    href: "/blog/how-to-choose-a-done-for-you-production-team",
    label: "How to Choose a Done-For-You Team",
  },
];

export const footerLegal: FooterSimpleLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms and Conditions" },
];

export type FooterSocial = {
  label: string;
  href: string;
  icon: "instagram" | "linkedin" | "facebook";
};

/** Replace URL with official profile when available. */
export const footerSocial: FooterSocial[] = [
  { label: "Instagram", href: "https://www.instagram.com/deskteam360/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/deskteam360/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/deskteam360", icon: "facebook" },
];
