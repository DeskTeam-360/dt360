export const caseStudiesHero = {
  title: "Learn from Other Customers",
  subtitle: "That have been helped by DeskTeam360",
  ctaLabel: "Learn Their Stories",
  ctaHref: "#case-studies-stories",
  waveLineSrc: "/images/case-studies/vertical bg line hero.png",
  waveLineAlt: "Decorative gradient wave line",
  waveLine4kSrc: "/images/case-studies/Hero banner background 4k.png",
  waveLine4kAlt: "Decorative gradient hero banner ribbon",
  backgroundSrc: "/images/case-studies/bg hero section no curve.png",
  backgroundAlt: "Case studies hero background",
  manLeftSrc: "/images/case-studies/man left bg case studies.png",
  manLeftAlt: "Customer success illustration with analytics and development icons",
  womanRightSrc: "/images/case-studies/woman right bg case studies.png",
  womanRightAlt: "Customer success illustration with dashboard monitors and ratings",
  letItGrow: {
    title: "Let it Grow",
    description:
      "Generally speaking, if you can describe your graphic, marketing tech or web-page request clearly in a written email or a 5-minute video, we’ll get it done.",
    squareGraphicSrc: "/images/case-studies/square curve graphic.png",
    squareGraphicAlt: "",
    codeGraphicSrc: "/images/case-studies/tag code graphic.png",
    codeGraphicAlt: "",
  },
} as const;

export const caseStudiesListSection = {
  title: "DeskTeam360's Case Studies",
  subtitle: "Real results from teams using DeskTeam360",
  emptyMessage: "No case studies published yet. Check back soon.",
  readLabel: "Read More",
  categoryLabel: "Case Study",
} as const;

import type { BlogPost } from "./blog";

export const dummyCaseStudies = [
  {
    id: "1",
    slug: "the-tobie-group",
    title: `"One of Those Consistent Pieces We Can Rely On" – How The Tobie Group Transformed from Ad Agency to Full-Service Provider with DeskTeam360`,
    excerpt: `The Background Ryan Burch founded The Tobie Group in 2019 as a strategic marketing agency based in Arizona. With nearly two decades of experience in digital marketing and paid advertising, Ryan built his agency on`,
    image: "/images/case-studies/the-tobie-group.png",
  },
  {
    id: "2",
    slug: "freed-up-16-hours",
    title: `Freed Up 16 Hours A Week & Added $160k A Month To Their Bottom Line`,
    excerpt: `The Background Zach Schuenke started his entrepreneurial journey just 5 years ago. He was an engineer that like most people wanted more time and freedom. He started doing affiliate marketing and then started his marketing`,
    image: "/images/case-studies/freed-up-16-hours.png",
  },
  {
    id: "3",
    slug: "duct-tape-marketing",
    title: `See How Duct Tape Marketing Was Able to Get Better Quality Projects, Done Faster & Less Expensive Than Their Previous Provider!`,
    excerpt: `The Background I've been with Duct Tape Marketing for about twelve years now. We have a few different elements of our business. We are your traditional marketing agency where we work with small business clients.`,
    image: "/images/case-studies/duct-tape-marketing.png",
  },
  {
    id: "4",
    slug: "relish-studio",
    title: `I Now Have A Peace Of Mind And Predictability Around Projects Getting Done. I Think Of DeskTeam360 As A Partner And Not Just A Vendor!`,
    excerpt: `The Background Our business, Relish Studio, is based in Denver. We help people with digital marketing – specifically with relationship building, online presence, branding, and resource products and tools. The Process We started working with`,
    image: "/images/case-studies/relish-studio.png",
  },
  {
    id: "5",
    slug: "my-site-ranked",
    title: `I Was Able To Eliminate Frustrations From Working With People Overseas To Being Able To Do More Quality Work`,
    excerpt: `The Background I'm an SEO expert and I've run a digital marketing agency for seven years. I am located in North Dakota and am the founder of My Site Ranked, which educates marketers about SEO.`,
    image: "/images/case-studies/my-site-ranked.png",
  },
  {
    id: "6",
    slug: "charisma-ink",
    title: `With The Help Of DeskTeam360, Charisma Ink. Is Saving $20,000 A Month Without The Stress Or Hassle Of The Hiring Process!`,
    excerpt: `The Background I started my business, Charisma Ink., ten years ago. Our agency combines PR, digital marketing, ghostwriting, book publishing, and influencer marketing in the accounting and fintech industries. The Process I first found DeskTeam360`,
    image: "/images/case-studies/charisma-ink.png",
  },
  {
    id: "7",
    slug: "sidecar-marketing",
    title: `See How DeskTeam360 Has Helped Sidecar Marketing Solutions Save Thousands Of Dollars A Month and Free Countless Hours A Week!`,
    excerpt: `The Background We're Sidecar Marketing Solutions, which I started up in 2012. We're a marketing agency that works with solo entrepreneurs and small business owners. We provide marketing strategy and implementation for the business.`,
    image: "/images/case-studies/sidecar-marketing.png",
  },
  {
    id: "8",
    slug: "libra-growth-labs",
    title: `Libra Growth Labs Switched To DeskTeam360, And They Are Now Able To Focus On Strategy And Growth Without The Dread Of The Back And Forth!`,
    excerpt: `The Background We are a growth consultancy. We help businesses either get from zero to one or just scale very quickly, using ads, digital content, or any other sort of high-`,
    image: "/images/case-studies/libra-growth-labs.png",
  },
  {
    id: "9",
    slug: "first-call-digital",
    title: `First Call Digital Agency Has Increased Their Quality Of Work And Reduced Their Wait Time On Tasks With DeskTeam360!`,
    excerpt: `The Background My business, First Call Digital Agency, is based in Montana but serves all of the US. We specialize in MSPs but offer full-service digital agency work, including ads, social media, web development, graphic`,
    image: "/images/case-studies/first-call-digital.png",
  }
] as BlogPost[];
