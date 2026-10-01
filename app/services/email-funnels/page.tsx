import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { faqItems } from "@/components/pages/service/email-funnels/FAQ";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/email-funnels/FAQ";
import { Hero } from "@/components/pages/service/email-funnels/Hero";
import { PlatformsSupported } from "@/components/pages/service/email-funnels/PlatformsSupported";

export const metadata: Metadata = withPageCanonical("/services/email-funnels", {
  title: "Email & Funnels",
});

export default function EmailFunnelsPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("Email & Funnels", "/services/email-funnels")} />
      <ServiceJsonLd name="Email & Funnels" path="/services/email-funnels" />
      <FaqPageJsonLd items={faqItems} />
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <PlatformsSupported />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

