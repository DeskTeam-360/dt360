export type PricingPlan = {
  id: string;
  title: string;
  price: number;
  /** Warna isi kartu */
  cardBg: string;
  /** Warna pita judul (lebih gelap) */
  ribbonBg: string;
  /** Warna teks tombol & ikon chevron */
  accentText: string;
  features: string[];
};

/** Ubah paket harga di sini */
export const pricingPlans: PricingPlan[] = [
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    price: 1497,
    cardBg: "#8b5cf6",
    ribbonBg: "#6d28d9",
    accentText: "#6d28d9",
    features: [
      "1 active task",
      "Full team access",
      "US-based account manager",
      "1-3 business day turnaround",
      "Unlimited revisions",
      "30-day money-back guarantee",
    ],
  },
  {
    id: "marketer",
    title: "Marketer",
    price: 2994,
    cardBg: "#fb7185",
    ribbonBg: "#be123c",
    accentText: "#be123c",
    features: [
      "2 active tasks",
      "Full team access",
      "Priority account manager",
      "1-3 business day turnaround",
      "Unlimited revisions",
      "30-day money-back guarantee",
    ],
  },
  {
    id: "agency",
    title: "Agency",
    price: 4491,
    cardBg: "#4ade80",
    ribbonBg: "#15803d",
    accentText: "#15803d",
    features: [
      "3 active tasks",
      "Full team access",
      "Dedicated senior account manager",
      "1-3 business day turnaround",
      "White-label delivery",
      "30-day money-back guarantee",
    ],
  },
];
