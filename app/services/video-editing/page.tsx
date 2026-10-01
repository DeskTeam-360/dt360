import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { faqItems } from "@/components/pages/service/video-editing/FAQ";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/video-editing/FAQ";
import { Hero } from "@/components/pages/service/video-editing/Hero";
import { Testimonials } from "@/components/pages/service/video-editing/Testimonials";

export const metadata: Metadata = withPageCanonical("/services/video-editing", {
  title: "Video Editing",
});

export default function VideoEditingPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("Video Editing", "/services/video-editing")} />
      <ServiceJsonLd name="Video Editing" path="/services/video-editing" />
      <FaqPageJsonLd items={faqItems} />
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <Testimonials />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

