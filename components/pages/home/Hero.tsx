import { Container } from "@/components/shared/Container";
import { heroContent } from "@/data/home";
import { HeroActions } from "./CTA";
import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  const { headlineLine1, headlineLine2, subheading } = heroContent;

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(228,39,122,0.22),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.2),transparent_45%)]" />

      <Container className="relative max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-16">
          <div>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
            >
              <span className="block">{headlineLine1}</span>
              <span className="mt-1 block text-white">{headlineLine2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
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
