import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { socialProofSection } from "@/data/home";
import { SocialProofMarquee } from "./HomeMarquee";
import { SocialProofTestimonialCarousel } from "./SocialProofTestimonialCarousel";

export function SocialProofTestimonials() {
  const { headlineLine1, headlineLine2, headlineHighlight, imageSrc, imageAlt, testimonials } =
    socialProofSection;

  return (
    <section
      id="social-proof"
      className="overflow-x-clip bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="social-proof-heading"
    >
      <Container className="max-w-7xl pr-0">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.24fr)] lg:gap-10">
          <h2
            id="social-proof-heading"
            className="max-w-[28rem] text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#101651] sm:text-5xl lg:text-[4rem]"
          >
            <span className="block">{headlineLine1}</span>
            <span className="mt-3 block text-[#E3058D]">
              {headlineLine2}
              <br />
              {headlineHighlight}
            </span>
          </h2>

          <div className="overflow-hidden rounded-none rounded-tl-[2rem] bg-white">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1400}
              height={930}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 760px"
            />
          </div>
        </div>
      </Container>

      <div className="w-full">
        <SocialProofTestimonialCarousel items={testimonials} />
      </div>

      <SocialProofMarquee />
    </section>
  );
}
