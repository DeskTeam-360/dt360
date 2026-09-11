import { ClientMeetingWithAm4CalendarSection } from "@/components/pages/client-meeting-with-am4/ClientMeetingWithAm4CalendarSection";
import { BookingCalendarHero } from "@/components/pages/book-a-call/BookingCalendarHero";
import { clientMeetingWithAm4Hero } from "@/data/clientMeetingWithAm4";

export function ClientMeetingWithAm4Hero() {
  return (
    <BookingCalendarHero
      sectionId="client-meeting-with-am4-section"
      headingId="client-meeting-with-am4-hero-heading"
      archGradientId="client-meeting-with-am4-arch-glow"
      title={clientMeetingWithAm4Hero.title}
    >
      <ClientMeetingWithAm4CalendarSection />
    </BookingCalendarHero>
  );
}
