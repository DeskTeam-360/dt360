import { FAQ } from "@/components/pages/service/graphic-design/FAQ";
import { Hero } from "@/components/pages/service/graphic-design/Hero";
import { Testimonials } from "@/components/pages/service/graphic-design/Testimonials";

export default function GraphicDesignPage() {
  return (
    <main className="bg-white">
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
