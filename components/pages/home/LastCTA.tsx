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
    <section
      id="last-cta"
      className="relative -mb-12 flex flex-col overflow-visible bg-white pb-0 lg:-mb-20"
    >
      <Container className="relative z-[1] order-1 max-w-7xl py-12 sm:py-14 lg:py-16 xl:py-20">
        <div className="max-w-3xl lg:max-w-[54%] lg:pr-8 xl:max-w-[56%]">
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
          <p className="mt-3 text-sm font-medium italic text-[#11104C] sm:text-base">
            {note}
          </p>
        </div>
      </Container>

      {/* Satu gambar: mobile di bawah teks; lg menempel dasar section + geser ke bawah (overlap area atas footer) */}
      <div className="order-2 mx-auto mt-10 w-full max-w-[33rem] px-4 sm:px-6 lg:absolute lg:inset-x-auto lg:bottom-0 lg:right-[max(1rem,calc((100vw-min(100vw,80rem))/2+1.5rem))] lg:order-none lg:z-[2] lg:mx-0 lg:mt-0 lg:w-[min(36rem,48vw)] lg:max-w-[min(36rem,42vw)] lg:translate-y-[min(22%,10rem)] lg:px-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={768}
          height={810}
          className="relative z-[2] h-auto w-full object-contain object-bottom"
          sizes="(max-width: 1024px) 85vw, 560px"
          priority={false}
        />
      </div>
    </section>
  );
}
