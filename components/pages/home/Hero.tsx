import { Container } from "@/components/shared/Container";
import { heroContent } from "@/data/home";
import { HeroActions } from "./CTA";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  const { headlineLine1, headlineLine2, subheading } = heroContent;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#11104C] pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Same Figma corner treatment as navbar — continues the cyan “arc” into hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_44%_120%_at_0%_0%,rgba(0,200,244,0.36)_0%,rgba(0,200,244,0.1)_24%,transparent_40%),radial-gradient(ellipse_100%_58%_at_-8%_-4%,rgba(0,200,244,0.2)_0%,transparent_40%)]"
        aria-hidden
      />
      {/* Organic glows — purple / orange behind illustration side */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_92%_45%,rgba(249,115,22,0.2),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_42%_at_78%_35%,rgba(168,85,247,0.16),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(228,39,122,0.08),transparent_55%)]"
        aria-hidden
      />

      <Container className="relative max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="lg:pr-4">
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[3.35rem] xl:leading-[1.05]"
            >
              <span className="block">{headlineLine1}</span>
              <span className="mt-2 block text-white lg:mt-3">{headlineLine2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base font-normal leading-relaxed text-white/90 sm:mt-8 sm:text-lg sm:leading-relaxed">
              {subheading}
            </p>
            <HeroActions />
          </div>
          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}
