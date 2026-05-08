import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { showcaseHeroContent } from "@/data/showcase";

export function ShowcaseHero() {
  const { titleLine1, titleLine2, description } = showcaseHeroContent;

  return (
    <section
      id="showcase-hero"
      className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-24 lg:pb-16"
      aria-labelledby="showcase-hero-heading"
    >
      {/* Decorative side backgrounds: each image protrudes ~10% outside container */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-[8%] w-[min(28vw,22rem)] -translate-x-[10%]">
          <SafeImage
            src="/images/showcase-hero-bgleft.png"
            alt=""
            width={360}
            height={430}
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="absolute right-0 top-[18%] w-[min(30vw,24rem)] translate-x-[10%]">
          <SafeImage
            src="/images/showcase-hero-bgright.png"
            alt=""
            width={400}
            height={450}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      {/* Main container */}
      <Container className="relative z-10 max-w-7xl">
        {/* Sub-container (text block) */}
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1
            id="showcase-hero-heading"
            className="text-balance text-[#11104C]"
          >
            <span className="block">{titleLine1}</span>
            <span className="mt-2 block">{titleLine2}</span>
          </h1>
          <p className="type-rule-p mx-auto mt-6 max-w-3xl text-pretty text-[#11104C]/90">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
