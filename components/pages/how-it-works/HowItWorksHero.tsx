import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { HowItWorksTaskVideo } from "@/components/pages/how-it-works/HowItWorksTaskVideo";
import { howItWorksHero, howItWorksTaskSection } from "@/data/howItWorks";

export function HowItWorksHero() {
  const { title, subtitle, paragraphs, heroImageSrc, heroImageAlt } = howItWorksHero;
  const { titleBefore, titleHighlight } = howItWorksTaskSection;

  return (
    <section
      className="relative z-0 overflow-hidden bg-[#02063B] px-[20px] pb-10 pt-[100px] md:pb-[22rem] lg:px-[40px] lg:pb-[600px] lg:pt-[120px]"
      aria-labelledby="how-it-works-hero-heading"
    >
      {/* Mobile — pink circle atas, cyan circle bawah */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 size-[min(110vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-full sm:hidden"
        style={{ backgroundImage: "radial-gradient(circle, #e3058d7a 0%, #0000 60%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 size-[min(110vw,440px)] -translate-x-1/2 translate-y-1/2 rounded-full sm:hidden"
        style={{ backgroundImage: "radial-gradient(circle, #00c8f466 0%, #0000 60%)" }}
        aria-hidden
      />

      {/* Tablet+ — circle PNG backgrounds */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/images/how%20it%20works/dt360-circle-hero-bg-blue.png')] bg-[length:min(72vw,860px)_auto] bg-left-top bg-no-repeat sm:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden aspect-square w-[min(52vw,620px)] translate-y-1/2 bg-[url('/images/how%20it%20works/dt360-circle-hero-bg.png')] bg-contain bg-left-bottom bg-no-repeat sm:block"
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
        <div
          className="pointer-events-none absolute top-[100%] bottom-0 left-1/2 z-[1] w-screen -translate-x-1/2 min-[2560px]:left-[-115%] min-[2560px]:w-[150vw] min-[2560px]:translate-x-0"
          aria-hidden
        >
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

      <Container className="relative z-20 mt-[calc(var(--spacing)*20)] max-w-[1440px] md:mt-[calc(var(--spacing)*42)] lg:mt-[calc(var(--spacing)*55)] lg:px-10">
        <HowItWorksTaskVideo />
        <h2
          id="how-it-works-task-heading"
          className="type-rule-h2 mt-[calc(var(--spacing)*8)] text-center font-semibold tracking-tight text-white md:hidden"
        >
          {titleBefore}
          <span className="text-[#f336b6]">{titleHighlight}</span>
        </h2>
      </Container>
    </section>
  );
}
