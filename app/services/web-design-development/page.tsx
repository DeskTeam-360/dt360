import { Hero } from "@/components/pages/service/website-development/Hero";
import { WebDesignDevelopmentTestimonialAndHowSection } from "@/components/pages/service/website-development/WebDesignDevelopmentTestimonialAndHowSection";
import { ServicesFaqSection } from "@/components/pages/services/ServicesFaqSection";
import { ServicesPlatformsSupportedBridge } from "@/components/pages/services/ServicesPlatformsSupportedBridge";
import { ServicesPricingSection } from "@/components/pages/services/ServicesPricingSection";

export default function WebDesignDevelopmentPage() {
  return (
    <main className="relative bg-white">
      <div className="relative z-10">
        <Hero />
      </div>
      <ServicesPlatformsSupportedBridge />
      <div className="relative">
        <WebDesignDevelopmentTestimonialAndHowSection />
        <div className="relative z-0">
          <ServicesPricingSection variant="webDesignDevelopment" />
        </div>
      </div>

      <div className="-mt-px">
        <ServicesFaqSection variant="webDesignDevelopment" />
      </div>
    </main>
  );
}
