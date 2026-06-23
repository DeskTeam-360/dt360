import type { Metadata } from "next";
import { ClientMeetingWithAm2Hero } from "@/components/pages/client-meeting-with-am2/ClientMeetingWithAm2Hero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Client Meeting with JD",
  description: `Schedule your client meeting with JD at ${siteConfig.name}.`,
};

export default function ClientMeetingWithAm2Page() {
  return (
    <main className="relative flex min-w-0 flex-col overflow-x-hidden overflow-y-visible bg-[#F5F8FF]">
      <ClientMeetingWithAm2Hero />
    </main>
  );
}
