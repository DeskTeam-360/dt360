import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { showcaseHeroContent } from "@/data/showcase";

export function ShowcaseHero() {
  const { titleLine1, titleLine2, description } = showcaseHeroContent;

  return (
    <section
      id="showcase-hero"
      className="relative overflow-hidden bg-white pt-16 pb-12 text-black lg:pt-24 lg:pb-16"
      aria-labelledby="showcase-hero-heading"
    >
      {/* Main container */}
      <Container className="relative z-10 flex min-h-[80vh] items-center justify-center max-w-7xl">
        {/* Decorative side backgrounds: bounded by main container */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute right-0 top-0 h-[1266px] w-[1266px] translate-x-[78%] -translate-y-[27%]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(227,5,141,0.4) 0%, rgba(227,5,141,0) 100%)",
            }}
            aria-hidden
          />
        <div
          className="absolute left-0 top-0 h-[1266px] w-[1266px] -translate-x-[78%] -translate-y-[5%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,200,244,0.4) 0%, rgba(1,211,252,0) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute left-[-20%] top-[8%] w-[min(28vw,22rem)]">
            <SafeImage
              src="/images/showcase-hero-bgleft-1.png"
              alt=""
              width={360}
              height={430}
              className="h-auto w-full object-contain"
            />
          </div>
        <div className="absolute right-[-20%] top-[18%] w-[min(30vw,24rem)]">
            <SafeImage
              src="/images/showcase-hero-bgright-1.png"
              alt=""
              width={400}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Sub-container (text block) */}
        <div className="relative z-10 mx-auto w-full text-center">
          <h1 id="showcase-hero-heading" className="text-balance">
            <span className="block">{titleLine1}</span>
            <span className="mt-2 block">{titleLine2}</span>
          </h1>
          <p className="type-rule-p mx-auto mt-12 max-w-3xl text-pretty text-black/90">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
