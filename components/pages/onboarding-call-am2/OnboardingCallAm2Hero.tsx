import { OnboardingCallAm2CalendarSection } from "@/components/pages/onboarding-call-am2/OnboardingCallAm2CalendarSection";
import {
  serviceFaqIllustrationImageClassName,
  serviceFaqIllustrationWrapperClassName,
} from "@/components/pages/service/shared/ServiceFaqIllustration";
import { Container } from "@/components/shared/Container";
import { MarketingSafeImage } from "@/components/shared/MarketingSafeImage";
import { BOOK_A_CALL_FORM_BG, bookACallHeroOverlapClasses } from "@/data/bookACall";
import { onboardingCallAm2Hero } from "@/data/onboardingCallAm2";
import { cn } from "@/lib/utils";

export function OnboardingCallAm2Hero() {
  const { title, heroImageSrc, heroImageAlt, heroImageMaxWidth, heroImageMaxWidthSm, heroImageMaxWidthLg } =
    onboardingCallAm2Hero;

  return (
    <section
      id="onboarding-call-am2-section"
      className="relative overflow-x-hidden overflow-y-visible"
      aria-labelledby="onboarding-call-am2-hero-heading"
    >
      <div className="relative z-20 bg-[#11104C] pb-0 pt-30 text-white sm:pt-32 lg:pt-[120px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="book-a-call-hero-cyan-glow absolute bottom-0 left-[-20%] h-[min(520px,70vw)] w-[min(520px,70vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.35)_0%,transparent_40%)] blur-3xl sm:left-[-15%] sm:h-[min(700px,75vw)] sm:w-[min(700px,75vw)] lg:h-[min(900px,80vw)] lg:w-[min(900px,80vw)]" />
        </div>

        <Container className="relative z-20 max-w-[1440px] px-6 lg:px-20">
          <div className="grid min-w-0 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-16">
            <div className="relative z-20 min-w-0 max-md:text-center md:pb-4 lg:pb-6">
              <h1
                id="onboarding-call-am2-hero-heading"
                className="font-[var(--font-poppins)] text-[56px] font-bold leading-[1.1] text-balance text-white md:text-left lg:text-[76px]"
              >
                {title}
              </h1>
            </div>
            <div
              className={cn(
                "relative isolate z-40 flex flex-col items-center justify-center md:mx-0 md:ml-auto",
                bookACallHeroOverlapClasses.imageMargin,
              )}
            >
              <div
                className="pointer-events-none absolute inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3)_0%,transparent_60%)] blur-2xl sm:inset-6 lg:inset-8"
                aria-hidden
              />
              <div
                className={cn(
                  serviceFaqIllustrationWrapperClassName,
                  "relative z-40 md:max-w-[300px] lg:max-w-[360px] xl:max-w-[430px]",
                )}
              >
                <MarketingSafeImage
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  width={heroImageMaxWidth}
                  height={520}
                  priority
                  className={cn(
                    serviceFaqIllustrationImageClassName,
                    "drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]",
                  )}
                  sizes={`(max-width: 640px) ${heroImageMaxWidthSm}px, (max-width: 1024px) ${heroImageMaxWidthLg}px, ${heroImageMaxWidth}px`}
                />
              </div>
            </div>
          </div>
        </Container>

        <div className="relative z-10 -mt-1 w-full sm:-mt-2 lg:-mt-4" aria-hidden>
          <svg
            className="relative z-0 block h-14 w-full sm:h-20 lg:h-28 xl:h-32"
            viewBox="0 0 1440 124"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="onboarding-call-am2-arch-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C8F4" />
                <stop offset="45%" stopColor="#9B7DFF" />
                <stop offset="100%" stopColor="#E3058D" />
              </linearGradient>
            </defs>
            <path fill={BOOK_A_CALL_FORM_BG} d="M0,88 Q720,4 1440,88 L1440,124 L0,124 Z" />
            <path
              className="book-a-call-arch-glow-stroke"
              d="M0,88 Q720,4 1440,88"
              fill="none"
              stroke="url(#onboarding-call-am2-arch-glow)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              className="book-a-call-arch-glow-stroke"
              d="M0,88 Q720,4 1440,88"
              fill="none"
              stroke="url(#onboarding-call-am2-arch-glow)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>
          <div className="book-a-call-arch-seam-cover" aria-hidden />
        </div>
      </div>

      <OnboardingCallAm2CalendarSection />
    </section>
  );
}
