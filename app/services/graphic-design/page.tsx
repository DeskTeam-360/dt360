import type { Metadata } from "next";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { faqItems } from "@/components/pages/service/graphic-design/FAQ";
import { withPageCanonical } from "@/lib/seo";
import { FAQ } from "@/components/pages/service/graphic-design/FAQ";
import { Hero } from "@/components/pages/service/graphic-design/Hero";
import { Testimonials } from "@/components/pages/service/graphic-design/Testimonials";

export const metadata: Metadata = withPageCanonical("/services/graphic-design", {
  title: "Graphic Design",
});

export default function GraphicDesignPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd items={serviceBreadcrumbs("Graphic Design", "/services/graphic-design")} />
      <ServiceJsonLd name="Graphic Design" path="/services/graphic-design" />
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

