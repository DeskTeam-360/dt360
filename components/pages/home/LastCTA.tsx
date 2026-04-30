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
    <section id="last-cta" className="relative bg-white pb-0">
      <Container className="relative max-w-7xl">
        <div className="relative isolate">
          {/* Hanya blok teks yang menentukan tinggi section (lg+). */}
          <div className="relative z-10 max-w-3xl pt-4 pb-10 lg:max-w-[54%] lg:pr-8 lg:pt-6 xl:max-w-[56%]">
            <h2 className="max-w-3xl text-balance text-4xl font-bold leading-[1.06] tracking-tight text-[#11104C] sm:text-5xl lg:text-[3.3rem]">
              <span>{headingBefore}</span>
              <span className="text-[#E3058D]">{headingHighlight}</span>
              <span>{headingAfter}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[#11104C] sm:text-lg">
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
            <p className="mt-3 text-sm font-medium italic text-[#11104C] sm:text-base">{note}</p>
          </div>

          <div className="relative z-[1] mx-auto mt-10 flex w-full max-w-[33rem] justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:flex lg:w-[48%] lg:max-w-[36rem] lg:items-end lg:justify-center xl:w-[46%]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={768}
              height={810}
              className="relative z-[1] h-auto w-full object-contain object-bottom"
              sizes="(max-width: 1024px) 85vw, 560px"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
