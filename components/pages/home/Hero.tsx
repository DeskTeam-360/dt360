import { Container } from "@/components/shared/Container";
import { heroContent } from "@/data/home";
import { HeroActions } from "./CTA";
import { HeroStatsBar } from "./HeroStatsBar";

export function Hero() {
  const { headlineLine1, headlineLine2, subheading } = heroContent;

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden overflow-y-hidden bg-[#11104C] pb-0 pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Same Figma corner treatment as navbar — continues the cyan “arc” into hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_0%_0%,rgba(0,200,244,0.5)_0%,transparent_30%)] lg:bg-[radial-gradient(ellipse_100%_100%_at_0%_0%,rgba(0,200,244,0.5)_0%,transparent_50%)]"
        aria-hidden
      />
      {/* Warm orange wash — bottom-left, behind CTA / stats (Figma-style) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_-8%_108%,rgba(237,141,83,0.52)_0%,rgba(237,141,83,0.14)_38%,transparent_68%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-7xl">
        <div className="grid items-center gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,596px)] lg:items-center lg:gap-0 xl:gap-0">
          <div className="relative z-20 pt-[1em] lg:pt-0 lg:pr-4">
            <h1
              id="hero-heading"
              className="type-rule-h1 text-balance text-white"
            >
              <span className="block">{headlineLine1}</span>
              <span className="mt-2 block lg:mt-3">{headlineLine2}</span>
            </h1>
            <p className="type-rule-p mt-6 max-w-full text-pretty text-white/90 sm:mt-8">
              {subheading}
            </p>
            <HeroActions />
          </div>
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none">
            <div
              className="absolute inset-14 -translate-y-1 scale-85 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.35)_0%,transparent_58%)] blur-3xl"
              aria-hidden
            />
            <div
              className="absolute inset-16 translate-x-2 translate-y-3 scale-80 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.22)_0%,transparent_55%)] blur-3xl"
              aria-hidden
            />
            <div className="relative isolate w-full min-h-[280px] max-w-[652px] py-4 sm:py-6 lg:py-8">
              <video
                className="relative z-[-1] h-auto w-full origin-center scale-[1.2]"
                aria-label="Collaborative digital team: designer, developer, and video editor working together on digital projects."
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/images/homepage_hero_hd_rev2.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </div>
        <HeroStatsBar className="mt-[50px]" />
      </Container>

      {/* Hero → white transition: one wide arc (half ellipse), not a wave */}
      <div
        className="relative bottom-[-2px] z-10 mt-20 w-full overflow-y-hidden text-white sm:mt-12 lg:mt-20"
        aria-hidden
      >
        <svg
          className="block h-[calc(var(--spacing)*19)] w-full sm:h-14 lg:h-16"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,78 Q720,8 1440,78 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}
