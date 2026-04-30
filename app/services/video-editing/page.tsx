import { FAQ } from "@/components/pages/service/video-editing/FAQ";
import { Hero } from "@/components/pages/service/video-editing/Hero";
import { Testimonials } from "@/components/pages/service/video-editing/Testimonials";

export default function VideoEditingPage() {
  return (
    <main className="bg-white">
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
