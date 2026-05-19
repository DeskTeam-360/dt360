import { ServicesTestimonialsCarousel } from "@/components/pages/services/ServicesTestimonialsCarousel";
import { howItWorksDelegation, howItWorksTestimonials } from "@/data/howItWorks";

export function HowItWorksDelegationResults() {
  const { titleBefore, titleHighlight1, titleMiddle, titleHighlight2 } = howItWorksDelegation;

  return (
    <div
      className="relative overflow-x-hidden bg-transparent pb-[15rem] pt-16 md:pt-20 lg:pt-24"
      aria-labelledby="how-it-works-delegation-heading"
    >
      <div className="relative mx-auto w-full max-w-full px-5 text-center md:max-w-[80%] md:px-10 lg:max-w-[55%] lg:px-10">
        <h2
          id="how-it-works-delegation-heading"
          className="type-rule-h2 tracking-tight text-[#101651]"
        >
          {titleBefore}
          <span className="text-[#8b5cf6]">{titleHighlight1}</span>
          {titleMiddle}
          <span className="text-[#ef2fa9]">{titleHighlight2}</span>
        </h2>
      </div>
      <ServicesTestimonialsCarousel items={howItWorksTestimonials} />
    </div>
  );
}
