import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";
import { showcaseCtaContent } from "@/data/showcase";

export function ShowcaseCTA() {
  const {
    headingHighlight,
    headingLine2,
    description,
    primaryCta,
    secondaryCta,
    note,
    imageSrc,
    imageAlt,
  } = showcaseCtaContent;

  return (
    <section
      id="showcase-cta"
      className="relative overflow-x-clip overflow-y-visible bg-[#E8E3F3] pt-16 pb-0 sm:pt-20 lg:pt-0 lg:pb-0"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/2 -z-[1] h-[600px] w-[600px] -translate-y-1/2 translate-x-[20%] opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(180,160,240,0.6) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[10%] bottom-[10%] -z-[1] h-[300px] w-[300px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(160,200,255,0.8) 0%, transparent 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-[1] max-w-7xl">
        <div className="relative isolate">
          <div className="relative z-10 max-w-3xl pt-4 pb-6 lg:max-w-[54%] lg:py-16 lg:pr-8 xl:py-20">
            <div className="max-w-3xl text-balance">
              <span className="block font-[var(--font-poppins)] text-[40px] font-bold leading-tight text-[#2C3C91] sm:text-[50px] lg:text-[60px]">
                {headingHighlight}
              </span>
              <h2 className="mt-1 text-[28px] font-bold leading-tight text-black sm:text-[32px] lg:text-[36px]">
                {headingLine2}
              </h2>
            </div>
            <p className="type-rule-p mt-5 max-w-2xl text-pretty text-[#11104C]/80">{description}</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <HeroCtaLink
                href={primaryCta.href}
                variant="secondary"
                showChevron={false}
                className="[&_span]:bg-[#F0573A] [&_span]:shadow-[0_4px_24px_-4px_rgba(240,87,58,0.55)] hover:[&_span]:bg-[#ff6b4a]"
              >
                {primaryCta.label}
              </HeroCtaLink>
              <HeroCtaLink
                href={secondaryCta.href}
                variant="primary"
                className="[&_span]:bg-[#E6236D] [&_span]:shadow-[0_4px_24px_-4px_rgba(230,35,109,0.55)] hover:[&_span]:bg-[#f0308a]"
              >
                {secondaryCta.label}
              </HeroCtaLink>
            </div>
            <p className="mt-3 text-[16px] italic text-[#11104C]/70">{note}</p>
          </div>

          {/* Desktop: bottom-anchored, scales upward — matches design reference */}
          <div className="relative z-[2] mx-auto mt-6 flex w-full max-w-[18.4rem] justify-center sm:max-w-[23rem] lg:absolute lg:right-0 lg:bottom-0 lg:top-[-15rem] lg:mx-0 lg:mt-0 lg:flex lg:w-auto lg:max-w-[min(33rem,44vw)] lg:translate-x-[20%] lg:flex-col lg:items-end lg:justify-end">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={768}
              height={810}
              className="relative z-[2] block h-auto w-full max-w-full origin-bottom object-contain object-bottom transform-gpu lg:h-auto lg:w-auto lg:max-h-[calc(100%+15rem)] lg:scale-150"
              sizes="(max-width: 1023px) 90vw, (max-width: 1366px) 42vw, 768px"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
