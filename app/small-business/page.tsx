import type { Metadata } from "next";
import { Gate5ProsePage } from "@/components/pages/gate5/Gate5ProsePage";
import {
  BreadcrumbJsonLd,
  homeBreadcrumb,
} from "@/components/seo/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/seo/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { getGate5StaticHeroArt } from "@/data/gate5HeroArt";
import { getGate5StaticPage } from "@/data/gate5StaticPages";
import { withPageCanonical } from "@/lib/seo";

const page = getGate5StaticPage("small-business")!;
const heroArt = getGate5StaticHeroArt("small-business");

export const metadata: Metadata = withPageCanonical("/small-business", {
  title: page.titleTag,
  description: page.metaDescription,
});

export default function SmallBusinessPage() {
  return (
    <main className="bg-white">
      <BreadcrumbJsonLd
        items={[
          homeBreadcrumb(),
          { name: "Small Businesses", path: "/small-business" },
        ]}
      />
      <ServiceJsonLd name={page.h1} path="/small-business" />
      <FaqPageJsonLd items={page.faqs} />
      <Gate5ProsePage
        h1={page.h1}
        lead={page.metaDescription}
        heroArt={heroArt}
        contentHtml={page.contentHtml}
      />
    </main>
  );
}
