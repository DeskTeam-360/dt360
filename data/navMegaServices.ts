export type MegaServiceItem = {
  href: string;
  label: string;
  description: string;
  /** Path under /public */
  iconSrc: string;
};

/** Kolom kiri / kanan mengikuti layout desain mega-menu Services. */
export const megaServiceColumns: [MegaServiceItem[], MegaServiceItem[]] = [
  [
    {
      href: "/services/ai-automation",
      label: "AI & Automation",
      description: "Agents, training, chatbots, and workflow automation to scale without extra headcount.",
      iconSrc: "/images/navbar/nav-services-icon-ai-automation.png",
    },
    {
      href: "/services/web-design-development",
      label: "Web Design & Development",
      description: "WordPress, React, landing pages, redesigns, WooCommerce, and custom features.",
      iconSrc: "/images/navbar/nav-services-icon-web-design-development.png",
    },
    {
      href: "/services/crm-automation",
      label: "CRM & Marketing Tech",
      description: "GoHighLevel, HubSpot, Zapier, Make, integrations, and API work.",
      iconSrc: "/images/navbar/nav-services-icon-crm-automation.png",
    },
    {
      href: "/services/email-funnels",
      label: "Email & Funnels",
      description: "Campaign builds, automation sequences, nurture flows, and A/B testing.",
      iconSrc: "/images/navbar/nav-services-icon-email-funnels.png",
    },
    {
      href: "/services/white-label",
      label: "White Label",
      description: "Deliver our bench under your brand with one predictable partnership.",
      iconSrc: "/images/navbar/nav-services-icon-white-label.png",
    },
  ],
  [
    {
      href: "/services/graphic-design",
      label: "Graphic Design",
      description: "Ads, social graphics, branding, print, decks, and presentations.",
      iconSrc: "/images/navbar/nav-services-icon-graphic-design.png",
    },
    {
      href: "/services/video-editing",
      label: "Video Editing",
      description: "YouTube, short-form reels, ad cuts, thumbnails, and motion graphics.",
      iconSrc: "/images/navbar/nav-services-icon-video-editing.png",
    },
    {
      href: "/services/social-media-content",
      label: "Social Media Content",
      description: "Carousels, stories, templates, and scheduling-ready branded assets.",
      iconSrc: "/images/navbar/nav-services-icon-social-media-content.png",
    },
    {
      href: "/services/website-maintenance",
      label: "Website Maintenance",
      description: "Updates, security, speed, backups—your stack stays current.",
      iconSrc: "/images/navbar/nav-services-icon-website-maintenance.png",
    },
  ],
];

export const megaServicesFeatured = {
  imageSrc: "/images/navbar/nav-mega-services-feature.png",
  imageAlt: "DeskTeam360 team collaborating.",
  headlineBefore: "Every Skill You Need. ",
  headlineHighlight: "One Team.",
  headlineAfter: " One Bill.",
  bodyLeadBold: "DeskTeam360",
  bodyRest:
    " replaces the freelancer chaos with a dedicated team that already knows how to work together - all managed by a North American account manager so you never have to coordinate anything.",
  ctaLabel: "See Our Plans",
  ctaHref: "/services" as const,
};
