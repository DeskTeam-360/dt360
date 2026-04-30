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

/** Carousel “rotate cards” — outsourcing pain points (464×610 artwork). */
export type RotateProblemCard = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
};

export const rotateProblemCards: RotateProblemCard[] = [
  {
    id: "invoices",
    title: "Death by a Thousand Invoices",
    description:
      "Your graphic designer bills hourly. Your web developer charges \"project management\" on top of dev time. Your video editor has a revision surcharge. Every task feels like opening your wallet and hoping for the best.",
    imageSrc: "/images/home-rotatecard-DeathbyaThousandInvoices-small.png",
  },
  {
    id: "vendors",
    title: "Five Vendors, Nobody Talking",
    description:
      "One person handles graphics. Another does web updates. A third builds funnels. Someone else edits video. They've never spoken to each other. And you're the human glue - the project manager you never signed up to be.",
    imageSrc: "/images/home-rotatecard-FiveVendorsNobodyTalking-small.png",
  },
  {
    id: "lottery",
    title: "The Freelancer Lottery",
    description:
      "Every new project means a new search. New portfolios. New \"getting to know your brand\" conversations. New prayers that this one won't ghost you mid-project. And the cost keeps climbing - $75, $100, $150 an hour - with zero guarantee they'll be available next month.",
    imageSrc: "/images/home-rotatecard-TheFreelancerLottery-small.png",
  },
];

/** Bento “Outsourcing Is Broken…” — grid 3 kolom; ilustrasi/foto opsional nanti. */
export type InsourcingBentoCardId =
  | "insourcing"
  | "redundancy"
  | "one-office"
  | "shifts"
  | "us-managers"
  | "better-over-time";

export type InsourcingBentoCard = {
  id: InsourcingBentoCardId;
  title: string;
  description: string;
  /** Gambar ilustrasi / foto di `public/images/` (opsional). */
  mediaSrc?: string;
  mediaAlt?: string;
  /** Pola sel di grid desktop (lihat komponen). */
  placement: "tall-left" | "wide-magenta" | "compact" | "compact-icon" | "wide-orange" | "compact-bottom";
  /** Warna blok kartu. */
  tone: "dark" | "magenta" | "orange";
};

export type InsourcingBetterSection = {
  titleLine1: string;
  titleLine2: string;
  subheading: string;
  cards: InsourcingBentoCard[];
};

export type HowItWorksStep = {
  id: string;
  number: "1" | "2" | "3";
  title: string;
  description: string;
};

export type HowItWorksSection = {
  titleLine1: string;
  titleLine2: string;
  steps: HowItWorksStep[];
};

export type SocialProofTestimonial = {
  id: string;
  /** Satu baris untuk atribusi, mis. "Luke Dalien, Special Ed Resource" */
  attribution: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
};

export type SocialProofSection = {
  headlineLine1: string;
  headlineLine2: string;
  headlineHighlight: string;
  imageSrc: string;
  imageAlt: string;
  testimonials: SocialProofTestimonial[];
};

export const insourcingBetterSection: InsourcingBetterSection = {
  titleLine1: "Outsourcing Is Broken",
  titleLine2: "We Built Something Better",
  subheading:
    "Most 'outsourced' teams are scattered freelancers working from home across different time zones. Ours aren't. We brought our team in-house - into one office, under one roof, with real infrastructure and real accountability.",
  cards: [
    {
      id: "insourcing",
      placement: "tall-left",
      tone: "dark",
      title: "Insourcing, Not Outsourcing",
      description:
        "We eliminated the frustrations of traditional outsourcing by bringing everything in-house. Your work is done by a real team in a real office - with the infrastructure and accountability to back it up.",
      mediaSrc: "/images/home-InsourcingBetter-grid1.png",
      mediaAlt:
        "Illustration of designers, developers, and video editors working together as one in-house team.",
    },
    {
      id: "redundancy",
      placement: "wide-magenta",
      tone: "magenta",
      title: "Built-In Redundancy",
      description:
        "Every station has redundant computers, internet, and power backup. If something fails, we rotate to spare equipment—without missing your deadlines.",
      mediaSrc: "/images/home-InsourcingBetter-grid2.png",
      mediaAlt: "Illustration of monitors, laptops, and design tools representing built-in redundancy.",
    },
    {
      id: "one-office",
      placement: "compact",
      tone: "dark",
      title: "One Office. One Team Leader",
      description:
        "Team members work together in-office under a unified leader. You get clear accountability—not a black hole of anonymous freelancers.",
    },
    {
      id: "shifts",
      placement: "compact-icon",
      tone: "dark",
      title: "Day & Night Shifts",
      description:
        "Shifts run around the clock in the same building, so work keeps moving—even when you're off the clock.",
      mediaSrc: "/images/home-InsourcingBetter-grid3.png",
      mediaAlt: "Sun and moon icons with arrows representing day and night shifts.",
    },
    {
      id: "us-managers",
      placement: "wide-orange",
      tone: "orange",
      title: "US-Based Account Managers",
      description:
        "Fluent English-speaking managers translate your feedback into clear tasks for the team—so nothing gets lost in translation.",
      mediaSrc: "/images/home-InsourcingBetter-grid4.png",
      mediaAlt: "US-based account manager portrait, professional and approachable.",
    },
    {
      id: "better-over-time",
      placement: "compact-bottom",
      tone: "dark",
      title: "Your Team Gets Better Over Time",
      description:
        "Work with the same people month after month. Speed goes up, rework goes down, and quality becomes what you can rely on.",
    },
  ],
};

export const howItWorksSection: HowItWorksSection = {
  titleLine1: "Three Steps. No Meetings.",
  titleLine2: "No Micromanaging",
  steps: [
    {
      id: "tell-us",
      number: "1",
      title: "Tell Us What You Need",
      description:
        "Drop a task into our request form or send an email - a homepage redesign, ad creatives, a GoHighLevel funnel, a video cut. Whatever's on your plate, hand it off.",
    },
    {
      id: "we-handle",
      number: "2",
      title: "We Handle Everything",
      description:
        "Your US-based account manager assigns the right specialist, manages the timeline, and QAs the work before you see it. No standups. No Slack chasing.",
    },
    {
      id: "review-move-on",
      number: "3",
      title: "Review and Move On",
      description:
        "We finish work and start the next task. Work lands in your inbox. Love it? Want changes? Unlimited revisions - no extra charge. Your queue keeps moving.",
    },
  ],
};

export const socialProofSection: SocialProofSection = {
  headlineLine1: "They Tried Freelancers, Agencies, and Upwork First.",
  headlineLine2: "Then They",
  headlineHighlight: "Found Us",
  imageSrc: "/images/home-SocialProofTestimonials-ImageMain.png",
  imageAlt: "DeskTeam360 in-house team group photo.",
  testimonials: [
    {
      id: "luke",
      attribution: "Luke Dalien, Special Ed Resource",
      quote:
        "I was spending 20+ hours a week managing designers and developers. Now I send a task and it gets done. DeskTeam360 gave me my time back - and my sanity.",
      imageSrc: "/images/home-SocialProofTestimonials-luke.png",
      imageAlt: "Luke Dalien portrait.",
    },
    {
      id: "heath-wilcock",
      attribution: "Heath Wilcock, Fold Soup Copy",
      quote:
        "I went from paying $5K a month to three different freelancers to one flat bill. I'm getting more done than ever. The consistency is what sold me.",
      imageSrc: "/images/home-SocialProofTestimonials-Wilcock.png",
      imageAlt: "Heath Wilcock portrait.",
    },
    {
      id: "renee-poindexter",
      attribution: "Renee Beth Poindexter, Living the Potential",
      quote:
        "I've tried Fiverr, Upwork, and two agencies. DeskTeam360 is the first team that feels like MY team. They know my brand, my voice, my standards.",
      imageSrc: "/images/home-SocialProofTestimonials-Renee.png",
      imageAlt: "Renee Beth Poindexter portrait.",
    },
  ],
};

/** Baris teks berjalan di bawah homepage — angka/metrik di awal baris ditampilkan bold. */
export type HomeMarqueeItem = {
  id: string;
  leadBold: string;
  rest: string;
};

export const homeMarqueeItems: HomeMarqueeItem[] = [
  {
    id: "zach",
    leadBold: "+$160K/month",
    rest: " added revenue after freeing 16 hrs/week - Zach S., Convert on Command",
  },
  {
    id: "gaynor",
    leadBold: "$20K/month",
    rest: " saved vs. previous vendors - Gaynor, Charisma Ink",
  },
  {
    id: "andreas",
    leadBold: "15 hours/week",
    rest: " saved on marketing execution - Andreas, Libra Growth Labs",
  },
];

export type PricingPlanCard = {
  id: string;
  name: string;
  ribbonColor: string;
  ribbonFoldColor: string;
  /** CSS `background` untuk isi kartu (solid atau gradient) */
  cardBackground: string;
  price: string;
  buttonTextColor: string;
  ctaHref: string;
  features: string[];
};

export type PricingSection = {
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  subheading: string;
  ctaLabel: string;
  plans: PricingPlanCard[];
};

export const pricingSection: PricingSection = {
  headlineLine1: "One Team.",
  headlineHighlight: "Three Plans.",
  headlineLine2: "Pick Your Speed.",
  subheading:
    "Every plan includes the full team - graphic design, web development, video editing, marketing tech, team leader, and a dedicated account manager. The only difference is how many tasks run at once.",
  ctaLabel: "GET STARTED",
  plans: [
    {
      id: "entrepreneur",
      name: "ENTREPRENEUR",
      ribbonColor: "#5D3FD3",
      ribbonFoldColor: "#B666FE",
      cardBackground: "linear-gradient(180deg, #BD62FF 0%, #7E5BFD 100%)",
      price: "1,497",
      buttonTextColor: "#5D3FD3",
      ctaHref: "/book-a-call",
      features: [
        "1 active task at a time",
        "Full team access - all 8 services",
        "US-based account manager",
        "1-3 business day turnaround",
        "Unlimited revisions",
        "30-day money-back guarantee",
      ],
    },
    {
      id: "marketer",
      name: "MARKETER",
      ribbonColor: "#991B1B",
      ribbonFoldColor: "#7F1D1D",
      cardBackground: "linear-gradient(180deg, #FF8B52 0%, #EE4176 100%)",
      price: "2,994",
      buttonTextColor: "#E3058D",
      ctaHref: "/book-a-call",
      features: [
        "2 active tasks at a time",
        "Full team access - all 8 services",
        "Priority account manager",
        "1-3 business day turnaround",
        "Unlimited revisions",
        "30-day money-back guarantee",
      ],
    },
    {
      id: "agency",
      name: "AGENCY",
      ribbonColor: "#0F766E",
      ribbonFoldColor: "#115E59",
      cardBackground: "linear-gradient(180deg, #9DC54E 0%, #1D8A7D 100%)",
      price: "4,491",
      buttonTextColor: "#0F766E",
      ctaHref: "/book-a-call",
      features: [
        "3 active tasks at a time",
        "Full team access - all 8 services",
        "Dedicated senior account manager",
        "1-3 business day turnaround",
        "White-label delivery",
        "30-day money-back guarantee",
      ],
    },
  ],
};

/** Team cards — screenshot-style names/roles; images under `/public/images/`. */
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
