import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, serviceBreadcrumbs } from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import {
  Gate5ServicePage,
  gate5ServiceFaqJsonLdItems,
} from "@/components/pages/gate5/Gate5ServicePage";
import { getGate5ServicePage } from "@/data/gate5ServicePages";
import { withPageCanonical } from "@/lib/seo";

const page = getGate5ServicePage("video-editing");

export const metadata: Metadata = withPageCanonical("/services/video-editing", {
  title: page?.titleTag,
  description: page?.metaDescription,
});

export default function VideoEditingPage() {
  if (!page) notFound();

  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={serviceBreadcrumbs(page.breadcrumbName, page.path)}
      />
      <ServiceJsonLd name={page.breadcrumbName} path={page.path} />
      <FaqPageJsonLd items={gate5ServiceFaqJsonLdItems(page)} />
      <Gate5ServicePage page={page} />
    </main>
  );
}
