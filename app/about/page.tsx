import type { Metadata } from "next";
import { AboutCoreValues } from "@/components/pages/about/AboutCoreValues";
import { AboutCta } from "@/components/pages/about/AboutCta";
import { AboutHeroStory } from "@/components/pages/about/AboutHeroStory";
import { AboutNumbersThatMatter } from "@/components/pages/about/AboutNumbersThatMatter";
import { AboutStoryTimeline } from "@/components/pages/about/AboutStoryTimeline";
import { AboutTeamPeople } from "@/components/pages/about/AboutTeamPeople";
import { AboutPageJsonLd } from "@/components/seo/AboutPageJsonLd";
import { BreadcrumbJsonLd, homeBreadcrumb } from "@/components/seo/BreadcrumbJsonLd";
import { withPageCanonical } from "@/lib/seo";

export const metadata: Metadata = withPageCanonical("/about", {
  title: "About",
  description:
    "Meet the DeskTeam360 story, team, and values behind dedicated creative and tech insourcing.",
});

export default function AboutPage() {
  return (
    <main className="flex flex-col bg-white w-full overflow-hidden">
      <AboutPageJsonLd />
      <BreadcrumbJsonLd
        items={[homeBreadcrumb(), { name: "About", path: "/about" }]}
      />
      <AboutHeroStory />
      <AboutStoryTimeline />
      <AboutNumbersThatMatter />
      <AboutTeamPeople />
      <AboutCoreValues />
      <AboutCta />
    </main>
  );
}
