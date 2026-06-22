import { CallScheduledThankYouHero } from "@/components/shared/CallScheduledThankYouHero";
import { onboardingCallScheduledThankYouPage } from "@/data/onboardingCallScheduledThankYou";

export function OnboardingCallScheduledThankYouHero() {
  const { hero } = onboardingCallScheduledThankYouPage;

  return (
    <CallScheduledThankYouHero
      headingId="onboarding-thank-you-hero-heading"
      archGradientId="onboarding-thank-you-arch-glow"
      title={hero.title}
    >
      <ul className="type-rule-p mx-auto mt-8 max-w-2xl space-y-4 text-left text-white/95 sm:mt-10">
        {hero.messages.map((message) => (
          <li key={message} className="flex gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-[#00C8F4]" aria-hidden />
            <span>{message}</span>
          </li>
        ))}
      </ul>
      <p className="type-rule-p mt-8 font-semibold text-white sm:mt-10">{hero.closing}</p>
    </CallScheduledThankYouHero>
  );
}
