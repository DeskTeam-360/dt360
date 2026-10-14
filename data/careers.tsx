export type CareersRole = {
  title: string;
  talentPool?: boolean;
  whatYoullDo?: string;
  requirements?: string;
};

export type CareersCategory = {
  id: string;
  name: string;
  accent: string;
  headerBg: string;
  roles: CareersRole[];
};

export const careersHero = {
  eyebrow: "DESKTEAM360 CAREERS",
  titleBefore: "Build Your ",
  titleAccent: "Career",
  titleAfter: " with DeskTeam360",
  lead:
    "Join a team that works together to deliver great work for our clients. Whether you want to apply now or join our talent pool for future openings, we would love to hear from you.",
  primaryCta: { label: "Explore Opportunities", href: "#opportunities" },
  secondaryCta: { label: "Join Our Talent Pool", href: "#apply" },
  backgroundImage: "/images/careers/hero-careers-bg.png",
  image: "/images/careers/hero-image-v2.png",
  imageAlt: "DeskTeam360 team members collaborating around a laptop",
  stickyNote: "Teamwork Makes Your Dreamwork",
  badge: "Different Skills Same Goal",
} as const;

export const careersValues = {
  image: "/images/careers/image-more-than-just-a-job-v1.png",
  imageAlt: "DeskTeam360 teammates working together in the office",
  titleBefore: "More Than ",
  titleAccent: "Just a Job",
  body: "At DeskTeam360, our team brings together different skills and perspectives to solve problems, support clients, and deliver quality work for businesses around the world.",
  points: [
    {
      text: "Collaboration across skills and perspectives",
      icon: "/images/careers/icon-collaboration.png",
      iconAlt: "Collaboration icon",
    },
    {
      text: "Accountability and clear communication",
      icon: "/images/careers/icon-accountability.png",
      iconAlt: "Accountability icon",
    },
    {
      text: "Continuous improvement, every day",
      icon: "/images/careers/icon-continuous-improvement.png",
      iconAlt: "Continuous improvement icon",
    },
  ],
} as const;

export const careersOpportunities = {
  eyebrow: "CAREER OPPORTUNITIES",
  titleBefore: "Find Your Place on ",
  titleAccent: "Our Team",
  lead:
    "Explore open roles below, or join our talent pool so we can reach out when a fit opens up.",
} as const;

export const careersCategories: CareersCategory[] = [
  {
    id: "technical",
    name: "Technical",
    accent: "#F43F5E",
    headerBg: "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)",
    roles: [
      { title: "Backend Developer", talentPool: true },
      { title: "Frontend Developer", talentPool: true },
      {
        title: "GHL Specialist",
        talentPool: true,
        whatYoullDo: "Set up and manage funnels, pipelines, and automations in GoHighLevel.",
        requirements: "Hands-on GoHighLevel experience and clear written communication.",
      },
    ],
  },
  {
    id: "operations",
    name: "Operations & Client Management",
    accent: "#8B5CF6",
    headerBg: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
    roles: [
      { title: "Virtual Assistant", talentPool: true },
      { title: "Project Manager", talentPool: true },
      { title: "Account Manager", talentPool: true },
    ],
  },
  {
    id: "sales",
    name: "Sales & Outreach",
    accent: "#EC4899",
    headerBg: "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)",
    roles: [
      { title: "Lead Generator", talentPool: true },
      { title: "Cold Email Specialist", talentPool: true },
      { title: "Cold Outreach", talentPool: true },
      { title: "Sales", talentPool: true },
      { title: "SDR", talentPool: true },
    ],
  },
  {
    id: "content",
    name: "Content & Social",
    accent: "#6366F1",
    headerBg: "linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)",
    roles: [
      { title: "Copy Writer", talentPool: true },
      { title: "Social Media Manager", talentPool: true },
      { title: "YouTube Specialist", talentPool: true },
    ],
  },
  {
    id: "paid-media",
    name: "Paid Media & Advertising",
    accent: "#3B82F6",
    headerBg: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
    roles: [
      { title: "Meta Ads Media Buyer", talentPool: true },
      { title: "Google Media Buyer", talentPool: true },
      { title: "YouTube Media Buyer", talentPool: true },
      { title: "LinkedIn Media Buyer", talentPool: true },
      { title: "Native Ad Media Buyer", talentPool: true },
      { title: "ChatGPT Media Buyer", talentPool: true },
      { title: "Hulu Ad Media Buyer", talentPool: true },
    ],
  },
];

export const careersWhyUs = {
  eyebrow: "WHY WORK WITH US",
  titleBefore: "Why Work ",
  titleAccent: "with Us?",
  cards: [
    {
      title: "Collaborative Environment",
      body: "Work alongside people with different skills who share one goal: great work for clients.",
      icon: "users" as const,
    },
    {
      title: "Accountability & Quality",
      body: "Take ownership of your work. Clear standards, clear feedback, and a team that follows through.",
      icon: "shield" as const,
    },
    {
      title: "Continuous Improvement",
      body: "Keep learning and refining your skills. We grow by shipping better work every week.",
      icon: "chart" as const,
    },
  ],
} as const;

export const careersApplication = {
  titleBefore: "Ready to ",
  titleAccent: "Join Us?",
  body: "Send your profile and tell us which roles interest you. If there isn’t an open seat today, we’ll keep you in our talent pool for the right fit.",
  handwritten: "We'd love to hear from you!",
  positions: careersCategories.flatMap((c) => c.roles.map((r) => r.title)),
  experienceLevels: [
    "Less than 1 year",
    "1–3 years",
    "3–5 years",
    "5+ years",
  ],
  submitLabel: "Submit Application",
  successMessage:
    "Thanks — we received your application. Our team will review it and reach out if there’s a fit.",
} as const;
