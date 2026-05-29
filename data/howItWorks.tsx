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
  /** Shown on the back of the card when flipped on hover */
  description: string;
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
    "DeskTeam360 is a flat-rate subscription that gives you designers, developers, video editors, and marketing technology specialists in one real office—coordinated by a North American account manager. You do not hire, onboard, or wrangle invoices for one-off freelancers.",
    "You tell us what needs to be built, fixed, or shipped. Your account manager routes the work, keeps quality consistent, and brings it back to your inbox—most tasks in one to three business days—with unlimited revisions so your queue never stalls.",
  ],
  heroImageSrc: "/images/how it works/How-it-works-Hero new_1.png",
  heroImageAlt: "DeskTeam360 task dashboard with account manager and supported tools",
};

export const howItWorksTaskSection = {
  titleBefore: (
    <>
      Submitting a Task
      <br />
      Takes About{" "}
    </>
  ),
  titleHighlight: "2 Minutes",
  video: {
    ornamentLeftSrc: "/images/How it work - Video background left.png",
    ornamentLeftAlt: "Design tablet and creative tools illustration",
    ornamentRightSrc: "/images/How it work - Video background right.png",
    ornamentRightAlt: "Developer monitor and code illustration",
    embedSrc:
      "https://player.vimeo.com/video/561929467?color&autopause=0&loop=0&muted=0&title=0&portrait=0&byline=0#t=",
    ariaLabel: "Vimeo video player: how to submit a task in about two minutes",
  },
  steps: [
    {
      id: "s1",
      title: "Tell Us What You Need",
      body: `Drop your task into our request system. Write it out, record a Loom video, attach a doc - whatever works for you. The more context you give, the better the output. Even a quick voice note gets the job done.

Examples of what people submit: "Redesign our homepage," "Cut this 45-minute webinar into 5 social clips," "Build this GoHighLevel workflow," "Create 10 social graphics for next month."`,
 
      stepLabel: "Step 1",
      gradientClass: "bg-gradient-to-b from-[#ff9f4d] via-[#f0732b] to-[#e8561a]",
    },
    {
      id: "s2",
      title: "Your Account Manager Handles Everything",
      body: "Your North American account manager reads your task, assigns it to the right specialist, sets a realistic timeline, and reviews the work before it ever reaches you. You don't deal with the team directly unless you want to. That's what the account manager is there for.",
 
      stepLabel: "Step 2",
      gradientClass: "bg-gradient-to-b from-[#f04aab] via-[#c93fbe] to-[#7f3dbf]",
    },
    {
      id: "s3",
      title: "Work Lands in Your Inbox in 1-3 Days",
      body: "Most tasks are done in 1-3 business days and some even faster. You review it, request changes if needed, and we revise until it's exactly right. Unlimited revisions - no caps, no attitude. Then your next task starts.",
 
      stepLabel: "Step 3",
      gradientClass: "bg-gradient-to-b from-[#7f4bdc] via-[#4b35b9] to-[#1f2ca3]",
    },
  ] satisfies HowItWorksTaskStep[],
};

export const howItWorksMeetSection = {
  titleBefore: "We ",
  titleHighlight: "Meet You",
  titleAfter: " Where\nYou Are",
  floatingImageSrc: "/images/How it works - Graphic Illust.png",
  floatingImageAlt: "Floating device illustration",
  cards: [
    {
      id: "web",
      title: "Website Tasks",
      iconSrc: "/images/dt360-How-it-works-Icon-website-task.png",
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
      description:
        "We build the pages, funnels, and email sequences. We don't write sales pages, cold email copy, or conversion-focused ad copy. The words need to come from you or your copywriter.",
      detailHref: "/services/graphic-design",
      borderGradientDeg: 35,
      iconSrc: "/images/how it works/How it works - Icon Sales (no background).png",
      iconAlt: "Sales copy",
    },
    {
      id: "paid",
      label: "Paid Media Management",
      description:
        "We can set up your ad accounts, build your creatives, and configure your campaigns. We don't manage ongoing paid media spend, optimization, or bid management.",
      detailHref: "/services",
      borderGradientDeg: 180,
      iconSrc: "/images/how it works/How it works - Icon Paid Media management (no background).png",
      iconAlt: "Paid media management",
    },
    {
      id: "social",
      label: "Social Media Replies and Community",
      description:
        "We create the content and graphics. Responding to comments, DMs, and managing your online community is outside our scope.",
      detailHref: "/services/social-media-content",
      borderGradientDeg: 225,
      iconSrc: "/images/how it works/How it works - Icon Social Media replies (no background).png",
      iconAlt: "Social media replies",
    },
    {
      id: "seo",
      label: "Off-Page SEO",
      description:
        "Link building, outreach, and domain authority work is outside what we do. On-page SEO is fully covered.",
      detailHref: "/services",
      borderGradientDeg: 10,
      iconSrc: "/images/how it works/How it works - Icon Off Page SEO (no background).png",
      iconAlt: "Off-page SEO",
    },
    {
      id: "cube",
      label: "3D Design & Animation",
      description:
        "Standard graphic design and 2D motion graphics are included. Complex 3D rendering and 3D modeling are not.",
      detailHref: "/services/graphic-design",
      borderGradientDeg: 180,
      iconSrc: "/images/how it works/How it works - Icon 3D Design (no background).png",
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
  titleLine1: "A Real Team,",
  titleLine2: "A Real Office",
  titleLine3: "Every Day",
  quote: "Not an algorithm. Not a freelancer marketplace. A real team in a real office in Indonesia that shows up every single day.",
  bullets: [
    "One physical office – everyone works together under the same roof, with the same standards",
    "Day shift and night shift – your time zone is always covered",
    "A team leader on the floor every day holding people accountable",
    "Your North American account manager handles all communication – no language barriers",
    "3 separate internet providers and 2 backup power sources – no excuses, no downtime",
    "Same team every month – they learn your brand, your preferences, your standards over time",
  ],
  photoSrc: "/images/how it works/How it work - Real Team-v2.png",
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

export type HowItWorksTestimonial = {
  id: string;
  quote: string;
  attribution: string;
  /** Path under `/public` — add when portrait assets are available */
  imageSrc?: string;
  imageAlt: string;
};

export const howItWorksTestimonials: HowItWorksTestimonial[] = [
  {
    id: "convert-on-command",
    quote:
      "Freed Up 16 Hours A Week & Added $160k A Month To My Bottom Line",
    attribution: "Zach Schuenke, Convert on Command",
    imageSrc: "/images/how it works/testimonial-zach-schuenke.png",
    imageAlt: "Portrait of Zach Schuenke, Convert on Command",
  },
  {
    id: "my-site-ranked",
    quote:
      "I Was Able To Eliminate Frustrations From Working With People Overseas To Being Able To Do More Quality Work",
    attribution: "Michael Quinn, My Site Ranked",
    imageSrc: "/images/how it works/testimonial-michael-quinn.png",
    imageAlt: "Portrait of Michael Quinn, My Site Ranked",
  },
  {
    id: "sidecar-marketing",
    quote:
      "DeskTeam360 Has Helped Sidecar Marketing Solutions Save Thousands Of Dollars a Month and Free Countless Hours A Week!",
    attribution: "Rebekah Rius, Sidecar Marketing Solutions",
    imageSrc: "/images/how it works/testimonial-rebekah-rius.png",
    imageAlt: "Portrait of Rebekah Rius, Sidecar Marketing Solutions",
  },
];

export const howItWorksReadyCta = {
  title: "Ready to Hand Off the Work?",
  body: "Book a short call and we will map the work you want off your plate. See how a single flat rate replaces a stack of vendors—and still hits a 1–3 day cadence with real people in one office.",
  primaryCta: { href: "/book-a-call", label: "Book a Free Strategy Call" },
  secondaryCta: { href: "/#pricing", label: "See Plans & Pricing" },
  noteBelowButtons: "30-day money-back guarantee - No contracts - Cancel anytime",
  imageSrc: "/images/How it works - CTA.png",
  imageAlt: "Team member giving a thumbs up with a laptop",
};
