import type { Metadata } from "next";
import { DemoCallScheduledThankYouContent } from "@/components/pages/demo-call-scheduled-thank-you/DemoCallScheduledThankYouContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Consultation Booked — Thank You",
  description: `Your consultation with ${siteConfig.name} is booked. Follow the steps below to prepare for your call.`,
  robots: { index: false, follow: false },
};

export default function DemoCallScheduledThankYouPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden bg-white">
      <DemoCallScheduledThankYouContent />
    </main>
  );
}
