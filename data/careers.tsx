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
  icon: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
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
    "Explore the positions below or join our talent pool to be considered for current and future opportunities.",
} as const;

export const careersCategories: CareersCategory[] = [
  {
    id: "technical",
    name: "Technical",
    accent: "#da0285",
    headerBg: "linear-gradient(90deg, #fd7955 0%, #da0285 100%)",
    icon: "/images/careers/icon-technical-3.png",
    iconAlt: "Technical category icon",
    iconWidth: 60,
    iconHeight: 49,
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
    accent: "#6d25f1",
    headerBg: "linear-gradient(90deg, #bb28f9 0%, #6d25f1 100%)",
    icon: "/images/careers/icon-operations-client-management-3.png",
    iconAlt: "Operations & Client Management category icon",
    iconWidth: 71,
    iconHeight: 50,
    roles: [
      { title: "Virtual Assistant", talentPool: true },
      { title: "Project Manager", talentPool: true },
      { title: "Account Manager", talentPool: true },
    ],
  },
  {
    id: "sales",
    name: "Sales & Outreach",
    accent: "#7618e0",
    headerBg: "linear-gradient(90deg, #e40ab4 0%, #7618e0 100%)",
    icon: "/images/careers/icon-sales-and-outreach-3.png",
    iconAlt: "Sales & Outreach category icon",
    iconWidth: 73,
    iconHeight: 52,
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
    accent: "#6229fc",
    headerBg: "linear-gradient(90deg, #a021fd 0%, #6229fc 100%)",
    icon: "/images/careers/icon-content-social-3.png",
    iconAlt: "Content & Social category icon",
    iconWidth: 51,
    iconHeight: 57,
    roles: [
      { title: "Copy Writer", talentPool: true },
      { title: "Social Media Manager", talentPool: true },
      { title: "YouTube Specialist", talentPool: true },
    ],
  },
  {
    id: "paid-media",
    name: "Paid Media & Advertising",
    accent: "#4534fd",
    headerBg: "linear-gradient(90deg, #753efd 0%, #4534fd 100%)",
    icon: "/images/careers/icon-paid-media-advertising-3.png",
    iconAlt: "Paid Media & Advertising category icon",
    iconWidth: 60,
    iconHeight: 55,
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
  backgroundImage: "/images/careers/background-why-work-with-us.png",
  cards: [
    {
      title: "Collaborative Environment",
      body: "Work alongside people with different skills and expertise.",
      icon: "/images/careers/icon-collaborative-environment.png",
      iconWidth: 81,
      iconHeight: 57,
    },
    {
      title: "Accountability & Quality",
      body: "Take ownership of your work and contribute to team goals.",
      icon: "/images/careers/icon-accountability-quality.png",
      iconWidth: 57,
      iconHeight: 67,
    },
    {
      title: "Continuous Improvement",
      body: "Keep learning, refining your skills, and finding better ways to work.",
      icon: "/images/careers/icon-continuous-improvement-why.png",
      iconWidth: 68,
      iconHeight: 63,
    },
  ],
} as const;

export const careersApplication = {
  eyebrow: "JOIN OUR TALENT POOL",
  titleBefore: "Ready to ",
  titleAccent: "Join Us?",
  backgroundImage: "/images/careers/background-ready-to-join-us.png",
  body: "Interested in working with DeskTeam 360? Tell us a little about yourself and the role you are interested in. Don't see the right opening? Send us your profile anyway. We'll keep your information on file and reach out when a matching opportunity comes up.",
  handwrittenImage: "/images/careers/handwritten-wed-love-to-hear.png",
  handwrittenImageAlt: "We'd love to hear from you!",
  handwrittenWidth: 714,
  handwrittenHeight: 298,
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
