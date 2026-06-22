import { DemoVideoPlaceholder } from "@/components/pages/demo-call-scheduled-thank-you/DemoVideoPlaceholder";
import { Container } from "@/components/shared/Container";
import { BOOK_A_CALL_FORM_BG } from "@/data/bookACall";
import { demoCallScheduledThankYouPage } from "@/data/demoCallScheduledThankYou";

/**
 * Thank-you hero — same navy + arch treatment as Book a Call.
 */
export function DemoCallScheduledHero() {
  const { hero } = demoCallScheduledThankYouPage;

  return (
    <section
      className="relative overflow-x-hidden overflow-y-visible"
      aria-labelledby="demo-thank-you-hero-heading"
    >
      <div className="relative z-20 bg-[#11104C] pb-0 pt-30 text-white sm:pt-32 lg:pt-[120px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="book-a-call-hero-cyan-glow absolute bottom-0 left-[-20%] h-[min(520px,70vw)] w-[min(520px,70vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.35)_0%,transparent_40%)] blur-3xl sm:left-[-15%] sm:h-[min(700px,75vw)] sm:w-[min(700px,75vw)] lg:h-[min(900px,80vw)] lg:w-[min(900px,80vw)]" />
        </div>

        <Container className="relative z-20 max-w-[900px] px-6 text-center lg:px-20">
          <h1
            id="demo-thank-you-hero-heading"
            className="font-[var(--font-poppins)] text-[36px] font-bold leading-[1.15] text-balance text-white sm:text-[44px] lg:text-[52px]"
          >
            {hero.title}
          </h1>
          <p className="type-rule-p mt-5 text-white/90 sm:mt-6">{hero.subtitle}</p>
        </Container>

        <div className="relative z-10 -mt-1 w-full sm:-mt-2 lg:-mt-4" aria-hidden>
          <svg
            className="relative z-0 block h-14 w-full sm:h-20 lg:h-28 xl:h-32"
            viewBox="0 0 1440 124"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="demo-thank-you-arch-glow" x1="0%" y1="0%" x2="100%" y2="0%">
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
              stroke="url(#demo-thank-you-arch-glow)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              className="book-a-call-arch-glow-stroke"
              d="M0,88 Q720,4 1440,88"
              fill="none"
              stroke="url(#demo-thank-you-arch-glow)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>
          <div className="book-a-call-arch-seam-cover" aria-hidden />
        </div>
      </div>

      <div className="relative z-10 bg-[#F5F8FF] pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20">
        <Container className="max-w-[900px]">
          <DemoVideoPlaceholder
            variant="framed"
            label={hero.videoLabel}
            ariaLabel={hero.videoAriaLabel}
          />
        </Container>
      </div>
    </section>
  );
}
