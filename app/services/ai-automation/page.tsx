import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/ai-automation/FAQ";
import { Hero } from "@/components/pages/service/ai-automation/Hero";

export const metadata: Metadata = withPageCanonical("/services/ai-automation", {
  title: "AI & Automation",
});

export default function AiAutomationPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("AI & Automation", "/services/ai-automation")} />
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

