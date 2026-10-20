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

const mediaBuyerCommon =
  "Experience running paid ads, managing budgets, tracking performance metrics (such as CPA and ROAS), and reporting.";

export const careersHero = {
  eyebrow: "DESKTEAM360 CAREERS",
  titleBefore: "Build Your ",
  titleAccent: "Career",
  titleAfter: " with DeskTeam360",
  lead:
    "Join a team that works together to deliver great work for our clients. Whether you want to apply now or join our talent pool for future openings, we would love to hear from you.",
  primaryCta: { label: "Explore Opportunities", href: "#opportunities" },
  secondaryCta: { label: "Join Our Talent Pool", href: "#apply" },
  backgroundImage: "/images/careers/hero-careers-bg.webp",
  image: "/images/careers/hero-image-v1.webp",
  imageAlt: "DeskTeam360 team members collaborating around a laptop",
} as const;

export const careersValues = {
  image: "/images/careers/image-more-than-just-a-job-v2.webp",
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
  backgroundImage: "/images/careers/background-find-your-place.png",
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
      {
        title: "Backend Developer",
        talentPool: true,
        whatYoullDo: "Build and maintain server logic, databases, and API integrations.",
        requirements: "Backend language experience, REST APIs and databases, Git.",
      },
      {
        title: "Frontend Developer",
        talentPool: true,
        whatYoullDo: "Turn designs into clean, responsive web pages.",
        requirements: "HTML, CSS, JavaScript; WordPress/Webflow or a front-end framework.",
      },
      {
        title: "GHL Specialist",
        talentPool: true,
        whatYoullDo: "Set up and manage GoHighLevel funnels, workflows, pipelines, and forms.",
        requirements: "GoHighLevel automation and CRM experience; troubleshooting skills.",
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
      {
        title: "Virtual Assistant",
        talentPool: true,
        whatYoullDo: "Support daily admin and operations: scheduling, data entry, communication.",
        requirements: "Strong written English; well organized; comfortable with productivity tools.",
      },
      {
        title: "Project Manager",
        talentPool: true,
        whatYoullDo: "Plan timelines, set priorities, and coordinate the team to deliver on time.",
        requirements: "Project or team management experience; task-management tools; clear communication.",
      },
      {
        title: "Account Manager",
        talentPool: true,
        whatYoullDo: "Be the main contact for clients: take requests, track quality, follow up.",
        requirements: "Strong English; client-handling experience; proactive and detail-oriented.",
      },
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
      {
        title: "Lead Generator",
        talentPool: true,
        whatYoullDo: "Find and compile prospect data that fits our target profile.",
        requirements: "Prospect research; accurate data entry; lead research tools.",
      },
      {
        title: "Cold Email Specialist",
        talentPool: true,
        whatYoullDo: "Write and run cold email campaigns, from copy and setup to follow-up.",
        requirements: "Cold email and deliverability basics; sequences; English copywriting.",
      },
      {
        title: "Cold Outreach",
        talentPool: true,
        whatYoullDo: "Reach prospects by email, LinkedIn, or other channels to start conversations.",
        requirements: "Persuasive English; consistent follow-up; tracks outreach results.",
      },
      {
        title: "Sales",
        talentPool: true,
        whatYoullDo: "Engage prospects and move them through the sales process toward a deal.",
        requirements: "Sales or business development experience; strong English; target-driven.",
      },
      {
        title: "SDR",
        talentPool: true,
        whatYoullDo: "Qualify prospects and book meetings for the sales team.",
        requirements: "Spoken and written English; prospecting or CRM experience; target-driven.",
      },
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
      {
        title: "Copy Writer",
        talentPool: true,
        whatYoullDo: "Write copy for ads, emails, websites, and content.",
        requirements: "Strong English writing; writing samples; adapts to brand tone.",
      },
      {
        title: "Social Media Manager",
        talentPool: true,
        whatYoullDo: "Plan, create, schedule, and monitor social content and engagement.",
        requirements: "Social account management; content calendars; basic analytics.",
      },
      {
        title: "YouTube Specialist",
        talentPool: true,
        whatYoullDo: "Manage YouTube channels: uploads, titles, thumbnails, descriptions, analytics.",
        requirements: "YouTube Studio and video SEO; reads channel analytics.",
      },
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
      {
        title: "Meta Ads Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize ads on Meta (Facebook and Instagram).",
        requirements: `Meta Ads Manager experience. ${mediaBuyerCommon}`,
      },
      {
        title: "Google Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize ads on Google Ads.",
        requirements: `Google Ads (Search, Display) experience. ${mediaBuyerCommon}`,
      },
      {
        title: "YouTube Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize video ads on YouTube.",
        requirements: `Video ads experience; understands video creative. ${mediaBuyerCommon}`,
      },
      {
        title: "LinkedIn Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize B2B ads on LinkedIn.",
        requirements: `LinkedIn Campaign Manager and B2B targeting. ${mediaBuyerCommon}`,
      },
      {
        title: "ChatGPT Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize ads on the ChatGPT ad platform.",
        requirements: `Learns new ad platforms quickly. ${mediaBuyerCommon}`,
      },
      {
        title: "Native Ad Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize ads on native ad networks.",
        requirements: `Native ads platform experience. ${mediaBuyerCommon}`,
      },
      {
        title: "Hulu Ad Media Buyer",
        talentPool: true,
        whatYoullDo: "Plan, run, and optimize video ads on Hulu.",
        requirements: `Video or CTV ads experience. ${mediaBuyerCommon}`,
      },
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
  backgroundImage: "/images/careers/background-ready-to-join-us.webp",
  body: "Interested in working with DeskTeam 360? Tell us a little about yourself and the role you are interested in. Don't see the right opening? Send us your profile anyway. We'll keep your information on file and reach out when a matching opportunity comes up.",
  handwrittenImage: "/images/careers/handwritten-wed-love-to-hear.png",
  handwrittenImageAlt: "We'd love to hear from you!",
  handwrittenWidth: 1064,
  handwrittenHeight: 702,
} as const;
