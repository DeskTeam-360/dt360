import { ClientMeetingWithAm2CalendarSection } from "@/components/pages/client-meeting-with-am2/ClientMeetingWithAm2CalendarSection";
import { BookingCalendarHero } from "@/components/pages/book-a-call/BookingCalendarHero";
import { clientMeetingWithAm2Hero } from "@/data/clientMeetingWithAm2";

export function ClientMeetingWithAm2Hero() {
  return (
    <BookingCalendarHero
      sectionId="client-meeting-with-am2-section"
      headingId="client-meeting-with-am2-hero-heading"
      archGradientId="client-meeting-with-am2-arch-glow"
      title={clientMeetingWithAm2Hero.title}
    >
      <ClientMeetingWithAm2CalendarSection />
    </BookingCalendarHero>
  );
}
