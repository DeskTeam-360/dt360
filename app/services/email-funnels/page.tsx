import { FAQ } from "@/components/pages/service/email-funnels/FAQ";
import { Hero } from "@/components/pages/service/email-funnels/Hero";
import { PlatformsSupported } from "@/components/pages/service/email-funnels/PlatformsSupported";

export default function EmailFunnelsPage() {
  return (
    <main className="bg-white">
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <PlatformsSupported />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}
