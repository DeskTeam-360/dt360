import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/seo";
import { OnboardingCallAm2Hero } from "@/components/pages/onboarding-call-am2/OnboardingCallAm2Hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = withPageCanonical("/onboarding-call-am2", {
  title: "Onboarding Call — Book a Call",
  description: `Schedule your onboarding call with ${siteConfig.name}.`,
});

export default function OnboardingCallAm2Page() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible bg-[#F5F8FF]">
      <OnboardingCallAm2Hero />
    </main>
  );
}
