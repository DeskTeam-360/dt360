import { BookACallBookingEmbed } from "@/components/pages/book-a-call/BookACallBookingEmbed";
import { Container } from "@/components/shared/Container";
import { BOOK_A_CALL_FORM_BG, bookACallHeroOverlapClasses } from "@/data/bookACall";

/** GHL booking widget below hero — spaced from arch and page edges. */
export function BookACallCalendarSection() {
  return (
    <div
      className={`relative z-10 w-full overflow-x-hidden ${bookACallHeroOverlapClasses.formPull}`}
      aria-label="Schedule your call"
    >
      <div
        className={`pointer-events-none w-full shrink-0 bg-[#F5F8FF] ${bookACallHeroOverlapClasses.formSpacer}`}
        aria-hidden
      />

      <div
        className={`relative w-full ${bookACallHeroOverlapClasses.formContentPt} pb-16 sm:pb-20 lg:pb-28`}
        style={{ backgroundColor: BOOK_A_CALL_FORM_BG }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute bottom-[-45%] left-[-20%] h-[min(1500px,90vw)] w-[min(1500px,90vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.2)_0%,transparent_40%)] blur-3xl lg:left-[-25%]" />
          <div className="absolute top-0 right-[-35%] h-[min(1200px,90vw)] w-[min(1200px,90vw)] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.25)_0%,transparent_40%)] blur-3xl lg:top-[-20%]" />
        </div>

        <Container className="relative z-10 max-w-[1440px] px-6 py-8 sm:px-8 sm:py-10 lg:px-20 lg:py-12">
          <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white px-4 py-8 shadow-[0_8px_40px_rgba(17,16,76,0.06)] ring-1 ring-[#C5C9E0]/50 sm:px-8 sm:py-10 md:py-12">
            <BookACallBookingEmbed className="px-1 sm:px-2" />
          </div>
        </Container>
      </div>
    </div>
  );
}
