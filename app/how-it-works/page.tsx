import type { Metadata } from "next";
import { HowItWorksDelegationResults } from "@/components/pages/how-it-works/HowItWorksDelegationResults";
import { HowItWorksDontDo } from "@/components/pages/how-it-works/HowItWorksDontDo";
import { HowItWorksHero } from "@/components/pages/how-it-works/HowItWorksHero";
import { HowItWorksMeetGrid } from "@/components/pages/how-it-works/HowItWorksMeetGrid";
import { HowItWorksReadyCta } from "@/components/pages/how-it-works/HowItWorksReadyCta";
import { HowItWorksRealTeam } from "@/components/pages/how-it-works/HowItWorksRealTeam";
import { HowItWorksTaskSteps } from "@/components/pages/how-it-works/HowItWorksTaskSteps";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: `${siteConfig.name} — What we do, what we don't, and how tasks get done in days—not weeks.`,
};

export default function HowItWorksPage() {
  return (
    <main className="min-w-0 overflow-x-hidden pt-0">
      <HowItWorksHero />
      <HowItWorksTaskSteps />
      <HowItWorksMeetGrid />
      <HowItWorksDontDo />
      <HowItWorksRealTeam />
      <HowItWorksDelegationResults />
      <HowItWorksReadyCta />
    </main>
  );
}
