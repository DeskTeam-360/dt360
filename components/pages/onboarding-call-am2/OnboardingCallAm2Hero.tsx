import { OnboardingCallAm2CalendarSection } from "@/components/pages/onboarding-call-am2/OnboardingCallAm2CalendarSection";
import { BookingCalendarHero } from "@/components/pages/book-a-call/BookingCalendarHero";
import { onboardingCallAm2Hero } from "@/data/onboardingCallAm2";

export function OnboardingCallAm2Hero() {
  return (
    <BookingCalendarHero
      sectionId="onboarding-call-am2-section"
      headingId="onboarding-call-am2-hero-heading"
      archGradientId="onboarding-call-am2-arch-glow"
      title={onboardingCallAm2Hero.title}
    >
      <OnboardingCallAm2CalendarSection />
    </BookingCalendarHero>
  );
}
