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

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Photo URL (remote allowed in `next.config.ts`) */
  imageSrc: string;
  /** Tailwind class for card accent behind the photo */
  accentClass: string;
};

export const heroContent: HeroContent = {
  headlineLine1: "Stop Outsourcing",
  headlineLine2: "Start Insourcing",
  subheading:
    "Dedicated AI specialists, developers, designers, and video editors—working as an extension of your team with clear communication, fast turnaround, and full control over quality.",
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

/** Placeholder photos — replace with local or production CDN assets */
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jovan",
    role: "AMA",
    imageSrc: "https://i.pravatar.cc/600?img=12",
    accentClass: "bg-amber-400",
  },
  {
    id: "2",
    name: "Dhea",
    role: "Developer",
    imageSrc: "https://i.pravatar.cc/600?img=47",
    accentClass: "bg-violet-500",
  },
  {
    id: "3",
    name: "Lex",
    role: "Account Manager",
    imageSrc: "https://i.pravatar.cc/600?img=33",
    accentClass: "bg-emerald-500",
  },
  {
    id: "4",
    name: "Mira",
    role: "Designer",
    imageSrc: "https://i.pravatar.cc/600?img=45",
    accentClass: "bg-rose-500",
  },
  {
    id: "5",
    name: "Raka",
    role: "Video Editor",
    imageSrc: "https://i.pravatar.cc/600?img=59",
    accentClass: "bg-sky-500",
  },
];
