import type { Metadata } from "next";
import { CareersApplication } from "@/components/pages/careers/CareersApplication";
import { CareersHero } from "@/components/pages/careers/CareersHero";
import { CareersOpportunities } from "@/components/pages/careers/CareersOpportunities";
import { CareersValues } from "@/components/pages/careers/CareersValues";
import { CareersWhyUs } from "@/components/pages/careers/CareersWhyUs";
import { BreadcrumbJsonLd, homeBreadcrumb } from "@/components/seo/BreadcrumbJsonLd";
import { withPageCanonical } from "@/lib/seo";

export const metadata: Metadata = withPageCanonical("/careers", {
  // Absolute — avoid layout template doubling to "Careers | DeskTeam360 | DeskTeam360"
  title: { absolute: "Careers | DeskTeam360" },
  description:
    "Build your career with DeskTeam360. Explore roles across technical, operations, sales, content, and paid media — or join our talent pool.",
});

export default function CareersPage() {
  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-white">
      <BreadcrumbJsonLd
        items={[homeBreadcrumb(), { name: "Careers", path: "/careers" }]}
      />
      <CareersHero />
      <CareersValues />
      <CareersOpportunities />
      <CareersWhyUs />
      <CareersApplication />
    </main>
  );
}
