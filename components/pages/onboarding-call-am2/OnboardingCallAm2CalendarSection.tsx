import { GhlBookingEmbed } from "@/components/shared/GhlBookingEmbed";
import {
  serviceFaqIllustrationImageClassName,
  serviceFaqIllustrationWrapperClassName,
} from "@/components/pages/service/shared/ServiceFaqIllustration";
import { Container } from "@/components/shared/Container";
import { MarketingSafeImage } from "@/components/shared/MarketingSafeImage";
import { BOOK_A_CALL_FORM_BG, bookACallHeroOverlapClasses } from "@/data/bookACall";
import { onboardingCallAm2Booking, onboardingCallAm2Calendar } from "@/data/onboardingCallAm2";
import { cn } from "@/lib/utils";

const { formBubbleSrc, formBubbleAlt, womanImageSrc, womanImageAlt } = onboardingCallAm2Calendar;

/** GHL booking widget for onboarding-call-am2 — same layout as Book a Call calendar section. */
export function OnboardingCallAm2CalendarSection() {
  return (
    <div
      className={`relative z-10 w-full overflow-x-hidden ${bookACallHeroOverlapClasses.formPull}`}
      aria-label="Schedule your onboarding call"
    >
      <div
        className="pointer-events-none absolute left-[-10%] top-[50%] z-[1] sm:left-[-10%] lg:left-[-10%] lg:top-50"
        aria-hidden
      >
        <MarketingSafeImage
          src={formBubbleSrc}
          alt={formBubbleAlt}
          width={368}
          height={368}
          className="h-auto w-[min(220px,42vw)] max-w-[368px] mix-blend-screen opacity-95 sm:w-[280px] lg:w-[368px]"
          sizes="(max-width: 1024px) 42vw, 368px"
        />
      </div>

      <div
        className={`pointer-events-none w-full shrink-0 bg-[#F5F8FF] min-[2560px]:-mb-1 ${bookACallHeroOverlapClasses.formSpacer}`}
        aria-hidden
      />

      <div
        className={`relative w-full overflow-x-clip overflow-y-hidden pb-20 sm:pb-24 lg:pb-28 min-[2560px]:-mt-1 ${bookACallHeroOverlapClasses.formContentPt}`}
        style={{ backgroundColor: BOOK_A_CALL_FORM_BG }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute bottom-[-45%] left-[-20%] h-[min(1500px,90vw)] w-[min(1500px,90vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.35)_0%,transparent_40%)] blur-3xl lg:left-[-25%]" />
          <div className="absolute top-0 right-[-35%] h-[min(1200px,90vw)] w-[min(1200px,90vw)] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.4)_0%,transparent_40%)] blur-3xl lg:top-[-20%]" />
        </div>

        <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
          <div className="grid items-start gap-8 max-lg:grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 xl:gap-20">
            <div
              className={cn(
                "relative order-2 mx-auto w-full lg:order-1 lg:mx-0 lg:max-w-none",
                serviceFaqIllustrationWrapperClassName,
                "max-lg:max-w-[min(100%,320px)] lg:max-w-[520px]",
              )}
            >
              <MarketingSafeImage
                src={womanImageSrc}
                alt={womanImageAlt}
                width={560}
                height={620}
                className={cn(serviceFaqIllustrationImageClassName, "lg:max-h-none lg:h-auto")}
                sizes="(max-width: 1024px) 88vw, 42vw"
              />
            </div>

            <div className="order-1 w-full justify-self-center lg:order-2 lg:max-w-none lg:justify-self-stretch">
              <div
                className="w-full rounded-[22px] bg-gradient-to-r from-[#00C8F4] via-[#9B7DFF] to-[#E3058D] p-[4px] shadow-[0_16px_56px_rgba(17,16,76,0.14)] sm:rounded-[24px] sm:p-[5px] lg:p-[6px]"
                role="presentation"
              >
                <div className="rounded-[18px] bg-white p-[3px] sm:rounded-[20px] sm:p-1">
                  <div className="overflow-hidden rounded-[15px] border-[3px] border-[#11104C]/12 bg-white px-4 py-8 sm:rounded-[17px] sm:px-6 sm:py-10 md:py-12 lg:border-[4px] lg:px-8 lg:py-12">
                    <GhlBookingEmbed
                      className="px-0 sm:px-1"
                      config={{
                        ...onboardingCallAm2Booking,
                        scriptDatasetKey: "onboarding-call-am2",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
