import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/pages/case-studies/CaseStudiesHero";
import { DeskTeam360sCaseStudies } from "@/components/pages/case-studies/DeskTeam360sCaseStudies";
import { HaveQuestionsCTA } from "@/components/pages/case-studies/HaveQuestionsCTA";
import { siteConfig } from "@/config/site";
import { withPageCanonical } from "@/lib/seo";
import { getAllCaseStudyPosts } from "@/lib/wordpress";

export const metadata: Metadata = withPageCanonical("/case-studies", {
  title: "Case Studies",
  description:
    "Learn from customers DeskTeam360 has helped. Real stories, results, and how dedicated insourcing teams deliver.",
  openGraph: {
    title: `Case Studies | ${siteConfig.name}`,
    description:
      "Learn from customers DeskTeam360 has helped. Real stories and results from dedicated creative and tech teams.",
  },
});

export const revalidate = 600; // 10 minutes

export default async function CaseStudiesPage() {
  const posts = await getAllCaseStudyPosts();

  return (
    <main className="flex w-full flex-col overflow-hidden bg-white">
      <CaseStudiesHero />
      <DeskTeam360sCaseStudies posts={posts} />
      <HaveQuestionsCTA />
    </main>
  );
}
