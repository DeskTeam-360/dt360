import type { Metadata } from "next";
import { DemoCallScheduledThankYouContent } from "@/components/pages/demo-call-scheduled-thank-you/DemoCallScheduledThankYouContent";
import { siteConfig } from "@/config/site";
import { withPageCanonical } from "@/lib/seo";

export const metadata: Metadata = withPageCanonical("/demo-call-scheduled-thank-you", {
  title: "Consultation Booked — Thank You",
  description: `Your consultation with ${siteConfig.name} is booked. Follow the steps below to prepare for your call.`,
  robots: { index: false, follow: false },
});

export default function DemoCallScheduledThankYouPage() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible bg-[#F5F8FF]">
      <DemoCallScheduledThankYouContent />
    </main>
  );
}
