import { FAQ } from "@/components/pages/service/social-media-content/FAQ";
import { Hero } from "@/components/pages/service/social-media-content/Hero";
import { PlatformsSupported } from "@/components/pages/service/social-media-content/PlatformsSupported";

export default function SocialMediaContentPage() {
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
