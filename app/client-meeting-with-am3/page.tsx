import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/seo";
import { ClientMeetingWithAm3Hero } from "@/components/pages/client-meeting-with-am3/ClientMeetingWithAm3Hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = withPageCanonical("/client-meeting-with-am3", {
  title: "Client Meeting with Rozita",
  description: `Schedule your client meeting with Rozita at ${siteConfig.name}.`,
});

export default function ClientMeetingWithAm3Page() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible bg-[#F5F8FF]">
      <ClientMeetingWithAm3Hero />
    </main>
  );
}
