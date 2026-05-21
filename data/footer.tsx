export type FooterSimpleLink = { href: string; label: string };

export const footerServices: FooterSimpleLink[] = [
  { href: "/services/web-design-development", label: "Web Design" },
  { href: "/services/graphic-design", label: "Graphic Design" },
  { href: "/services/video-editing", label: "Video Editing" },
  { href: "/services/email-funnels", label: "Email & Funnels" },
  { href: "/services/crm-automation", label: "CRM & Automation" },
  { href: "/services/social-media-content", label: "Social Media Content" },
  { href: "/services/website-maintenance", label: "Website Maintenance" },
];

export const footerCompany: FooterSimpleLink[] = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/showcase", label: "Showcase" },
  { href: "/blog", label: "Blog" },
  { href: "/", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export const footerLegal: FooterSimpleLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/", label: "Affiliate Program" },
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
