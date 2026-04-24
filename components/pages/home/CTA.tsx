import { heroContent } from "@/data/home";
import { HeroCtaLink } from "@/components/shared/HeroCtaLink";

export function HeroActions() {
  const { primaryCta, secondaryCta } = heroContent;
  return (
    <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap">
      <HeroCtaLink href={primaryCta.href} variant={primaryCta.variant}>
        {primaryCta.label}
      </HeroCtaLink>
      <HeroCtaLink href={secondaryCta.href} variant={secondaryCta.variant}>
        {secondaryCta.label}
      </HeroCtaLink>
    </div>
  );
}
