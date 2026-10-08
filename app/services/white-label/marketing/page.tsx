import type { Metadata } from "next";
import { Gate5ProsePage } from "@/components/pages/gate5/Gate5ProsePage";
import {
  BreadcrumbJsonLd,
  serviceBreadcrumbs,
} from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { getGate5StaticPage } from "@/data/gate5StaticPages";
import { withPageCanonical } from "@/lib/seo";

const page = getGate5StaticPage("white-label-marketing")!;

export const metadata: Metadata = withPageCanonical(
  "/services/white-label/marketing",
  {
    title: page.titleTag,
    description: page.metaDescription,
  },
);

export default function WhiteLabelMarketingPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={serviceBreadcrumbs(
          "White Label Marketing Help",
          "/services/white-label/marketing",
        )}
      />
      <ServiceJsonLd
        name={page.h1}
        path="/services/white-label/marketing"
      />
      <FaqPageJsonLd items={page.faqs} />
      <Gate5ProsePage h1={page.h1} contentHtml={page.contentHtml} />
    </main>
  );
}
