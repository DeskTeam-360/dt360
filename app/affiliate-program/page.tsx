import type { Metadata } from "next";
import { AffiliateProgramHero } from "@/components/pages/affiliate-program/AffiliateProgramHero";
import { AffiliateProgramMain } from "@/components/pages/affiliate-program/AffiliateProgramMain";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description: `Earn recurring commissions with the free ${siteConfig.name} partner program.`,
};

export default function AffiliateProgramPage() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden bg-white [&_p]:font-semibold">
      <AffiliateProgramHero />
      <AffiliateProgramMain />
    </main>
  );
}
