export type FooterSimpleLink = { href: string; label: string };

export const footerServices: FooterSimpleLink[] = [
  { href: "/#services", label: "Web Design" },
  { href: "/#services", label: "Graphic Design" },
  { href: "/#services", label: "Video Editing" },
  { href: "/#services", label: "Email & Funnels" },
  { href: "/#services", label: "CRM & Automation" },
  { href: "/#services", label: "Social Media" },
  { href: "/#services", label: "Website Maintenance" },
];

export const footerCompany: FooterSimpleLink[] = [
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "How it works" },
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
