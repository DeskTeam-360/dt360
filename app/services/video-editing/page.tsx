import { FAQ } from "@/components/pages/service/video-editing/FAQ";
import { Hero } from "@/components/pages/service/video-editing/Hero";
import { Testimonials } from "@/components/pages/service/video-editing/Testimonials";

export default function VideoEditingPage() {
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
