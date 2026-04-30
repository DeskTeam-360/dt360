import { AboutCoreValues } from "@/components/pages/about/AboutCoreValues";
import { AboutCta } from "@/components/pages/about/AboutCta";
import { AboutHeroStory } from "@/components/pages/about/AboutHeroStory";
import { AboutNumbersThatMatter } from "@/components/pages/about/AboutNumbersThatMatter";
import { AboutStoryTimeline } from "@/components/pages/about/AboutStoryTimeline";
import { AboutTeamDifference } from "@/components/pages/about/AboutTeamDifference";
import { AboutTeamPeople } from "@/components/pages/about/AboutTeamPeople";

export default function AboutPage() {
  return (
    <main className="flex flex-col pt-16 lg:pt-[72px] bg-white w-full overflow-hidden">
      <AboutHeroStory />
      <AboutStoryTimeline />
      <AboutNumbersThatMatter />
      <AboutTeamPeople />
      <AboutTeamDifference />
      <AboutCoreValues />
      <AboutCta />
    </main>
  );
}
