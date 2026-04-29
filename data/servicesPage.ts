/** Section bar biru mengambang — gantikan iconSrc dengan asset di `/public/images/...` */
export type ServicesFloatingFeature = {
  id: string;
  title: string;
  description: string;
  iconSrc?: string;
};

/** Placeholder foto quote — tambahkan ke `/public/images/...` lalu set imageSrc */
export type ServicesTestimonial = {
  id: string;
  quote: string;
  attribution: string;
  /** Path di bawah `/public`, e.g. `/images/services/testimonial-1.jpg` */
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
    id: "1",
    quote:
      "I was spending 20+ hours a week managing designers and developers. Now I send a task and it gets done. DeskTeam360 gave me my time back.",
    attribution: "Luke Dalien, Special Ed Resource",
    imageAlt: "Portrait of Luke Dalien",
  },
  {
    id: "2",
    quote:
      "Saving at least $20,000 monthly compared to what I was paying individual contractors - and the quality and reliability is better.",
    attribution: "Gaynor Milky, Charisma Ink",
    imageAlt: "Portrait of Gaynor Milky",
  },
  {
    id: "3",
    quote:
      "We went from barely keeping up with client work to running a full-service agency. We save a minimum of 10-15 hours a week.",
    attribution: "Andreas Fanelli, Libra Growth Labs",
    imageSrc: "/images/dt360-fanelli.png",
    imageAlt: "Portrait of Andreas Fanelli",
  },
];



