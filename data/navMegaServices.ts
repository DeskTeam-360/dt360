export type MegaServiceItem = {
  href: string;
  label: string;
  /** Plain text; **highlight** pattern renders as bold (see `formatInlineBoldStars`). */
  description: string;
  /** Path under /public */
  iconSrc: string;
};

/** Left / right columns follow Services mega-menu design layout. */
export const megaServiceColumns: [MegaServiceItem[], MegaServiceItem[]] = [
  [
    {
      href: "/services/ai-automation",
      label: "AI & Automation",
      description:
        "We deploy intelligent workflows** and AI tools** to optimize your operations for **efficient results.**",
      iconSrc: "/images/navbar/nav-services-icon-ai-automation.png",
    },
    {
      href: "/services/web-design-development",
      label: "Web Design & Development",
      description: "We deliver custom, high performance web solutions designed to drive **measurable results.**",
      iconSrc: "/images/navbar/nav-services-icon-web-design-development.png",
    },
    {
      href: "/services/crm-automation",
      label: "CRM & Marketing Tech",
      description: "We optimize your customer reach and systems to drive **higher conversion results.**",
      iconSrc: "/images/navbar/nav-services-icon-crm-automation.png",
    },
    {
      href: "/services/email-funnels",
      label: "Email & Funnels",
      description: "We design strategic sequences and funnels to maximize engagement and **revenue results.**",
      iconSrc: "/images/navbar/nav-services-icon-email-funnels.png",
    },
    {
      href: "/services/white-label",
      label: "White Label",
      description: "We scale and deliver premium results for your clients, **completely under your brand.**",
      iconSrc: "/images/navbar/nav-services-icon-white-label.png",
    },
  ],
  [
    {
      href: "/services/graphic-design",
      label: "Graphic Design",
      description: "We create impactful visuals and branding that deliver **lasting professional results.**",
      iconSrc: "/images/navbar/nav-services-icon-graphic-design.png",
    },
    {
      href: "/services/video-editing",
      label: "Video Editing",
      description: "We craft high-impact motion content and professional edits to deliver **creative results.**",
      iconSrc: "/images/navbar/nav-services-icon-video-editing.png",
    },
    {
      href: "/services/social-media-content",
      label: "Social Media Content",
      description: "We create high-engagement content designed to grow your audience and deliver **viral results.**",
      iconSrc: "/images/navbar/nav-services-icon-social-media-content.png",
    },
    {
      href: "/services/website-maintenance",
      label: "Website Maintenance",
      description: "We provide proactive updateds and security to ensure your platform delivers **reliable results.**",
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
