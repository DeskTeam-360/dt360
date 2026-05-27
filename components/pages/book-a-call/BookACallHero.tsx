import { BookACallForm } from "@/components/pages/book-a-call/BookACallForm";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { BOOK_A_CALL_FORM_BG, bookACallHero } from "@/data/bookACall";

/**
 * Book a Call — hero, arch transition, and step-1 form in one section.
 */
export function BookACallHero() {
  const {
    title,
    heroImageSrc,
    heroImageAlt,
    heroImageMaxWidth,
    heroImageMaxWidthSm,
    heroImageMaxWidthLg,
    heroImageOverlapMarginBottom,
  } = bookACallHero;

  return (
    <section
      id="book-a-call-section"
      className="relative overflow-x-hidden overflow-y-visible"
      aria-labelledby="book-a-call-hero-heading"
    >
      <div className="relative z-20 bg-[#11104C] pb-0 pt-28 text-white sm:pt-32 lg:pt-[120px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="book-a-call-hero-cyan-glow absolute bottom-[0%] left-[-15%] h-[min(900px,80vw)] w-[min(900px,80vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.35)_0%,transparent_40%)] blur-3xl" />
        </div>

        <Container className="relative z-20 max-w-[1440px] px-6 lg:px-20">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-16">
            <div className="relative z-20 md:pb-4 lg:pb-6">
              <h1
                id="book-a-call-hero-heading"
                className="font-[var(--font-poppins)] text-[56px] font-bold leading-[1.1] text-balance text-white lg:text-[76px]"
              >
                {title}
              </h1>
            </div>
            <div
              className="relative isolate z-40 mx-auto flex w-full max-w-[260px] flex-col items-center justify-center sm:max-w-[280px] md:mx-0 md:ml-auto md:max-w-[300px] lg:max-w-[360px] xl:max-w-[430px]"
              style={{ marginBottom: heroImageOverlapMarginBottom }}
            >
              <div
                className="pointer-events-none absolute inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.3)_0%,transparent_60%)] blur-2xl sm:inset-6 lg:inset-8"
                aria-hidden
              />
              <SafeImage
                src={heroImageSrc}
                alt={heroImageAlt}
                width={heroImageMaxWidth}
                height={520}
                priority
                className="relative z-40 mx-auto h-auto w-full max-w-[260px] object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[360px] xl:max-w-[430px]"
                sizes={`(max-width: 640px) ${heroImageMaxWidthSm}px, (max-width: 1024px) ${heroImageMaxWidthLg}px, ${heroImageMaxWidth}px`}
              />
            </div>
          </div>
        </Container>

        <div className="relative z-10 -mt-2 w-full sm:-mt-4 lg:-mt-6" aria-hidden>
          <svg
            className="relative z-0 block h-16 w-full sm:h-20 lg:h-28 xl:h-32"
            viewBox="0 0 1440 124"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="book-a-call-arch-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C8F4" />
                <stop offset="45%" stopColor="#9B7DFF" />
                <stop offset="100%" stopColor="#E3058D" />
              </linearGradient>
            </defs>
            {/* Extra depth in viewBox removes subpixel gap when stretched on ultra-wide screens */}
            <path fill={BOOK_A_CALL_FORM_BG} d="M0,88 Q720,4 1440,88 L1440,124 L0,124 Z" />
            {/* Soft outer stroke + crisp inner stroke (no SVG blur filter — avoids dark band at 2560px) */}
            <path
              className="book-a-call-arch-glow-stroke"
              d="M0,88 Q720,4 1440,88"
              fill="none"
              stroke="url(#book-a-call-arch-glow)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              className="book-a-call-arch-glow-stroke"
              d="M0,88 Q720,4 1440,88"
              fill="none"
              stroke="url(#book-a-call-arch-glow)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>
          <div className="book-a-call-arch-seam-cover" aria-hidden />
        </div>
      </div>

      <BookACallForm />
    </section>
  );
}
