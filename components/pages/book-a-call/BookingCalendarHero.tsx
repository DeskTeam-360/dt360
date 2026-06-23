import { Container } from "@/components/shared/Container";
import { MarketingSafeImage } from "@/components/shared/MarketingSafeImage";
import {
  BOOK_A_CALL_FORM_BG,
  bookACallHero,
  bookACallHeroLayout,
  bookACallHeroOverlapClasses,
  bookACallShellContainerClassName,
} from "@/data/bookACall";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type BookingCalendarHeroProps = {
  sectionId: string;
  headingId: string;
  archGradientId: string;
  title: string;
  children: ReactNode;
};

/**
 * Shared hero for GHL calendar pages — layout sized to Loom Book A Call reference.
 */
export function BookingCalendarHero({
  sectionId,
  headingId,
  archGradientId,
  title,
  children,
}: BookingCalendarHeroProps) {
  const {
    heroImageSrc,
    heroImageAlt,
    heroImageMaxWidth,
    heroImageMaxWidthSm,
    heroImageMaxWidthLg,
    heroImageIntrinsicSize,
  } = bookACallHero;
  const {
    contentPaddingClassName,
    gridClassName,
    titleClassName,
    titleColumnClassName,
    imageColumnClassName,
    imageWrapperClassName,
    imageClassName,
  } = bookACallHeroLayout;

  return (
    <section
      id={sectionId}
      className="relative overflow-x-hidden overflow-y-visible"
      aria-labelledby={headingId}
    >
      <div className="relative z-20 bg-[#11104C] pb-0 pt-30 text-white sm:pt-32 lg:pt-[120px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-[#0B0E2D]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1045] via-[#15124f] to-[#3b1a6e]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_0%_0%,rgba(0,200,244,0.42)_0%,transparent_52%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_85%_at_88%_42%,rgba(155,125,255,0.38)_0%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_72%_55%,rgba(227,5,141,0.22)_0%,transparent_55%)]" />
        </div>

        <Container className={cn("relative z-20", bookACallShellContainerClassName, contentPaddingClassName)}>
          <div className={gridClassName}>
            <div className={titleColumnClassName}>
              <h1 id={headingId} className={titleClassName}>
                {title}
              </h1>
            </div>
            <div
              className={cn(
                imageColumnClassName,
                bookACallHeroOverlapClasses.imageMargin,
                "md:translate-y-3 lg:translate-y-5",
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-4 bottom-0 top-[8%] rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(155,125,255,0.45)_0%,rgba(227,5,141,0.15)_45%,transparent_68%)] blur-2xl sm:inset-x-6 lg:inset-x-8"
                aria-hidden
              />
              <div className={imageWrapperClassName}>
                <MarketingSafeImage
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  width={heroImageIntrinsicSize}
                  height={heroImageIntrinsicSize}
                  priority
                  className={imageClassName}
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
              <linearGradient id={archGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
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
              stroke={`url(#${archGradientId})`}
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              className="book-a-call-arch-glow-stroke"
              d="M0,88 Q720,4 1440,88"
              fill="none"
              stroke={`url(#${archGradientId})`}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.95"
            />
          </svg>
          <div className="book-a-call-arch-seam-cover" aria-hidden />
        </div>
      </div>

      {children}
    </section>
  );
}
