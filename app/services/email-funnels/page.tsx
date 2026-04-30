import { FAQ } from "@/components/pages/service/email-funnels/FAQ";
import { Hero } from "@/components/pages/service/email-funnels/Hero";
import { PlatformsSupported } from "@/components/pages/service/email-funnels/PlatformsSupported";

export default function EmailFunnelsPage() {
  return (
    <main className="bg-white">
      <Hero />
      <div className="-mt-px">
        <PlatformsSupported />
      </div>
      <div className="-mt-px">
        <FAQ />
      </div>
    </main>
  );
}
