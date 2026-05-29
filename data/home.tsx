import type { ReactNode } from "react";
import { pricingCheckoutUrls } from "@/config/urls";

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

export type LastCtaContent = {
  headingBefore: string;
  headingHighlight: string;
  headingAfter: string;
  subheading: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  note: string;
  imageSrc: string;
  imageAlt: string;
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
  /** Path under `public/images/` (team photos: `public/images/teams/…`) */
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
  /** Second title line (after `<br />`). */
  headlineSecondLine: string;
  subheading: string;
  illustrationSrc: string;
  illustrationAlt: string;
  decorTopLeftSrc: string;
  decorTopRightSrc: string;
};

export const startBusinessContent: StartBusinessContent = {
  headlineBefore: "You ",
  headlineHighlight: "Didn't",
  headlineAfter: " Start a Business",
  headlineSecondLine: "to Chase Freelancers",
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
    "AI specialists, developers, designers, and video editors - all working together in one office, not scattered across Upwork. Flat-rate subscription. North American account manager. Zero hiring headaches. And you never manage another vendor again.",
  primaryCta: {
    href: "/#pricing",
    label: "See Plans & Pricing",
    variant: "primary",
  },
  secondaryCta: {
    href: "/how-it-works#how-it-works-video",
    label: "Watch How It Works - 5 Minutes",
    variant: "secondary",
  },
};

export const lastCtaContent: LastCtaContent = {
  headingBefore: "You've Got ",
  headingHighlight: "Better Things",
  headingAfter: " to Do Than Manage Freelancers",
  subheading:
    "400+ businesses already handed off the grunt work. Same team, same flat rate, every month. Your turn.",
  primaryCta: {
    href: "/#pricing",
    label: "See Plans & Pricing",
    variant: "primary",
  },
  secondaryCta: {
    href: "/book-a-call",
    label: "Book a Free Strategy Call",
    variant: "secondary",
  },
  note: "30-day money-back guarantee - No contracts - Cancel anytime - Since 2018",
  imageSrc: "/images/Home-cta-imageright1.png",
  imageAlt: "Senior professional holding a laptop, ready to support your team.",
};

export const heroStats: HeroStatItem[] = [
  { id: "years", layout: "side", value: "8+", labelLine1: "Years", labelLine2: "Running" },
  { id: "clients", layout: "side", value: "400+", labelLine1: "Clients", labelLine2: "Served" },
  { id: "turnaround", layout: "side", value: "1-3", labelLine1: "Day", labelLine2: "Turnaround" },
  { id: "revisions", layout: "text", line1: "Unlimited Revisions", line2: "Included" },
];

/** Carousel “rotate cards” — outsourcing pain points (611×688 artwork). */
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
    imageSrc: "/images/home-rotatecard-Card-1.png",
  },
  {
    id: "vendors",
    title: "Five Vendors, Nobody Talking",
    description:
      "One person handles graphics. Another does web updates. A third builds funnels. Someone else edits video. They've never spoken to each other. And you're the human glue - the project manager you never signed up to be.",
    imageSrc: "/images/home-rotatecard-Card-2.png",
  },
  {
    id: "lottery",
    title: "The Freelancer Lottery",
    description:
      "Every new project means a new search. New portfolios. New \"getting to know your brand\" conversations. New prayers that this one won't ghost you mid-project. And the cost keeps climbing - $75, $100, $150 an hour - with zero guarantee they'll be available next month.",
    imageSrc: "/images/home-rotatecard-Card-3.png",
  },
];

/** Bento “Outsourcing Is Broken…” — 3-column grid; illustration/photo optional for now. */
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
  /** Illustration / photo path in `public/images/` (optional). */
  mediaSrc?: string;
  mediaAlt?: string;
  /** Desktop grid cell pattern (see component). */
  placement: "tall-left" | "wide-magenta" | "compact" | "compact-icon" | "wide-orange" | "compact-bottom";
  /** Card color tone. */
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
  description: ReactNode;
};

export type HowItWorksSection = {
  titleLine1: string;
  titleLine2: string;
  steps: HowItWorksStep[];
};

export type SocialProofTestimonial = {
  id: string;
  /** Single-line attribution, e.g. "Luke Dalien, Special Ed Resource" */
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
        "New computers. Three different internet providers. Two backup power sources. When someone's out sick or on vacation, the team keeps moving - you never feel the gap.",
      mediaSrc: "/images/home-InsourcingBetter-grid2-rev2.png",
      mediaAlt: "Office infrastructure, backups, and redundant systems.",
    },
    {
      id: "one-office",
      placement: "compact",
      tone: "dark",
      title: "One Office, One Team Leader",
      description:
        "Every team member works in our office with a team leader who holds them accountable. No wondering if work is getting done - there's someone watching the floor, not just pinging a Slack channel.",
    },
    {
      id: "shifts",
      placement: "compact-icon",
      tone: "dark",
      title: "Day & Night Shifts",
      description:
        "Our team runs day and night shifts so work gets done on your schedule - not theirs. No time zone headaches. Submit a task at 5pm, wake up to it done.",
      mediaSrc: "/images/home-InsourcingBetter-grid3.png",
      mediaAlt: "Sun and moon icons with arrows representing day and night shifts.",
    },
    {
      id: "us-managers",
      placement: "wide-orange",
      tone: "orange",
      title: "North American Account Managers",
      description:
        "Your dedicated account manager speaks fluent English and bridges any language gaps with the production team. They help you get the most out of the service - so you can focus on growing your business.",
      mediaSrc: "/images/home-InsourcingBetter-grid5.png",
      mediaAlt: "North American account manager.",
    },
    {
      id: "better-over-time",
      placement: "compact-bottom",
      tone: "dark",
      title: "Your Team Gets Better Over Time",
      description:
        "You work with the same people every month - not a revolving door of strangers. They learn your brand, your preferences, your standards. The longer you stay, the faster and better the work gets.",
    },
  ],
};

export const howItWorksSection: HowItWorksSection = {
  titleLine1: "Three Steps, No Meetings,",
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
        "Your North American account manager assigns the right specialist, manages the timeline, and QAs the work before you see it. No standups. No Slack chasing.",
    },
    {
      id: "review-move-on",
      number: "3",
      title: "Review and Move On",
      description: (
        <>
          We finish work and start the next task. Work lands in your inbox. Love it? Want changes? Unlimited
          revisions - no extra charge. Your queue
          <br />
          keeps moving.
        </>
      ),
    },
  ],
};

export const socialProofSection: SocialProofSection = {
  headlineLine1: "They Tried Freelancers, Agencies, and Upwork First.",
  headlineLine2: "Then They",
  headlineHighlight: "Found Us",
  imageSrc: "/images/home-SocialProofTestimonials-ImageMain-2.png",
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

/** Running text row below homepage — numbers/metrics at the start of each line are shown bold. */
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
  /** CSS `background` for card fill (solid or gradient) */
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

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqSection = {
  headingStart: string;
  headingHighlight: string;
  items: FaqItem[];
};

export const pricingSection: PricingSection = {
  headlineLine1: "One Team,",
  headlineHighlight: "Three Plans,",
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
      ctaHref: pricingCheckoutUrls.entrepreneur,
      features: [
        "1 active task at a time",
        "Full team access - all 8 services",
        "North American account manager",
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
      ctaHref: pricingCheckoutUrls.marketer,
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
      ctaHref: pricingCheckoutUrls.agency,
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

export const faqSection: FaqSection = {
  headingStart: "Got Questions?",
  headingHighlight: "Good",
  items: [
    {
      id: "faq-1",
      question: "What exactly can I send you?",
      answer:
        "Anything in our wheelhouse - AI agents, graphic design, web design and development, video editing, email campaigns, funnel builds, CRM setup, website maintenance, automation. If it's marketing or tech work, we probably do it.",
    },
    {
      id: "faq-2",
      question: "How is this different from hiring a freelancer?",
      answer:
        "A freelancer gives you one skill and disappears when the project ends. DeskTeam360 gives you an entire team - designers, developers, video editors, and tech specialists - managed by a dedicated account manager. No hunting for talent, no onboarding, no ghosting.",
    },
    {
      id: "faq-3",
      question: "How fast do things get done?",
      answer:
        "Most tasks ship in 1-3 business days. Bigger projects get broken into tasks and completed in sequence. Your account manager keeps you updated - you never have to ask \"where's my stuff?\"",
    },
    {
      id: "faq-4",
      question: "What if the work isn't what I wanted?",
      answer:
        "Unlimited revisions on every plan. We revise until you're happy - no extra charge, no revision caps, no attitude.",
    },
    {
      id: "faq-5",
      question: "Can agencies white-label this?",
      answer:
        "Yes - and many do. We work behind the scenes under your brand. Your clients see your name, your logo, your deliverables. We're the team they never know about.",
    },
    {
      id: "faq-6",
      question: "Is there a minimum commitment?",
      answer:
        "No. Month-to-month. Cancel anytime. Plus the 30-day money-back guarantee means you can test it with zero risk.",
    },
  ],
};

/** Team cards — screenshot-style names/roles; images under `/public/images/`. */
export const teamMembers: TeamMember[] = [
  {
    id: "1",
        name: "ADE",
        role: "DEVELOPER",
        imageSrc: "/images/teams/ADE.png",
        labelClass: "bg-[#9F731B]",
  },
  {
    id: "2",
        name: "ARDELLA",
        role: "DEVELOPER",
        imageSrc: "/images/teams/ARDELLA.png",
        labelClass: "bg-[#A70767]",
  },
  {
    id: "3",
        name: "ASIF",
        role: "DEVELOPER",
        imageSrc: "/images/teams/ASIF.png",
        labelClass: "bg-[#3D109A]",
  },
  {
    id: "4",
        name: "BIANCA",
        role: "DEVELOPER",
        imageSrc: "/images/teams/BIANCA.png",
        labelClass: "bg-[#C5540A]",
  },
  {
    id: "5",
          name: "GABRIELLE",
          role: "DEVELOPER",
          imageSrc: "/images/teams/GABRIELLE.png",
          labelClass: "bg-[#C5540A]",
        },
      {
        id: "6",
        name: "CHANDRA",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/CHANDRA.png",
        labelClass: "bg-[#D03B0E]",
      },
      {
        id: "7",
        name: "DHEA",
        role: "DEVELOPER",
        imageSrc: "/images/teams/DHEA.png",
        labelClass: "bg-[#83259A]",
      },
      {
        id: "8",
        name: "DIMAS",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/DIMAS.png",
        labelClass: "bg-[#3D109A]",
      },
      {
        id: "9",
        name: "DINI",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/DINI.png",
        labelClass: "bg-[#83259A]",
      },
      {
        id: "10",
        name: "FEBRI",
        role: "DEVELOPER",
        imageSrc: "/images/teams/FEBRI.png",
        labelClass: "bg-[#C5540A]",
      },
      {
        id: "11",
        name: "FIANDY",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/FIANDY.png",
        labelClass: "bg-[#9F731B]",
      },
      {
        id: "12",
        name: "GANDHI",
        role: "DEVELOPER",
        imageSrc: "/images/teams/GANDHI.png",
        labelClass: "bg-[#9F731B]",
      },
      {
        id: "13",
        name: "GISELLE",
        role: "AMA",
        imageSrc: "/images/teams/GISELLE.png",
        labelClass: "bg-[#3D109A]",
      },
      {
        id: "14",
        name: "HARDY",
        role: "DEVELOPER",
        imageSrc: "/images/teams/HARDY.png",
        labelClass: "bg-[#C5540A]",
      },
      {
        id: "15",
        name: "HARI",
        role: "PROJECT MANAGER",
        imageSrc: "/images/teams/HARI.png",
        labelClass: "bg-[#9F731B]",
      },
      {
        id: "16",
        name: "IMELDA",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/IMELDA.png",
        labelClass: "bg-[#9F731B]",
      },
      {
        id: "17",
        name: "INGE",
        role: "INTAKE PERSON",
        imageSrc: "/images/teams/INGE.png",
        labelClass: "bg-[#C5540A]",
      },
      {
        id: "18",
        name: "IQBAL",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/IQBAL.png",
        labelClass: "bg-[#A70767]",
      },
      {
        id: "19",
        name: "IRNANDA",
        role: "DEVELOPER",
        imageSrc: "/images/teams/IRNANDA.png",
        labelClass: "bg-[#A70767]",
      },
      {
        id: "20",
        name: "JD",
        role: "PRODUCTION MANAGER",
        imageSrc: "/images/teams/JD.png",
        labelClass: "bg-[#3D109A]",
      },
      {
        id: "21",
        name: "JEREMY",
        role: "CEO",
        imageSrc: "/images/teams/JEREMY.png",
        labelClass: "bg-[#C5540A]",
      },
      {
        id: "22",
        name: "JOVAN",
        role: "AMA",
        imageSrc: "/images/teams/JOVAN.png",
        labelClass: "bg-[#D03B0E]",
      },
      {
        id: "23",
        name: "KHOIRUL",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/KHOIRUL.png",
        labelClass: "bg-[#3D109A]",
      },
      {
        id: "24",
        name: "LEX",
        role: "ACCOUNT MANAGER",
        imageSrc: "/images/teams/LEX.png",
        labelClass: "bg-[#C5540A]",
      },
      {
        id: "25",
        name: "MELVIL",
        role: "HR",
        imageSrc: "/images/teams/MELVIL.png",
        labelClass: "bg-[#83259A]",
      },
      {
        id: "26",
        name: "NHEB",
        role: "ASSISTANT",
        imageSrc: "/images/teams/NHEB.png",
        labelClass: "bg-[#A70767]",
      },
      {
        id: "27",
        name: "NOGA",
        role: "DEVELOPER",
        imageSrc: "/images/teams/NOGA.png",
        labelClass: "bg-[#9F731B]",
      },
      {
        id: "28",
        name: "NUGROHO",
        role: "DESIGNER",
        imageSrc: "/images/teams/NUGROHO.png",
        labelClass: "bg-[#83259A]",
      },
      {
        id: "29",
        name: "RAFI",
        role: "DEVELOPER",
        imageSrc: "/images/teams/RAFI.png",
        labelClass: "bg-[#83259A]",
      },
      {
        id: "30",
        name: "RENDY",
        role: "DEVELOPER",
        imageSrc: "/images/teams/RENDY.png",
        labelClass: "bg-[#A70767]",
      },
      {
        id: "31",
        name: "RESHA",
        role: "DESIGNER",
        imageSrc: "/images/teams/RESHA.png",
        labelClass: "bg-[#3D109A]",
      },
      {
        id: "32",
        name: "RIZKY",
        role: "DEVELOPER",
        imageSrc: "/images/teams/RIZKY.png",
        labelClass: "bg-[#A70767]",
      },
      {
        id: "33",
        name: "RALPH",
        role: "VIDEO EDITOR",
    imageSrc: "/images/teams/Ralph.png",
        labelClass: "bg-[#83259A]",
      },
      {
        id: "34",
        name: "WAHYU",
        role: "DEVELOPER",
        imageSrc: "/images/teams/WAHYU.png",
        labelClass: "bg-[#3D109A]",
      },
      {
        id: "35",
        name: "WAHYUWONO",
        role: "GRAPHIC DESIGNER",
        imageSrc: "/images/teams/WAHYUWONO.png",
        labelClass: "bg-[#D03B0E]",
      },
      {
        id: "36",
        name: "YOSKI",
        role: "DEVELOPER",
        imageSrc: "/images/teams/YOSKI.png",
        labelClass: "bg-[#A70767]",
  },
];
