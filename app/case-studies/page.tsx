import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/pages/case-studies/CaseStudiesHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Learn from customers DeskTeam360 has helped. Real stories, results, and how dedicated insourcing teams deliver.",
  openGraph: {
    title: `Case Studies | ${siteConfig.name}`,
    description:
      "Learn from customers DeskTeam360 has helped. Real stories and results from dedicated creative and tech teams.",
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="flex w-full flex-col overflow-hidden bg-white">
      <CaseStudiesHero />
    </main>
  );
}
