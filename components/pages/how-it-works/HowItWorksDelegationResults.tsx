import { SocialProofTestimonialCarousel } from "@/components/pages/home/SocialProofTestimonialCarousel";
import type { SocialProofTestimonial } from "@/data/home";
import { howItWorksDelegation } from "@/data/howItWorks";

type Props = {
  testimonials: SocialProofTestimonial[];
};

export function HowItWorksDelegationResults({ testimonials }: Props) {
  const { titleBefore, titleHighlight1, titleMiddle, titleHighlight2 } = howItWorksDelegation;

  return (
    <div
      className="relative overflow-x-hidden bg-transparent pb-20 pt-16 md:pb-[15rem] md:pt-20 lg:pt-24"
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
      <div className="mt-10 w-full md:mt-12">
        <SocialProofTestimonialCarousel items={testimonials} />
      </div>
    </div>
  );
}
