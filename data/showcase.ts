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

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "showcase-1",
    title: "Campaign Butler Website",
    image: "/images/showcase/Showcase1.png",
    categories: ["Websites", "Funnels & Email"],
  },
  {
    id: "showcase-2",
    title: "Grumpy CFO - Youtube Profile Banner",
    image: "/images/showcase/Showcase2.png",
    categories: ["Graphic Design", "Social Media"],
  },
  {
    id: "showcase-3",
    title: "Charisma Creative Leaders Club PDF",
    image: "/images/showcase/Showcase3.png",
    categories: ["Graphic Design", "Branding"],
  },
  {
    id: "showcase-4",
    title: "John Paul Prebish - Home Page Website",
    image: "/images/showcase/Showcase4.png",
    categories: ["Websites"],
  },
  {
    id: "showcase-5",
    title: "Horizons Bouquets Website",
    image: "/images/showcase/Showcase5.png",
    categories: ["Websites", "Graphic Design"],
  },
];
