import { CaseStudy } from "@/components/pages/service/white-label/CaseStudy";
import { FAQ } from "@/components/pages/service/white-label/FAQ";
import { Hero } from "@/components/pages/service/white-label/Hero";
import { WhoItsFor } from "@/components/pages/service/white-label/WhoItsFor";

export default function WhiteLabelPage() {
  return (
    <main className="bg-white">
      <Hero />
      <div className="-mt-px">
        <WhoItsFor />
      </div>
      <div className="-mt-px">
        <CaseStudy />
      </div>
      <div className="-mt-px">
        <FAQ />
      </div>
    </main>
  );
}
