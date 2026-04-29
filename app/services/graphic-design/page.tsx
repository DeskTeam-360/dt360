import { FAQ } from "@/components/pages/service/graphic-design/FAQ";
import { Hero } from "@/components/pages/service/graphic-design/Hero";
import { Testimonials } from "@/components/pages/service/graphic-design/Testimonials";

export default function GraphicDesignPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <Hero />
      <div className="-mt-px">
        <Testimonials />
      </div>
      <div className="-mt-px">
        <FAQ />
      </div>
    </main>
  );
}
