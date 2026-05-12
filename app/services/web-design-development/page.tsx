import { Hero } from "@/components/pages/service/website-development/Hero";
import { WebDesignDevelopmentTestimonialAndHowSection } from "@/components/pages/service/website-development/WebDesignDevelopmentTestimonialAndHowSection";
import { ServicesFaqSection } from "@/components/pages/services/ServicesFaqSection";
import { ServicesPlatformsSupportedBridge } from "@/components/pages/services/ServicesPlatformsSupportedBridge";
import { ServicesPricingSection } from "@/components/pages/services/ServicesPricingSection";

export default function WebDesignDevelopmentPage() {
  return (
    <main className="relative bg-white">
      <div className="relative z-10 mx-0 px-0">
        <Hero />
      </div>
      <div className="mx-0 px-0">
        <ServicesPlatformsSupportedBridge />
      </div>
      <div className="relative mx-0 px-0">
        <WebDesignDevelopmentTestimonialAndHowSection />
        <div className="relative z-0 mx-0 px-0">
          <ServicesPricingSection variant="webDesignDevelopment" />
        </div>
      </div>

      <div className="-mt-px mx-0 px-0">
        <ServicesFaqSection variant="webDesignDevelopment" />
      </div>
    </main>
  );
}
