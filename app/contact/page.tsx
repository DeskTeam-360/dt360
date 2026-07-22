import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/seo";
import { ContactHero } from "@/components/pages/contact/ContactHero";
import { ContactMain } from "@/components/pages/contact/ContactMain";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = withPageCanonical("/contact", {
  title: "Contact",
  description: `Contact ${siteConfig.name}. Send a message or use live chat for a quick response.`,
});

export default function ContactPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden bg-white">
      <ContactHero />
      <div className="relative z-10 -mb-8 w-full overflow-y-hidden lg:-mb-10" aria-hidden>
        <svg
          className="block h-[calc(var(--spacing)*12)] w-full sm:h-14 lg:h-16"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#11104C" d="M0,0 L1440,0 L1440,78 Q720,8 0,78 Z" />
        </svg>
      </div>
      <ContactMain />
    </main>
  );
}
