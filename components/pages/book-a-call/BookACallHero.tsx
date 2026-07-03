import { BookACallCalendarSection } from "@/components/pages/book-a-call/BookACallCalendarSection";
import { BookingCalendarHero } from "@/components/pages/book-a-call/BookingCalendarHero";
import { bookACallHero } from "@/data/bookACall";

/** Book a Call — hero + GHL calendar embed. */
export function BookACallHero() {
  return (
    <BookingCalendarHero
      sectionId="book-a-call-section"
      headingId="book-a-call-hero-heading"
      archGradientId="book-a-call-arch-glow"
      title={bookACallHero.title}
    >
      <BookACallCalendarSection />
    </BookingCalendarHero>
  );
}
