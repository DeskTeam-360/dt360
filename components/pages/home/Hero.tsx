import { Container } from "@/components/shared/Container";
import { heroContent } from "@/data/home";
import { HeroActions } from "./CTA";
import { HeroStatsBar } from "./HeroStatsBar";

export function Hero() {
  const { headlineLine1, headlineLine2, subheading } = heroContent;

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden bg-[#11104C] pb-0 pt-10 sm:pt-14 lg:pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Same Figma corner treatment as navbar — continues the cyan “arc” into hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_0%_0%,rgba(0,200,244,0.5)_0%,transparent_50%)]" 
        aria-hidden
      />
      {/* Warm orange wash — bottom-left, behind CTA / stats (Figma-style) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_-8%_108%,rgba(237,141,83,0.52)_0%,rgba(237,141,83,0.14)_38%,transparent_68%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-7xl">
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
          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none">
            <div
              className="absolute inset-14 -translate-y-1 scale-85 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.35)_0%,transparent_58%)] blur-3xl"
              aria-hidden
            />
            <div
              className="absolute inset-16 translate-x-2 translate-y-3 scale-80 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.22)_0%,transparent_55%)] blur-3xl"
              aria-hidden
            />
            <div className="relative w-full min-h-[280px] max-w-[560px] p-4 sm:p-6 lg:p-8">
              <video
                className="relative z-[1] h-auto w-full origin-center scale-[1.2]"
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
        <HeroStatsBar className="mt-14 sm:mt-16 lg:mt-20" />
      </Container>

      {/* Transisi hero → putih: satu busur lebar (setengah elips), bukan gelombang */}
      <div
        className="relative z-10 mt-20 w-full text-white sm:mt-12 lg:mt-20"
        aria-hidden
      >
        <svg
          className="block h-12 w-full sm:h-14 lg:h-16"
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
