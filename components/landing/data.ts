export type NavItem = {
  label: string;
  href: string;
  /** Tampilkan chevron kecil (mis. menu dengan sub-menu nanti) */
  chevron?: "down" | "none";
  /** Item ini memicu mega-menu Services */
  mega?: "services";
};

export type ServiceMegaItem = {
  title: string;
  description: string;
  href: string;
  imageAlt: string;
  /** Sorot judul (contoh: Graphic Design di mockup) */
  highlighted?: boolean;
};

export type SimpleLink = {
  label: string;
  href: string;
};

export type SocialNetwork = "instagram" | "linkedin" | "facebook";

export type SocialLink = SimpleLink & { network: SocialNetwork };

/** Menu utama navbar — ubah urutan/teks di sini */
export const mainNavItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "How it Works", href: "#how-it-works", chevron: "down" },
  { label: "Services", href: "#services", chevron: "down", mega: "services" },
  { label: "Showcase", href: "#showcase", chevron: "down" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about", chevron: "down" },
];

/** Grid kiri mega-menu Services */
export const servicesMegaItems: ServiceMegaItem[] = [
  {
    title: "AI & Automation",
    description:
      "Alur kerja cerdas dan integrasi alat AI untuk tim Anda lebih produktif.",
    href: "#service-ai",
    imageAlt: "AI & Automation",
  },
  {
    title: "Website Design & Development",
    description:
      "Situs custom berperforma tinggi yang mencerminkan merek Anda.",
    href: "#service-web",
    imageAlt: "Web design",
  },
  {
    title: "CRM & Marketing Tech",
    description:
      "Optimalkan jangkauan pelanggan dan sistem pemasaran terpadu.",
    href: "#service-crm",
    imageAlt: "CRM",
  },
  {
    title: "Email & Funnels",
    description:
      "Urutan email strategis dan funnel yang mengonversi.",
    href: "#service-email",
    imageAlt: "Email funnels",
  },
  {
    title: "Graphic Design",
    description:
      "Visual dan branding yang kuat untuk setiap sentuhan titik kontak.",
    href: "#service-graphic",
    imageAlt: "Graphic design",
    highlighted: true,
  },
  {
    title: "Video Editing",
    description:
      "Konten motion berdampak untuk kampanye dan media sosial.",
    href: "#service-video",
    imageAlt: "Video",
  },
  {
    title: "Social Media Content",
    description:
      "Konten engagement tinggi untuk pertumbuhan audiens.",
    href: "#service-social",
    imageAlt: "Social media",
  },
  {
    title: "Website Maintenance",
    description:
      "Update proaktif, keamanan, dan performa situs tetap stabil.",
    href: "#service-maintenance",
    imageAlt: "Maintenance",
  },
];

/** Panel kanan mega-menu */
export const servicesPromo = {
  headline: "Every Skill You Need.",
  headlineAccent: "One Team.",
  headlineSuffix: "One Bill.",
  body: "DeskTeam360 menggantikan kekacauan freelancer dengan satu tim terdedikasi yang dikelola manajer berbasis AS — satu invoice, satu titik kontak.",
  ctaLabel: "See Our Plans",
  ctaHref: "#plans",
  /** Ganti dengan foto tim Anda di /public jika perlu */
  imageSrc:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  imageAlt: "Tim profesional DeskTeam360",
};

/** Footer — kolom Services */
export const footerServiceLinks: SimpleLink[] = [
  { label: "Web Design", href: "#" },
  { label: "Graphic Design", href: "#" },
  { label: "Video Editing", href: "#" },
  { label: "Email & Funnels", href: "#" },
  { label: "CRM & Automation", href: "#" },
  { label: "Social Media", href: "#" },
  { label: "Website Maintenance", href: "#" },
];

/** Footer — kolom Company */
export const footerCompanyLinks: SimpleLink[] = [
  { label: "About", href: "#" },
  { label: "How it works", href: "#" },
  { label: "Showcase", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Case Studies", href: "#" },
  { label: "Contact", href: "#" },
];

/** Footer — legal di bawah sosial */
export const footerLegalLinks: SimpleLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Affiliate Program", href: "#" },
];

export const footerSocialLinks: SocialLink[] = [
  { label: "Instagram", href: "#", network: "instagram" },
  { label: "LinkedIn", href: "#", network: "linkedin" },
  { label: "Facebook", href: "#", network: "facebook" },
];

export const footerBrand = {
  name: "DeskTeam360",
  taglineLine1: "Stop Outsourcing",
  taglineLine2: "Start Insourcing",
};
