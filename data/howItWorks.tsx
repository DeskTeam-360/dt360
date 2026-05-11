export type HowItWorksTaskStep = {
  id: string;
  title: string;
  body: string;
  stepLabel: string;
  gradientClass: string;
};

export type HowItWorksMeetCard = {
  id: string;
  title: string;
  iconSrc: string;
  iconAlt: string;
  bullets: string[];
};

export type HowItWorksDontItem = {
  id: string;
  label: string;
  /** Target for “View Details >>” */
  detailHref: string;
  /** Degrees for border `linear-gradient(...)` */
  borderGradientDeg: number;
  /** `/images/…` — top circle icon */
  iconSrc: string;
  iconAlt: string;
};

export type HowItWorksTeamStripMember = {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
};

export const howItWorksHero = {
  title: "How DeskTeam360 Works",
  subtitle: "What We Do, What We Don't, and Every Tool We Support",
  paragraphs: [
    "DeskTeam360 is a flat-rate subscription that gives you designers, developers, video editors, and marketing technology specialists in one real office—coordinated by a US-based account manager. You do not hire, onboard, or wrangle invoices for one-off freelancers.",
    "You tell us what needs to be built, fixed, or shipped. Your account manager routes the work, keeps quality consistent, and brings it back to your inbox—most tasks in one to three business days—with unlimited revisions so your queue never stalls.",
  ],
  heroImageSrc: "/images/How it works - Hero.png",
  heroImageAlt: "DeskTeam360 dashboard with supported tools and team member",
};

export const howItWorksTaskSection = {
  titleBefore: "Submitting a Task Takes About ",
  titleHighlight: "2 Minutes",
  steps: [
    {
      id: "s1",
      title: "Tell Us What You Need",
      body: "Brief the task—what you’re trying to accomplish, deadlines, brands, assets, links, examples. The clearer the request, the faster we start.",
      stepLabel: "Step 1",
      gradientClass: "bg-gradient-to-b from-[#ff9f4d] via-[#f0732b] to-[#e8561a]",
    },
    {
      id: "s2",
      title: "Your Account Manager Handles Everything",
      body: "Your North American manager triages priority, assigns the right specialist, confirms scope, and keeps everything moving—you do not babysit freelancers or chase status updates.",
      stepLabel: "Step 2",
      gradientClass: "bg-gradient-to-b from-[#f04aab] via-[#c93fbe] to-[#7f3dbf]",
    },
    {
      id: "s3",
      title: "Work Lands in Your Inbox in 1-3 Days",
      body: "Deliverables arrive on time for review. Want tweaks? Unlimited revisions ship without surprise fees—we refine until it matches what you approved in the brief.",
      stepLabel: "Step 3",
      gradientClass: "bg-gradient-to-b from-[#7f4bdc] via-[#4b35b9] to-[#1f2ca3]",
    },
  ] satisfies HowItWorksTaskStep[],
};

export const howItWorksMeetSection = {
  titleBefore: "We ",
  titleHighlight: "Meet You",
  titleAfter: " Where You Are",
  floatingImageSrc: "/images/How it works - Graphic Illust.png",
  floatingImageAlt: "Floating device illustration",
  cards: [
    {
      id: "web",
      title: "Website Tasks",
      iconSrc: "/images/How it works - Graphic Code.png",
      iconAlt: "Website code icon",
      bullets: ["Landing pages, site updates & cleanup", "Funnels, integrations & QA passes", "WordPress/Webflow upkeep & bug fixes"],
    },
    {
      id: "crm",
      title: "CRM, Automation, and Marketing Tech",
      iconSrc: "/images/How it works - Icon CRM.png",
      iconAlt: "CRM icon",
      bullets: ["GoHighLevel, Keap, HubSpot setup & cleanup", "Workflows, pipelines & task automations", "Form routing, tags & handoff between tools"],
    },
    {
      id: "email",
      title: "Email Marketing and Cold Outreach Setup",
      iconSrc: "/images/How it works - Icon Email Marketing.png",
      iconAlt: "Email marketing icon",
      bullets: ["Klaviyo, ActiveCampaign & Mailchimp builds", "Sequences, broadcasts & segmentation", "Cold email infrastructure-ready assets"],
    },
    {
      id: "video",
      title: "Video Editing and Production",
      iconSrc: "/images/How it works - Icon Video Editing.png",
      iconAlt: "Video editing icon",
      bullets: ["Cuts, pacing, captions & lower thirds", "Social clips, webinars & repurposing packs", "Simple motion graphics aligned to brand"],
    },
    {
      id: "graphic",
      title: "Graphic Design",
      iconSrc: "/images/How it works - Icon Graphic design.png",
      iconAlt: "Graphic design icon",
      bullets: ["Ads, social frames & presentation visuals", "Brand kits, icons & template systems", "Print-ready files when you need them"],
    },
    {
      id: "onpage",
      title: "On-Page Marketing Tasks",
      iconSrc: "/images/How it works - Icon On Page Marketing Tasks.png",
      iconAlt: "On-page marketing icon",
      bullets: ["Page layout polish & conversion clean-up", "Offer blocks, pricing tables & modules", "Light on-page optimization work you brief"],
    },
  ] satisfies HowItWorksMeetCard[],
};

export const howItWorksDontSection = {
  kicker: "What We Don't Do",
  titleBefore: "We're Here to ",
  titleHighlight: "Execute",
  titleAfter: ", Not Consult",
  intro:
    "DeskTeam360 is not a replacement for your marketing strategist, business coach, or ads manager. We're built to implement - fast, reliably, and at scale. Here's what falls outside our scope:",
  items: [
    {
      id: "copy",
      label: "Sales Copy",
      detailHref: "/services/graphic-design",
      borderGradientDeg: 35,
      iconSrc: "/images/How it works - Icon Sales Copy.png",
      iconAlt: "Sales copy",
    },
    {
      id: "paid",
      label: "Paid Media Management",
      detailHref: "/services",
      borderGradientDeg: 180,
      iconSrc: "/images/How it works - Icon Paid Media management.png",
      iconAlt: "Paid media management",
    },
    {
      id: "social",
      label: "Social Media Replies and Community",
      detailHref: "/services/social-media-content",
      borderGradientDeg: 225,
      iconSrc: "/images/How it works - Icon Social Media replies.png",
      iconAlt: "Social media replies",
    },
    {
      id: "seo",
      label: "Off-Page SEO",
      detailHref: "/services",
      borderGradientDeg: 10,
      iconSrc: "/images/How it works - Icon Off Page SEO.png",
      iconAlt: "Off-page SEO",
    },
    {
      id: "cube",
      label: "3D Design & Animation",
      detailHref: "/services/graphic-design",
      borderGradientDeg: 180,
      iconSrc: "/images/How it works - Icon 3D Design.png",
      iconAlt: "3D design",
    },
  ] satisfies HowItWorksDontItem[],
  /** Banner: accent (#F5B419) through colon; remainder white. */
  bannerTextAccent:
    "Not sure if we can handle something? Just ask. The rule of thumb:",
  bannerTextRest:
    " if you can describe it clearly in a written brief or a short Loom video, there's a good chance we can do it.",
};

export const howItWorksRealTeam = {
  titleBefore: "A Real Team. A Real Office. ",
  titleHighlight: "Every Day.",
  bullets: [
    "Full-time specialists in one building—not distributed gig workers",
    "US account managers who own requests, revisions, and deadlines",
    "Team leader coverage so work keeps moving when someone is out",
    "Redundant systems (power, internet, hardware) to protect throughput",
    "Shifts that keep production moving while you are offline",
  ],
  photoSrc: "/images/How it works - Real Team.png",
  photoAlt: "DeskTeam360 team group photo in the office",
  stripMembers: [
    { id: "lex", name: "LEX", title: "ACCOUNT MANAGER", imageSrc: "/images/teams/LEX.png" },
    { id: "jd", name: "JD", title: "PRODUCTION MANAGER", imageSrc: "/images/teams/JD.png" },
    { id: "jeremy", name: "JEREMY", title: "CEO", imageSrc: "/images/teams/JEREMY.png" },
    { id: "inge", name: "INGE", title: "INTAKE PERSON", imageSrc: "/images/teams/INGE.png" },
    { id: "hari", name: "HARI", title: "PROJECT MANAGER", imageSrc: "/images/teams/HARI.png" },
  ] satisfies HowItWorksTeamStripMember[],
};

export const howItWorksDelegation = {
  titleBefore: "What Happens When You ",
  titleHighlight1: "Stop Managing",
  titleMiddle: " and ",
  titleHighlight2: "Start Delegating",
};

export const howItWorksReadyCta = {
  title: "Ready to Hand Off the Work?",
  body: "Book a short call and we will map the work you want off your plate. See how a single flat rate replaces a stack of vendors—and still hits a 1–3 day cadence with real people in one office.",
  primaryCta: { href: "/book-a-call", label: "Book a Free Strategy Call" },
  secondaryCta: { href: "/#pricing", label: "See Plans & Pricing" },
  noteBelowButtons: "30-day money-back guarantee - No contracts - Cancel anytime",
  imageSrc: "/images/How it works - CTA.png",
  imageAlt: "Team member giving a thumbs up with a laptop",
};
