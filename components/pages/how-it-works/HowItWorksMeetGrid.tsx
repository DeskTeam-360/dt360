import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksMeetSection } from "@/data/howItWorks";
import { cn } from "@/lib/utils";

export function HowItWorksMeetGrid() {
  const { titleBefore, titleHighlight, titleAfter, cards } = howItWorksMeetSection;

  return (
    <section
      className="relative z-0 overflow-hidden bg-[#fff] pb-24 pt-20 md:px-0 md:py-0 md:pb-[10em] lg:pb-28 lg:pt-[220px]"
      aria-labelledby="how-it-works-meet-heading"
    >
      <div
        className="pointer-events-none absolute -left-[25vw] bottom-0 h-[100%] max-h-full w-[75vw] rounded-full"
        style={{ backgroundImage: "radial-gradient(circle, #00c8f466 0%, #0000 60%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[25vw] bottom-0 h-[100%] max-h-full w-[75vw] rounded-full"
        style={{ backgroundImage: "radial-gradient(circle, #e3058d7a 0%, #0000 60%)" }}
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] lg:px-10">
        <div className="relative flex flex-col items-center text-center">
          <div className="pointer-events-none absolute -left-10 top-1/2 z-0 hidden w-[min(28vw,500px)] -translate-y-1/2 lg:block xl:-left-20">
            <SafeImage
              src="/images/how it works/dt360 buble with computer.png"
              alt=""
              width={500}
              height={842}
              className="-ml-[150px] h-auto w-full bg-transparent opacity-90 mix-blend-screen"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none absolute -right-10 top-1/2 z-0 hidden w-[min(28vw,500px)] translate-x-[150px] -translate-y-[calc(50%+50px)] lg:block xl:-right-20">
            <SafeImage
              src="/images/how it works/dt360 buble with tablet.png"
              alt=""
              width={500}
              height={842}
              className="h-auto w-full bg-transparent opacity-90 mix-blend-screen"
              aria-hidden
            />
          </div>
          <h2
            id="how-it-works-meet-heading"
            className="relative z-10 type-rule-h2 max-w-4xl whitespace-pre-line tracking-tight text-[#101651]"
          >
            {titleBefore}
            <span className="text-[#ef2fa9]">{titleHighlight}</span>
            {titleAfter}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 sm:pt-14 md:pt-16 lg:grid-cols-3 lg:gap-8 lg:pt-20">
          {cards.map((card) => {
            const wideIconCard = card.id === "crm" || card.id === "email";
            return (
            <article
              key={card.id}
              className="relative flex min-h-[280px] flex-col rounded-[30px] border-[5px] border-white bg-white/60 p-7 shadow-[0_16px_40px_-24px_rgba(16,22,81,0.35)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="type-rule-h5 text-left text-black">{card.title}</h3>
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center",
                    wideIconCard ? "w-[70px] self-stretch" : "h-[70px] w-[70px]",
                  )}
                >
                  <SafeImage
                    src={card.iconSrc}
                    alt={card.iconAlt}
                    width={70}
                    height={wideIconCard ? 50 : 70}
                    className={cn(
                      "object-contain",
                      wideIconCard ? "h-auto w-full max-h-full max-w-[70px]" : "h-[70px] w-[70px]",
                    )}
                  />
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-left">
                {card.bullets.map((line) => (
                  <li key={line} className="type-rule-p flex items-start justify-start gap-3 text-black">
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
            );
          })}
        </div>
      </Container>
    </section>
  );
}
