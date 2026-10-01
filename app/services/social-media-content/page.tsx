import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { faqItems } from "@/components/pages/service/social-media-content/FAQ";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/social-media-content/FAQ";
import { Hero } from "@/components/pages/service/social-media-content/Hero";
import { PlatformsSupported } from "@/components/pages/service/social-media-content/PlatformsSupported";

export const metadata: Metadata = withPageCanonical("/services/social-media-content", {
  title: "Social Media Content",
});

export default function SocialMediaContentPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("Social Media Content", "/services/social-media-content")} />
      <ServiceJsonLd name="Social Media Content" path="/services/social-media-content" />
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

