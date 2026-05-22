import { Container } from "@/components/shared/Container";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";
import { SafeImage } from "@/components/shared/SafeImage";
import { caseStudiesHero } from "@/data/caseStudies";

export function CaseStudiesHero() {
  const {
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    waveLineSrc,
    waveLineAlt,
    waveLine4kSrc,
    waveLine4kAlt,
    backgroundSrc,
    backgroundAlt,
    manLeftSrc,
    manLeftAlt,
    womanRightSrc,
    womanRightAlt,
    letItGrow,
  } = caseStudiesHero;

  return (
    <section
      id="case-studies-hero"
      className="relative z-20 overflow-x-hidden overflow-y-hidden bg-[#0c0820] text-white"
      aria-labelledby="case-studies-hero-heading"
    >
      {/* Background — cover, top center (no baked-in bottom curve) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <SafeImage
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          unoptimized
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 w-full pb-[40px] pt-24 sm:pb-[60px] sm:pt-28 lg:pb-[80px] lg:pt-32 xl:pt-36 2xl:pt-40">
        <Container className="max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-full text-center">
            <h1
              id="case-studies-hero-heading"
              className="font-heading text-[56px] font-bold leading-[1.1] tracking-tight text-balance text-white sm:text-[64px] lg:text-[76px]"
            >
              {title}
            </h1>
            <p className="mx-auto mt-4 w-full max-w-3xl px-1 font-heading text-[24px] font-normal leading-[1.2] text-balance text-white/95 sm:mt-5 sm:px-0 sm:text-[30px] lg:mt-6 lg:text-[36px]">
              {subtitle}
            </p>
            <div className="mt-8 flex justify-center pb-[100px] sm:mt-10 sm:pb-10 lg:mt-12">
              <HeroCtaLink
                href={ctaHref}
                variant="primary"
                className="w-fit max-w-max [&>span]:w-auto sm:min-w-[280px] sm:w-auto"
              >
                {ctaLabel}
              </HeroCtaLink>
            </div>
          </div>
        </Container>

        {/* Wave + characters — full wave visible (contain), characters overlaid */}
        <div className="relative mt-6 mb-[100px] w-full overflow-visible sm:mb-0 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14">
          <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-visible">
            <div className="relative w-full overflow-visible">
              <div className="relative w-full overflow-visible pb-[clamp(2.5rem,6vw,5rem)]">
                {/* ≤1440px: full viewport width */}
                <SafeImage
                  src={waveLineSrc}
                  alt={waveLineAlt}
                  width={1920}
                  height={340}
                  unoptimized
                  priority
                  className="relative z-[1] block h-auto w-full max-[1439px]:block min-[1440px]:hidden object-contain object-center"
                  sizes="100vw"
                />

                {/* ≥1440px: 4K ribbon — height contained, width may exceed screen */}
                <div className="relative z-[1] hidden min-[1440px]:flex min-[1440px]:w-screen min-[1440px]:justify-center min-[1440px]:overflow-visible">
                  <SafeImage
                    src={waveLine4kSrc}
                    alt={waveLine4kAlt}
                    width={3840}
                    height={800}
                    unoptimized
                    priority
                    className="h-[clamp(280px,22vw,520px)] w-auto max-w-none object-contain object-center"
                    sizes="100vw"
                  />
                </div>

                <div className="absolute inset-y-0 left-1/2 z-[2] flex w-full max-w-[1560px] -translate-x-1/2 items-end justify-between overflow-visible px-4 sm:px-6">
                  <SafeImage
                    src={manLeftSrc}
                    alt={manLeftAlt}
                    width={640}
                    height={569}
                    unoptimized
                    priority
                    className="ml-[calc(var(--spacing)*-15)] mb-[4em] h-auto w-[clamp(12rem,52vw,40em)] max-w-[40em] shrink-0 object-contain object-bottom -translate-x-[2%] sm:-ml-35 sm:mb-[5em] sm:translate-x-0"
                    sizes="(max-width: 1024px) 52vw, 40em"
                  />
                  <SafeImage
                    src={womanRightSrc}
                    alt={womanRightAlt}
                    width={400}
                    height={312}
                    unoptimized
                    priority
                    className="h-auto w-[clamp(10rem,46vw,25em)] max-w-[25em] shrink-0 object-contain object-bottom translate-x-[2%] sm:translate-x-0 mb-[4%] sm:mb-[6%] md:mb-[8%] md:w-[16em] md:max-w-[16em] lg:mb-[10%] lg:w-[clamp(10rem,46vw,25em)] lg:max-w-[25em]"
                    sizes="(max-width: 1024px) 46vw, 25em"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Let it Grow — glass box below wave + characters */}
        <Container className="relative z-20 max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="mx-auto w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
            <div className="relative overflow-visible">
              <SafeImage
                src={letItGrow.squareGraphicSrc}
                alt={letItGrow.squareGraphicAlt}
                width={160}
                height={160}
                unoptimized
                aria-hidden
                className="pointer-events-none absolute -top-10 -right-0 z-0 h-auto w-[clamp(4.5rem,12vw,10rem)] max-w-[10rem] translate-x-[15%] md:top-[calc(var(--spacing)*-12)] md:right-[calc(var(--spacing)*1)] md:w-[7rem] md:max-w-[7rem] md:translate-x-0 lg:-top-24 lg:-right-9 lg:w-[10rem] lg:max-w-[10rem]"
              />
              <SafeImage
                src={letItGrow.codeGraphicSrc}
                alt={letItGrow.codeGraphicAlt}
                width={140}
                height={140}
                unoptimized
                aria-hidden
                className="pointer-events-none absolute -bottom-6 left-0 z-0 h-auto w-[clamp(4rem,11vw,8.5rem)] max-w-[8.5rem] -translate-x-[15%] sm:-bottom-8 sm:left-2 lg:bottom-[calc(var(--spacing)*-11)] lg:left-[calc(var(--spacing)*-10)] lg:w-[8rem] lg:max-w-[8rem] lg:translate-x-0"
              />

              <div className="relative z-10 rounded-[100px] border border-white/25 bg-white/10 px-6 py-8 text-center shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-md sm:rounded-[100px] sm:px-10 sm:py-10 lg:px-14 lg:py-12">
                <h2 className="font-[var(--font-montserrat)] font-bold text-[48px] text-white">
                  {letItGrow.title}
                </h2>
                <p className="mx-auto mt-4 max-w-3xl font-sans text-[18px] font-semibold leading-[1.9] text-pretty text-white/90 sm:mt-5 lg:mt-6">
                  {letItGrow.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom curve — convex downward transition to white section below */}
      <div className="relative z-20 -mb-px w-full text-[#f8fafe]" aria-hidden>
        <svg
          className="block h-12 w-full sm:h-14 md:h-16 lg:h-20 xl:h-24 2xl:h-28"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M0,78 Q720,8 1440,78 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}
