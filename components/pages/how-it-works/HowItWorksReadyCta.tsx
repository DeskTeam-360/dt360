import { Container } from "@/components/shared/Container";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksReadyCta } from "@/data/howItWorks";

export function HowItWorksReadyCta() {
  const { title, body, primaryCta, secondaryCta, noteBelowButtons, imageSrc, imageAlt } = howItWorksReadyCta;

  return (
    <section
      className="relative z-20 -mt-16 overflow-visible bg-gradient-to-r from-[#6b21a8] via-[#7c3a9e] to-[#ec4899] pb-0 pt-0 sm:-mt-[4.25rem] lg:-mt-24"
      aria-labelledby="how-it-works-ready-heading"
    >
      <Container className="relative max-w-[1440px] lg:px-10">
        <div className="flex w-full flex-col lg:min-h-[min(440px,48vh)] lg:flex-row lg:items-stretch">
          <div className="flex w-full flex-col justify-center px-1 py-5 sm:py-6 lg:w-[60%] lg:max-w-[60%] lg:flex-none lg:py-8 lg:pr-8 xl:py-10">
            <h2 id="how-it-works-ready-heading" className="type-rule-h2 tracking-tight text-white">
              {title}
            </h2>
            <p className="type-rule-p mt-5 max-w-xl text-white/95">{body}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <HeroCtaLink
                href={primaryCta.href}
                variant="secondary"
                showChevron={false}
                className="focus-visible:ring-offset-[#3b1f6b]"
              >
                {primaryCta.label}
              </HeroCtaLink>
              <HeroCtaLink href={secondaryCta.href} variant="primary" className="focus-visible:ring-offset-[#3b1f6b]">
                {secondaryCta.label}
              </HeroCtaLink>
            </div>
            <p className="mt-2 max-w-xl text-sm font-medium italic leading-relaxed text-white/90 sm:mt-2.5 sm:text-base">
              {noteBelowButtons}
            </p>
          </div>

          <div className="relative mt-4 min-h-[320px] w-full shrink-0 sm:mt-5 sm:min-h-[360px] lg:mt-0 lg:min-h-[500px] lg:w-[40%] lg:max-w-[40%]">
            <div className="absolute inset-x-[-6%] bottom-0 top-[-9rem] flex items-end justify-center sm:inset-x-[-4%] sm:top-[-11rem] lg:inset-x-0 lg:top-[-19rem] xl:top-[-22rem]">
              <SafeImage
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={980}
                className="h-auto w-full max-w-full max-h-[560px] object-contain object-bottom sm:max-h-[620px] lg:max-h-[min(92vh,840px)]"
                sizes="(max-width:1024px) 100vw, 40vw"
                priority={false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
