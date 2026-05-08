import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";
import { lastCtaContent } from "@/data/home";

export function LastCTA() {
  const {
    headingBefore,
    headingHighlight,
    headingAfter,
    subheading,
    primaryCta,
    secondaryCta,
    note,
    imageSrc,
    imageAlt,
  } = lastCtaContent;

  return (
    <section id="last-cta" className="relative isolate overflow-visible bg-white pt-20 pb-0">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute right-0 top-0 h-[1411px] w-[1411px] translate-x-[38%] -translate-y-[75%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,244,0.4) 0%, rgba(1,211,252,0) 100%)",
          }}
        />
      </div>
      <Container className="relative z-[1] max-w-7xl">
        <div className="relative isolate">
          {/* Hanya blok teks yang menentukan tinggi section (lg+). */}
          <div className="relative z-10 max-w-3xl pt-4 pb-10 lg:max-w-[54%] lg:pr-8 lg:pt-6 xl:max-w-[56%]">
            <h2 className="max-w-3xl text-balance text-[#11104C]">
              <span>{headingBefore}</span>
              <span className="text-[#E3058D]">{headingHighlight}</span>
              <span>{headingAfter}</span>
            </h2>
            <p className="type-rule-p mt-5 max-w-2xl text-pretty text-[#11104C]">
              {subheading}
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <HeroCtaLink href={primaryCta.href} variant={primaryCta.variant}>
                {primaryCta.label}
              </HeroCtaLink>
              <HeroCtaLink href={secondaryCta.href} variant={secondaryCta.variant}>
                {secondaryCta.label}
              </HeroCtaLink>
            </div>
            <p className="type-rule-p mt-3 italic text-[#11104C]">{note}</p>
          </div>

          <div className="relative z-[2] mx-auto mt-10 flex w-full max-w-[33rem] justify-center lg:absolute lg:-top-60 lg:bottom-0 lg:right-0 lg:mx-0 lg:mt-0 lg:w-auto lg:max-w-none lg:items-end lg:justify-end">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={768}
              height={810}
              className="relative z-[2] h-auto w-auto max-w-full object-contain object-bottom lg:h-full"
              sizes="(max-width: 1024px) 85vw, 768px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
