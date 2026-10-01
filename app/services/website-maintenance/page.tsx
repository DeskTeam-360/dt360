import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { faqItems } from "@/components/pages/service/website-maintenance/FAQ";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/website-maintenance/FAQ";
import { Hero } from "@/components/pages/service/website-maintenance/Hero";

export const metadata: Metadata = withPageCanonical("/services/website-maintenance", {
  title: "Website Maintenance",
});

export default function WebsiteMaintenancePage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("Website Maintenance", "/services/website-maintenance")} />
      <ServiceJsonLd name="Website Maintenance" path="/services/website-maintenance" />
      <FaqPageJsonLd items={faqItems} />
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

