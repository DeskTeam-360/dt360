import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksHero } from "@/data/howItWorks";

export function HowItWorksHero() {
  const { title, subtitle, paragraphs, heroImageSrc, heroImageAlt } = howItWorksHero;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0d0c3d] via-[#14125a] to-[#1a1768] pb-16 pt-24 sm:pt-28 lg:pb-24 lg:pt-32"
      aria-labelledby="how-it-works-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(139,92,246,0.35)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_10%_90%,rgba(228,39,122,0.12)_0%,transparent_50%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:gap-8">
          <div>
            <h1 id="how-it-works-hero-heading" className="type-rule-h1 text-balance font-bold tracking-tight text-white">
              {title}
            </h1>
            <p className="mt-4 text-xl font-semibold leading-snug text-white/95 sm:text-2xl">{subtitle}</p>
            <div className="mt-6 space-y-4 text-[1.125rem] font-medium leading-relaxed text-white/90">
              {paragraphs.map((p, idx) => (
                <p key={`hiw-hero-${idx}`}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[560px] justify-center lg:max-w-none">
            <SafeImage
              src={heroImageSrc}
              alt={heroImageAlt}
              width={720}
              height={640}
              priority
              className="h-auto w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              sizes="(max-width: 1024px) 90vw, 46vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
