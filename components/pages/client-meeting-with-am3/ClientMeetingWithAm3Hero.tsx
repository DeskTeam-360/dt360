import { ClientMeetingWithAm3CalendarSection } from "@/components/pages/client-meeting-with-am3/ClientMeetingWithAm3CalendarSection";
import { BookingCalendarHero } from "@/components/pages/book-a-call/BookingCalendarHero";
import { clientMeetingWithAm3Hero } from "@/data/clientMeetingWithAm3";

export function ClientMeetingWithAm3Hero() {
  return (
    <BookingCalendarHero
      sectionId="client-meeting-with-am3-section"
      headingId="client-meeting-with-am3-hero-heading"
      archGradientId="client-meeting-with-am3-arch-glow"
      title={clientMeetingWithAm3Hero.title}
    >
      <ClientMeetingWithAm3CalendarSection />
    </BookingCalendarHero>
  );
}
