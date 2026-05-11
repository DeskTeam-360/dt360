import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksMeetSection } from "@/data/howItWorks";

export function HowItWorksMeetGrid() {
  const { titleBefore, titleHighlight, titleAfter, cards } = howItWorksMeetSection;

  return (
    <section
      className="relative overflow-hidden bg-[#fff] pb-20 pt-[220px] lg:pb-28"
      aria-labelledby="how-it-works-meet-heading"
    >
      <div
        className="pointer-events-none absolute -left-[25vw] bottom-0 h-[100%] max-h-full w-[75vw] rounded-full bg-[radial-gradient(circle,rgba(0,200,244,0.4)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[25vw] bottom-0 h-[100%] max-h-full w-[75vw] rounded-full bg-[radial-gradient(circle,rgba(227,5,141,0.48)_0%,transparent_72%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] lg:px-10">
        <div className="relative flex flex-col items-center text-center">
          <div className="pointer-events-none absolute -left-10 top-1/2 z-0 hidden w-[min(28vw,340px)] -translate-y-1/2 lg:block xl:-left-20">
            <SafeImage
              src="/images/dt360-We-Meet-You-Where-You-Are-left.png"
              alt=""
              width={340}
              height={442}
              className="h-auto w-full bg-transparent opacity-90 mix-blend-screen"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none absolute -right-10 top-1/2 z-0 hidden w-[min(28vw,340px)] -translate-y-1/2 lg:block xl:-right-20">
            <SafeImage
              src="/images/how-it-works-meet-bg-right.png"
              alt=""
              width={340}
              height={442}
              className="h-auto w-full bg-transparent opacity-90 mix-blend-screen"
              aria-hidden
            />
          </div>
          <h2
            id="how-it-works-meet-heading"
            className="relative z-10 type-rule-h2 max-w-4xl whitespace-pre-line tracking-tight text-[#101651]"
          >
            {titleBefore}
            <span className="text-[#E3058D]">{titleHighlight}</span>
            {titleAfter}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 pt-20">
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative flex min-h-[280px] flex-col rounded-[30px] border-[5px] border-white bg-white/60 p-7 shadow-[0_16px_40px_-24px_rgba(16,22,81,0.35)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="type-rule-h5 text-left text-black">{card.title}</h3>
                <div className="flex h-[65px] w-[65px] items-center justify-center">
                  <SafeImage src={card.iconSrc} alt={card.iconAlt} width={65} height={65} className="h-[65px] w-auto object-contain" />
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-left">
                {card.bullets.map((line) => (
                  <li key={line} className="type-rule-p flex justify-center gap-3 text-black">
                    <SafeImage
                      src="/images/how-it-works-black-checklist.png"
                      alt=""
                      width={18}
                      height={18}
                      className="mt-0.5 h-[18px] w-[18px] shrink-0"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
