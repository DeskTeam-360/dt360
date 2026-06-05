/** Floating blue feature bar — replace iconSrc with assets from `/public/images/...` */
export type ServicesFloatingFeature = {
  id: string;
  title: string;
  description: string;
  iconSrc?: string;
};

/** Quote photo placeholder — add assets to `/public/images/...` and set imageSrc */
export type ServicesTestimonial = {
  id: string;
  quote: string;
  attribution: string;
  /** Path under `/public`, e.g. `/images/services/testimonial-1.jpg` */
  imageSrc?: string;
  imageAlt: string;
};

export const servicesFloatingFeatures: ServicesFloatingFeature[] = [
  {
    id: "na",
    title: "North American Account Management",
    description: "Real people. Real communication. Zero time zone headaches.",
    iconSrc: "/images/dt360-american-flag.png",
  },
  {
    id: "turnaround",
    title: "1-3 Day Turnaround",
    description: "Most tasks delivered in 1-3 business days.",
    iconSrc: "/images/dt360-bolt-icon.png",
  },
  {
    id: "revisions",
    title: "Unlimited Revisions",
    description: "We don't stop until it's perfect.",
    iconSrc: "/images/dt360-loop-icon.png",
  },
];

export const servicesTestimonials: ServicesTestimonial[] = [
  {
    id: "tobie-group",
    quote:
      '"One of Those Consistent Pieces We Can Rely On" – How The Tobie Group Transformed from Ad Agency to Full-Service Provider with DeskTeam360',
    attribution: "Ryan Burch, Tobie Group",
    imageSrc: "/images/services/testimonial-ryan-burch.png",
    imageAlt: "Portrait of Ryan Burch, Tobie Group",
  },
  {
    id: "duct-tape-marketing",
    quote:
      "See How Duct Tape Marketing Was Able to Get Better Quality Projects, Done Faster & Less Expensive Than Their Previous Provider!",
    attribution: "Sara Nay, Duct Tape Marketing",
    imageSrc: "/images/services/testimonial-sara-nay.png",
    imageAlt: "Portrait of Sara Nay, Duct Tape Marketing",
  },
  {
    id: "charisma-ink",
    quote:
      "With The Help Of DeskTeam360, Charisma Ink. Is Saving $20,000 A Month Without The Stress Or Hassle Of The Hiring Process!",
    attribution: "Gaynor Meilke, Charisma Ink",
    imageSrc: "/images/services/testimonial-gaynor-meilke.png",
    imageAlt: "Portrait of Gaynor Meilke, Charisma Ink",
  },
];



