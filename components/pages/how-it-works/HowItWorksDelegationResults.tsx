import { ServicesTestimonialsCarousel } from "@/components/pages/services/ServicesTestimonialsCarousel";
import { servicesTestimonials } from "@/data/servicesPage";
import { howItWorksDelegation } from "@/data/howItWorks";

export function HowItWorksDelegationResults() {
  const { titleBefore, titleHighlight1, titleMiddle, titleHighlight2 } = howItWorksDelegation;

  return (
    <section
      className="relative z-10 overflow-x-hidden bg-white pb-[15rem] pt-16 md:pt-20 lg:pt-24"
      aria-labelledby="how-it-works-delegation-heading"
    >
      <div
        className="pointer-events-none absolute left-[-240px] top-[-180px] aspect-square h-[85%] rounded-full bg-[radial-gradient(circle,rgba(170,239,255,0.85)_0%,rgba(170,239,255,0.35)_45%,rgba(170,239,255,0)_75%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1440px] px-5 text-center md:px-10 lg:px-10">
        <h2
          id="how-it-works-delegation-heading"
          className="type-rule-h2 tracking-tight text-[#101651]"
        >
          {titleBefore}
          <span className="text-[#8b5cf6]">{titleHighlight1}</span>
          {titleMiddle}
          <span className="text-[#E3058D]">{titleHighlight2}</span>
        </h2>
      </div>
      <ServicesTestimonialsCarousel items={servicesTestimonials} />
    </section>
  );
}
