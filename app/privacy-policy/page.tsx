import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/pages/privacy-policy/PrivacyPolicyContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Learn how ${siteConfig.name} collects, uses, and protects your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-w-0 flex-col overflow-x-hidden bg-white">
      <PrivacyPolicyContent />
    </main>
  );
}
