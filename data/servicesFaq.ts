/** FAQ copy for /services index (shared by UI + FAQPage JSON-LD). */

export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const SERVICES_INDEX_FAQ_ITEMS: ServiceFaqItem[] = [
  {
    id: "projects",
    question: "What kinds of projects can I submit?",
    answer:
      "Anything from website tasks, design tasks, video tasks. Landing pages, GoHighLevel funnels, WooCommerce stores, custom WordPress builds - if it's web work, we handle it.",
  },
  {
    id: "freelancer-difference",
    question: "How is this different from hiring a Freelancer?",
    answer:
      "You get a dedicated managed team with reliable turnaround, quality control, and unlimited revisions instead of depending on one individual freelancer.",
  },
  {
    id: "multiple-projects",
    question: "Can I submit multiple projects at once?",
    answer:
      "Yes. You can queue multiple tasks and we will prioritize and deliver them in order while keeping communication simple and transparent.",
  },
];

/** Legacy web-design FAQ (kept for ServicesFaqSection variant; F11 page uses Gate5 FAQs). */
export const WEB_DESIGN_FAQ_ITEMS: ServiceFaqItem[] = [
  {
    id: "projects",
    question: "What kinds of web projects can I submit?",
    answer:
      "Anything from a quick homepage update to a full website rebuild. Landing pages, GoHighLevel funnels, WooCommerce stores, custom WordPress builds - if it's web work, we handle it.",
  },
  {
    id: "freelancer-difference",
    question: "How is this different from hiring a web developer?",
    answer:
      "A freelance web developer bills hourly, goes dark between projects, and has one skill. Your DeskTeam360 web subscription includes 2 developers plus designers, tech VAs, and a North American account manager - all for one flat monthly rate.",
  },
  {
    id: "multiple-projects",
    question: "Can I submit multiple web projects at once?",
    answer:
      "The number of simultaneous tasks depends on your plan. Entrepreneur handles 1 at a time, Marketer handles 2, Agency handles 3. Bigger queue, upgrade your plan.",
  },
];
