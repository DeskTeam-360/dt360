import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/crm-automation/FAQ";
import { Hero } from "@/components/pages/service/crm-automation/Hero";

export const metadata: Metadata = withPageCanonical("/services/crm-automation", {
  title: "CRM & Automation",
});

export default function CrmAutomationPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("CRM & Automation", "/services/crm-automation")} />
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

