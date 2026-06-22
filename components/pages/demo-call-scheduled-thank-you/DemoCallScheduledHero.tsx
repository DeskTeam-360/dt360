import { DemoVideoPlaceholder } from "@/components/pages/demo-call-scheduled-thank-you/DemoVideoPlaceholder";
import { CallScheduledThankYouHero } from "@/components/shared/CallScheduledThankYouHero";
import { Container } from "@/components/shared/Container";
import { demoCallScheduledThankYouPage } from "@/data/demoCallScheduledThankYou";

export function DemoCallScheduledHero() {
  const { hero } = demoCallScheduledThankYouPage;

  return (
    <CallScheduledThankYouHero
      headingId="demo-thank-you-hero-heading"
      archGradientId="demo-thank-you-arch-glow"
      title={hero.title}
      belowArch={
        <Container className="max-w-[900px]">
          <DemoVideoPlaceholder
            variant="framed"
            label={hero.videoLabel}
            ariaLabel={hero.videoAriaLabel}
          />
        </Container>
      }
    >
      <p className="type-rule-p mt-5 text-white/90 sm:mt-6">{hero.subtitle}</p>
    </CallScheduledThankYouHero>
  );
}
