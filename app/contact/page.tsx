import type { Metadata } from "next";
import { ContactHero } from "@/components/pages/contact/ContactHero";
import { ContactMain } from "@/components/pages/contact/ContactMain";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}. Send a message or use live chat for a quick response.`,
};

export default function ContactPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden bg-white">
      <ContactHero />
      <ContactMain />
    </main>
  );
}
