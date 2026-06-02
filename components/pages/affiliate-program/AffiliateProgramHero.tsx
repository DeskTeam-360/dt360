import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";
import { SafeImage } from "@/components/shared/SafeImage";
import { affiliateProgramHero } from "@/data/affiliateProgram";

export function AffiliateProgramHero() {
  const {
    titleBefore,
    titleHighlight,
    description,
    ctaLabel,
    ctaHref,
    existingUserPrefix,
    existingUserLinkLabel,
    existingUserLinkHref,
    heroImageSrc,
    heroImageAlt,
  } = affiliateProgramHero;

  return (
    <section
      className="relative overflow-x-hidden bg-[#02063B] pb-[50px] pt-30 text-white sm:pt-32 lg:pt-[120px]"
      aria-labelledby="affiliate-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_0%,rgba(255,255,255,0.14)_0%,transparent_55%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="relative z-20 min-w-0 pb-6 lg:pb-10">
            <h1
              id="affiliate-hero-heading"
              className="type-rule-h1 max-w-[640px] text-balance text-white"
            >
              {titleBefore}{" "}
              <span className="text-[#E3058D]">{titleHighlight}</span>
            </h1>
            <p className="type-rule-h4 mt-6 max-w-[560px] text-pretty text-white/90">{description}</p>
            <div className="mt-8">
              <HeroCtaLink href={ctaHref} variant="primary" className="sm:min-w-[220px]">
                {ctaLabel}
              </HeroCtaLink>
            </div>
            <p className="type-rule-p mt-5 font-semibold text-white">
              {existingUserPrefix}{" "}
              <Link
                href={existingUserLinkHref}
                className="font-semibold text-white underline decoration-white/50 underline-offset-2 transition-colors hover:text-[#E3058D] hover:decoration-[#E3058D]"
              >
                {existingUserLinkLabel}
              </Link>
            </p>
          </div>

          <div className="relative z-20 min-w-0 overflow-hidden lg:mx-0 lg:ml-auto">
            <div className="mx-auto flex w-full justify-center lg:justify-end">
              <SafeImage
                src={heroImageSrc}
                alt={heroImageAlt}
                width={540}
                height={480}
                priority
                className="h-auto w-full max-w-none origin-center object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)] sm:w-[110%] lg:w-[120%] lg:origin-right"
                sizes="(max-width: 1024px) 100vw, 648px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
