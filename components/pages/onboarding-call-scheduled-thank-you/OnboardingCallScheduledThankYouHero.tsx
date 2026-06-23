import { CallScheduledThankYouHero } from "@/components/shared/CallScheduledThankYouHero";
import { Container } from "@/components/shared/Container";
import { onboardingCallScheduledThankYouPage } from "@/data/onboardingCallScheduledThankYou";

export function OnboardingCallScheduledThankYouHero() {
  const { hero } = onboardingCallScheduledThankYouPage;

  return (
    <CallScheduledThankYouHero
      headingId="onboarding-thank-you-hero-heading"
      archGradientId="onboarding-thank-you-arch-glow"
      title={hero.title}
      belowArch={
        <Container className="max-w-2xl text-center">
          <ul className="type-rule-p mx-auto inline-block space-y-4 text-left text-[#11104C]/90">
            {hero.messages.map((message) => (
              <li key={message} className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-[#00C8F4]" aria-hidden />
                <span>{message}</span>
              </li>
            ))}
          </ul>
          <p className="type-rule-p mt-8 font-semibold text-[#11104C] sm:mt-10">{hero.closing}</p>
        </Container>
      }
    />
  );
}
