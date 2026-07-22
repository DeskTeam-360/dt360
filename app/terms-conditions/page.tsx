import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/seo";
import { TermsConditionsContent } from "@/components/pages/terms-conditions/TermsConditionsContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = withPageCanonical("/terms-conditions", {
  title: "Terms & Conditions",
  description: `Read the terms and conditions for using ${siteConfig.name} website and subscription services.`,
});

export default function TermsConditionsPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden bg-white">
      <TermsConditionsContent />
    </main>
  );
}
