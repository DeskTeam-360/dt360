export type ShowcaseHeroContent = {
  titleLine1: string;
  titleLine2: string;
  description: string;
};

export const showcaseHeroContent: ShowcaseHeroContent = {
  titleLine1: "400+ Clients,",
  titleLine2: "Real Work, Real Results",
  description:
    "Every project in this showcase was done by our team - the same team you'd get when you subscribe. No subcontractors. No stock mockups. No \"best work\" cherry-picking. This is what we do, every day, for businesses like yours.",
};

export const showcaseCategories = [
  "All Work",
  "Websites",
  "Graphic Design",
  "Video",
  "Funnels & Email",
  "Branding",
  "Social Media",
] as const;

export type ShowcaseItem = {
  id: string;
  title: string;
  image: string;
  categories: string[];
};

/** Items for hero carousel (5 items) */
export const showcaseItems: ShowcaseItem[] = [
  {
    id: "showcase-1",
    title: "Campaign Butler Website",
    image: "/images/showcase/Showcase1.png",
    categories: ["All Work", "Websites", "Funnels & Email"],
  },
  {
    id: "showcase-2",
    title: "Grumpy CFO - Youtube Profile Banner",
    image: "/images/showcase/Showcase2.png",
    categories: ["All Work", "Graphic Design", "Social Media"],
  },
  {
    id: "showcase-3",
    title: "Charisma Creative Leaders Club PDF",
    image: "/images/showcase/Showcase3.png",
    categories: ["All Work", "Graphic Design", "Branding"],
  },
  {
    id: "showcase-4",
    title: "John Paul Prebish - Home Page Website",
    image: "/images/showcase/Showcase4.png",
    categories: ["All Work", "Websites"],
  },
  {
    id: "showcase-5",
    title: "Horizons Bouquets Website",
    image: "/images/showcase/Showcase5.png",
    categories: ["All Work", "Websites", "Graphic Design"],
  },
];

/** Items for gallery grid marquee (alternating row scroll) */
export const showcaseGalleryItems: ShowcaseItem[] = [
  { id: "gallery-1",  title: "Fruit Juicy Drink - Product Label",           image: "/images/showcase/Showcase1.png", categories: ["All Work", "Graphic Design", "Branding"] },
  { id: "gallery-2",  title: "Edt Academy - Website",                       image: "/images/showcase/Showcase2.png", categories: ["All Work", "Websites"] },
  { id: "gallery-3",  title: "Functional Child Agency - Mobile App",         image: "/images/showcase/Showcase3.png", categories: ["All Work", "Websites", "Graphic Design"] },
  { id: "gallery-4",  title: "Butterfly Dreams - Social Media",             image: "/images/showcase/Showcase4.png", categories: ["All Work", "Social Media", "Graphic Design"] },
  { id: "gallery-5",  title: "Expo Event - Flyer Design",                   image: "/images/showcase/Showcase5.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-6",  title: "FAQ Page - Website Section",                  image: "/images/showcase/Showcase1.png", categories: ["All Work", "Websites"] },
  { id: "gallery-7",  title: "Thank You Card - Print Design",               image: "/images/showcase/Showcase2.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-8",  title: "Fit 4 Fall Challenge - Social Campaign",      image: "/images/showcase/Showcase3.png", categories: ["All Work", "Social Media", "Funnels & Email"] },
  { id: "gallery-9",  title: "Unchained Marketing Toolkit - Branding",      image: "/images/showcase/Showcase4.png", categories: ["All Work", "Branding", "Graphic Design"] },
  { id: "gallery-10", title: "Welcome to Action - Video Thumbnail",         image: "/images/showcase/Showcase5.png", categories: ["All Work", "Video", "Social Media"] },
  { id: "gallery-11", title: "Baptist Church - Flyer",                      image: "/images/showcase/Showcase1.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-12", title: "Niche Superstars - Website",                  image: "/images/showcase/Showcase2.png", categories: ["All Work", "Websites"] },
  { id: "gallery-13", title: "Raven Wood Works - Logo Design",              image: "/images/showcase/Showcase3.png", categories: ["All Work", "Branding"] },
  { id: "gallery-14", title: "Mental Health Circle - Event Flyer",          image: "/images/showcase/Showcase4.png", categories: ["All Work", "Graphic Design", "Social Media"] },
  { id: "gallery-15", title: "The Day America Died - Book Cover",           image: "/images/showcase/Showcase5.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-16", title: "Summer Course Homeschooling - Webpage",       image: "/images/showcase/Showcase1.png", categories: ["All Work", "Websites"] },
  { id: "gallery-17", title: "The Way How - Logo Design",                   image: "/images/showcase/Showcase2.png", categories: ["All Work", "Branding"] },
  { id: "gallery-18", title: "Sovereignty Through Healthy - Book Cover",    image: "/images/showcase/Showcase3.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-19", title: "Braintree Caveman Brain - Podcast Art",       image: "/images/showcase/Showcase4.png", categories: ["All Work", "Social Media", "Branding"] },
  { id: "gallery-20", title: "DTM Podcast Sponsorship Review - PDF",        image: "/images/showcase/Showcase5.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-21", title: "Fit Bodies 4 Life - Supplement Labels",       image: "/images/showcase/Showcase1.png", categories: ["All Work", "Graphic Design", "Branding"] },
  { id: "gallery-22", title: "Caveman Brain - Wall Logo",                   image: "/images/showcase/Showcase2.png", categories: ["All Work", "Branding"] },
  { id: "gallery-23", title: "DTM Fractional CMO - eBook",                  image: "/images/showcase/Showcase3.png", categories: ["All Work", "Graphic Design", "Funnels & Email"] },
  { id: "gallery-24", title: "DTM YouTube Thumbnails",                      image: "/images/showcase/Showcase4.png", categories: ["All Work", "Video", "Social Media"] },
  { id: "gallery-25", title: "The Quintin Group - Website",                 image: "/images/showcase/Showcase5.png", categories: ["All Work", "Websites"] },
  { id: "gallery-26", title: "Horizon Wellness - Landing Page",             image: "/images/showcase/Showcase1.png", categories: ["All Work", "Websites", "Funnels & Email"] },
  { id: "gallery-27", title: "Peak Performance - Social Posts",             image: "/images/showcase/Showcase2.png", categories: ["All Work", "Social Media"] },
  { id: "gallery-28", title: "Coastal Realty - Brochure",                   image: "/images/showcase/Showcase3.png", categories: ["All Work", "Graphic Design"] },
  { id: "gallery-29", title: "NextGen Fitness - Promo Video Thumb",         image: "/images/showcase/Showcase4.png", categories: ["All Work", "Video"] },
  { id: "gallery-30", title: "Alpha Consulting - Brand Identity",           image: "/images/showcase/Showcase5.png", categories: ["All Work", "Branding", "Graphic Design"] },
];

export type ClientStory = {
  id: string;
  highlight: string;
  quote: string;
  attribution: string;
  imageSrc: string;
  imageAlt: string;
  caseStudyHref: string;
};

export const clientStories: ClientStory[] = [
  {
    id: "relish-studio",
    highlight: "Relish Studio - our revenue went up by 10%-20% in 2023",
    quote:
      "This was due to the company's quality service. In addition, we know that things are getting done and having that peace of mind is a huge benefit. Not only does it help us stay focused on the things that matter most, but it also gives us predictability when organizing our monthly expenses.",
    attribution: "Stuart Swineford, Relish Studio",
    imageSrc: "/images/Showcase - Behind The Work.png",
    imageAlt: "Stuart Swineford from Relish Studio",
    caseStudyHref: "/case-studies/relish-studio-deskteam360-partnership",
  },
  {
    id: "convert-on-command",
    highlight: "Convert on Command - saved $20K/month vs. previous vendors",
    quote:
      "DeskTeam360 has been a game-changer for our business. The quality of work, the speed of delivery, and the reliability of the team have exceeded our expectations consistently.",
    attribution: "Zach S., Convert on Command",
    imageSrc: "/images/showcase/Image - Zach Schuenke - no border.png",
    imageAlt: "Zach S. from Convert on Command",
    caseStudyHref: "/case-studies/freed-up-16-hours-a-week-added-120k-a-month-to-their-bottom-line",
  },
];

export type ShowcaseCtaContent = {
  headingHighlight: string;
  headingLine2: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  note: string;
  imageSrc: string;
  imageAlt: string;
};

export const showcaseCtaContent: ShowcaseCtaContent = {
  headingHighlight: "Like What You See?",
  headingLine2: "Let's Talk About What We Can Build for You",
  description:
    "Every project in this showcase started with a conversation. A 30-minute strategy call where we figured out whether DeskTeam360 was the right fit. Most of the time, it was.",
  primaryCta: { href: "/book-a-call", label: "Book a Free Strategy Call" },
  secondaryCta: { href: "/#pricing", label: "See Plans & Pricing" },
  note: "30-day money-back guarantee - No contracts - Cancel anytime",
  imageSrc: "/images/Showcase - CTA.png",
  imageAlt: "DeskTeam360 team member smiling with arms crossed.",
};
