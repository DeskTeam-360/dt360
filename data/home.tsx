export type HeroCta = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
};

export type HeroContent = {
  headlineLine1: string;
  headlineLine2: string;
  subheading: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
};

/**
 * Hero stats strip — value | two-line label (side), or two text lines (text).
 */
export type HeroStatItem =
  | {
      id: string;
      layout: "side";
      value: string;
      labelLine1: string;
      labelLine2: string;
    }
  | {
      id: string;
      layout: "text";
      line1: string;
      line2: string;
    };

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Path under `public/images/` */
  imageSrc: string;
  /** Bottom-left pill: `NAME | ROLE` */
  labelClass: string;
};

/** “Trusted by” — dummy logo URLs until real assets exist. */
export type TrustedByLogo = {
  id: string;
  alt: string;
  imageSrc: string;
};

export type TrustedByContent = {
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2After: string;
};

export const trustedByContent: TrustedByContent = {
  headlineLine1: "Agencies, startups, and growing businesses",
  headlineHighlight: "trust DeskTeam360",
  headlineLine2After: " to handle the work they don't have time for.",
};

export const trustedByLogos: TrustedByLogo[] = [
  {
    id: "libra",
    alt: "Libra Growth Labs",
    imageSrc: "/images/home-trust-libragrowth.png",
  },
  {
    id: "charisma",
    alt: "Charisma",
    imageSrc: "/images/home-trust-charismainc.png",
  },
  {
    id: "duct-tape",
    alt: "Duct Tape Marketing",
    imageSrc: "/images/home-trust-ducttapemarketing.png",
  },
  {
    id: "convert",
    alt: "Convert On Command",
    imageSrc: "/images/home-trust-conversiononcommand.png",
  },
  {
    id: "special-ed",
    alt: "Special Ed Resource",
    imageSrc: "/images/home-trust-specialed.png",
  },
];

/** “You didn’t start a business…” — wide illustration; crop sides in layout. */
export type StartBusinessContent = {
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  subheading: string;
  illustrationSrc: string;
  illustrationAlt: string;
  decorTopLeftSrc: string;
  decorTopRightSrc: string;
};

export const startBusinessContent: StartBusinessContent = {
  headlineBefore: "You ",
  headlineHighlight: "Didn't",
  headlineAfter: " Start a Business to Chase Freelancers",
  subheading:
    "Somewhere between managing vendors, chasing revisions, and watching invoices pile up—you stopped doing the work that actually grows your company.",
  illustrationSrc: "/images/home-startbusiness-DigitalCreativeProfessionalsWideWhite.png",
  illustrationAlt:
    "Designers, developers, and media specialists working together on digital projects.",
  decorTopLeftSrc: "/images/home-startbusiness-topleft.png",
  decorTopRightSrc: "/images/home-startbusiness-topright.png",
};

/** Hero copy aligned with landing screenshot (English). */
export const heroContent: HeroContent = {
  headlineLine1: "Stop Outsourcing",
  headlineLine2: "Start Insourcing",
  subheading:
    "AI specialists, developers, designers, and video editors—all working together in one focused team. Clear updates, fast delivery, and quality that feels in-house, without the usual outsourcing friction.",
  primaryCta: {
    href: "/#pricing",
    label: "See Plans & Pricing",
    variant: "primary",
  },
  secondaryCta: {
    href: "/#how-it-works",
    label: "Watch How It Works - 5 Minutes",
    variant: "secondary",
  },
};

export const heroStats: HeroStatItem[] = [
  { id: "years", layout: "side", value: "8+", labelLine1: "Years", labelLine2: "Running" },
  { id: "clients", layout: "side", value: "400+", labelLine1: "Clients", labelLine2: "Served" },
  { id: "turnaround", layout: "side", value: "1-3", labelLine1: "Day", labelLine2: "Turnaround" },
  { id: "revisions", layout: "text", line1: "Unlimited Revisions", line2: "Included" },
];

/** Team cards — screenshot-style names/roles; images are dummies under `/public/images/` until final assets exist. */
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Imelda",
    role: "Designer",
    imageSrc: "/images/Home-Team-Imelda.png",
    labelClass: "bg-amber-400",
  },
  {
    id: "2",
    name: "Jovan",
    role: "AMA",
    imageSrc: "/images/Home-Team-Jovan.png",
    labelClass: "bg-[#FFAD88]",
  },
  {
    id: "3",
    name: "Dhea",
    role: "Developer",
    imageSrc: "/images/Home-Team-Dhea.png",
    labelClass: "bg-violet-400",
  },
  {
    id: "4",
    name: "Lex",
    role: "Account Manager",
    imageSrc: "/images/Home-Team-Lex.png",
    labelClass: "bg-[#FFAD88]",
  },
  {
    id: "5",
    name: "Gabriela",
    role: "Developer",
    imageSrc: "/images/Home-Team-Gabriela.png",
    labelClass: "bg-rose-400",
  },
];
