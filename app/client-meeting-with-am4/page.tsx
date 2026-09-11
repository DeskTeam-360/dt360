import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/seo";
import { ClientMeetingWithAm4Hero } from "@/components/pages/client-meeting-with-am4/ClientMeetingWithAm4Hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = withPageCanonical("/client-meeting-with-am4", {
  title: "Client Meeting with Lex",
  description: `Schedule your client meeting with Lex at ${siteConfig.name}.`,
});

export default function ClientMeetingWithAm4Page() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible bg-[#F5F8FF]">
      <ClientMeetingWithAm4Hero />
    </main>
  );
}
