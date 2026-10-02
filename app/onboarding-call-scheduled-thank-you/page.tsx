import type { Metadata } from "next";
import { OnboardingCallScheduledThankYouHero } from "@/components/pages/onboarding-call-scheduled-thank-you/OnboardingCallScheduledThankYouHero";
import { GaBookedCallEvent } from "@/components/seo/GaBookedCallEvent";
import { siteConfig } from "@/config/site";
import { withPageCanonical } from "@/lib/seo";

export const metadata: Metadata = withPageCanonical("/onboarding-call-scheduled-thank-you", {
  title: "Onboarding Call Scheduled — Thank You",
  description: `Thank you for scheduling your onboarding call with ${siteConfig.name}.`,
  robots: { index: false, follow: false },
});

export default function OnboardingCallScheduledThankYouPage() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible bg-[#F5F8FF]">
      <GaBookedCallEvent source="onboarding_call_thank_you" />
      <OnboardingCallScheduledThankYouHero />
    </main>
  );
}
