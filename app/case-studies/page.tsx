import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/pages/case-studies/CaseStudiesHero";
import { CaseStudiesList } from "@/components/pages/case-studies/CaseStudiesList";
import { siteConfig } from "@/config/site";
import { getCaseStudyPosts } from "@/lib/wordpress";

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

export default async function CaseStudiesPage() {
  const caseStudyPosts = await getCaseStudyPosts();

  return (
    <main className="flex w-full flex-col overflow-hidden bg-white">
      <CaseStudiesHero />
      <CaseStudiesList posts={caseStudyPosts} />
    </main>
  );
}
