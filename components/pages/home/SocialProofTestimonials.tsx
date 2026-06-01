import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { socialProofSection, type SocialProofTestimonial } from "@/data/home";
import { avoidOrphansInPhrase } from "@/lib/utils";
import { SocialProofMarquee } from "./HomeMarquee";
import { SocialProofTestimonialCarousel } from "./SocialProofTestimonialCarousel";

type Props = {
  testimonials: SocialProofTestimonial[];
};

export function SocialProofTestimonials({ testimonials }: Props) {
  const { headlineLine, headlineAccentLine, imageSrc, imageAlt } = socialProofSection;

  return (
    <section
      id="social-proof"
      className="overflow-x-clip bg-white pb-7 pt-0 sm:pb-16 sm:pt-0 lg:pb-20 lg:pt-0 mt-[-1px]"
      aria-labelledby="social-proof-heading"
    >
      <Container className="max-w-7xl pr-0 pt-[22px]">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
          <h2 id="social-proof-heading" className="max-w-full text-balance text-[#101651] lg:max-w-[28rem]">
            <span className="block">{avoidOrphansInPhrase(headlineLine)}</span>
            <span className="mt-3 block text-balance text-[#E3058D]">
              {avoidOrphansInPhrase(headlineAccentLine)}
            </span>
          </h2>

          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1400}
            height={930}
            className="h-[320px] w-full rounded-tl-[2rem] bg-white object-contain sm:h-[420px] lg:h-[596px]"
            sizes="(max-width: 1024px) 100vw, 760px"
          />
        </div>
      </Container>

      <div className="w-full">
        <SocialProofTestimonialCarousel items={testimonials} />
      </div>

      <SocialProofMarquee />
    </section>
  );
}
