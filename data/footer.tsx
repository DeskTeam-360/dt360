export type FooterSimpleLink = { href: string; label: string };

export const footerServices: FooterSimpleLink[] = [
  { href: "/services/web-design-development", label: "Web Design & Development" },
  { href: "/services/graphic-design", label: "Graphic Design" },
  { href: "/services/video-editing", label: "Video Editing" },
  { href: "/services/email-funnels", label: "Email & Funnels" },
  { href: "/services/crm-automation", label: "CRM & Automation" },
  { href: "/services/social-media-content", label: "Social Media Content" },
  { href: "/services/website-maintenance", label: "Website Maintenance" },
  { href: "/services/ai-automation", label: "AI & Automation" },
  { href: "/services/white-label", label: "White Label" },
];

export const footerCompany: FooterSimpleLink[] = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/#showcase", label: "Showcase" },
  { href: "/blog", label: "Blog" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/book-a-call", label: "Contact" },
];

export const footerLegal: FooterSimpleLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/affiliate-program", label: "Affiliate Program" },
];

export type FooterSocial = {
  label: string;
  href: string;
  icon: "instagram" | "linkedin" | "facebook";
};

/** Ganti URL ke profil resmi saat tersedia. */
export const footerSocial: FooterSocial[] = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
];
