import type { Metadata } from "next";
import { AffiliateProgramHero } from "@/components/pages/affiliate-program/AffiliateProgramHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description: `Join the ${siteConfig.name} affiliate program and earn commissions for qualified referrals.`,
};

export default function AffiliateProgramPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden bg-white">
      <AffiliateProgramHero />
    </main>
  );
}
