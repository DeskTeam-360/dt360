import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/seo";
import { CaseStudy } from "@/components/pages/service/white-label/CaseStudy";
import { FAQ } from "@/components/pages/service/white-label/FAQ";
import { Hero } from "@/components/pages/service/white-label/Hero";
import { WhoItsFor } from "@/components/pages/service/white-label/WhoItsFor";

export const metadata: Metadata = withPageCanonical("/services/white-label", {
  title: "White Label",
});

export default function WhiteLabelPage() {
  return (
    <main className="bg-white">
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <WhoItsFor />
      </div>
      <div className="-mt-px mx-0 px-0">
        <CaseStudy />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

