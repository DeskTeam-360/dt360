import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksHero } from "@/data/howItWorks";

export function HowItWorksHero() {
  const { title, subtitle, paragraphs, heroImageSrc, heroImageAlt } = howItWorksHero;

  return (
    <section
      className="relative overflow-hidden bg-[#02063B] px-[20px] pb-[240px] pt-[100px] lg:px-[40px] lg:pb-[600px] lg:pt-[120px]"
      aria-labelledby="how-it-works-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/how%20it%20works/dt360-circle-hero-bg-blue.png')] bg-[length:min(72vw,860px)_auto] bg-left-top bg-no-repeat"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 aspect-square w-[min(52vw,620px)] translate-y-1/2 bg-[url('/images/how%20it%20works/dt360-circle-hero-bg.png')] bg-contain bg-left-bottom bg-no-repeat"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] lg:px-10">
        <div className="grid items-center gap-[80px] lg:grid-cols-[minmax(0,60%)_minmax(0,40%)]">
          <div>
            <h1 id="how-it-works-hero-heading" className="type-rule-h1 text-balance font-bold tracking-tight text-white">
              {title}
            </h1>
            <p className="mt-4 text-[36px] font-semibold leading-snug text-white/95">{subtitle}</p>
            <div className="mt-6 space-y-4 text-[1.125rem] font-medium leading-relaxed text-white/90">
              {paragraphs.map((p, idx) => (
                <p key={`hiw-hero-${idx}`}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto flex w-full justify-center">
            <SafeImage
              src={heroImageSrc}
              alt={heroImageAlt}
              width={720}
              height={640}
              unoptimized
              priority
              className="h-auto w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              sizes="(max-width: 1024px) 90vw, 46vw"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-[1] w-screen -translate-x-1/2 top-[100%]" aria-hidden>
          <SafeImage
            src="/images/how it works/dt360-arrow-bottom-hero-uploaded-v3-transparent.png"
            alt=""
            width={1920}
            height={220}
            unoptimized
            priority
            className="h-auto w-full"
          />
        </div>
      </Container>
    </section>
  );
}
