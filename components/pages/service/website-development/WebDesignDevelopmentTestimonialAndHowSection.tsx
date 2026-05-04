import { ServicesHowItWorks } from "@/components/pages/services/ServicesHowItWorks";
import { Testimonials } from "@/components/pages/service/website-development/Testimonials";

/**
 * Testimonial + How It Works block for `/services/web-design-development` only.
 * Kept separate from `app/services/page.tsx` so layout and future copy can change without affecting the main Services page.
 */
export function WebDesignDevelopmentTestimonialAndHowSection() {
  return (
    <section className="relative z-[5]" aria-label="Client story and how web development works">
      <div className="relative z-20 -mt-[120px]">
        <Testimonials />
      </div>
      <div className="relative z-10 -mt-[100px] lg:-mt-[120px]">
        <ServicesHowItWorks overlappedByTestimonialSection />
      </div>
    </section>
  );
}
