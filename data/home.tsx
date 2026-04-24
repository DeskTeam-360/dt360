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

/** Hero stats strip — value + label, or two-line text (no value). */
export type HeroStatItem = {
  id: string;
  value?: string;
  label: string;
  labelLine2?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Path under `public/images/` (e.g. `/images/dummy-team-jovan.svg`) */
  imageSrc: string;
  accentClass: string;
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
  { id: "years", value: "8+", label: "Years Running" },
  { id: "clients", value: "400+", label: "Clients Served" },
  { id: "turnaround", value: "1-3", label: "Day Turnaround" },
  {
    id: "revisions",
    label: "Unlimited Revisions",
    labelLine2: "Included",
  },
];

/** Team cards — screenshot-style names/roles; images are dummies under `/public/images/` until final assets exist. */
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jovan",
    role: "AMA",
    imageSrc: "/images/dummy-team-jovan.svg",
    accentClass: "bg-amber-400",
  },
  {
    id: "2",
    name: "Dhea",
    role: "Developer",
    imageSrc: "/images/dummy-team-dhea.svg",
    accentClass: "bg-violet-500",
  },
  {
    id: "3",
    name: "Lex",
    role: "Account Manager",
    imageSrc: "/images/dummy-team-lex.svg",
    accentClass: "bg-emerald-500",
  },
  {
    id: "4",
    name: "Mira",
    role: "Designer",
    imageSrc: "/images/dummy-team-mira.svg",
    accentClass: "bg-rose-500",
  },
  {
    id: "5",
    name: "Raka",
    role: "Video Editor",
    imageSrc: "/images/dummy-team-raka.svg",
    accentClass: "bg-sky-500",
  },
];
