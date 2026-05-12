import { CircleCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksMeetSection } from "@/data/howItWorks";

export function HowItWorksMeetGrid() {
  const { titleBefore, titleHighlight, titleAfter, cards, floatingImageSrc, floatingImageAlt } = howItWorksMeetSection;

  return (
    <section
      className="relative overflow-hidden bg-[#f3f6fb] py-20 lg:py-28"
      aria-labelledby="how-it-works-meet-heading"
    >
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(186,230,253,0.9)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(244,187,249,0.55)_0%,transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.35)_0%,transparent_70%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] lg:px-10">
        <div className="relative flex flex-col items-center text-center">
          <div className="pointer-events-none absolute -left-4 top-0 hidden w-[min(22%,200px)] lg:block xl:-left-8">
            <SafeImage
              src={floatingImageSrc}
              alt={floatingImageAlt}
              width={200}
              height={180}
              className="h-auto w-full opacity-95"
            />
          </div>
          <div className="pointer-events-none absolute -right-4 top-0 hidden w-[min(22%,200px)] scale-x-[-1] lg:block xl:-right-8">
            <SafeImage
              src={floatingImageSrc}
              alt=""
              width={200}
              height={180}
              className="h-auto w-full opacity-95"
              aria-hidden
            />
          </div>
          <h2
            id="how-it-works-meet-heading"
            className="type-rule-h2 max-w-4xl font-extrabold tracking-tight text-[#101651]"
          >
            {titleBefore}
            <span className="text-[#E3058D]">{titleHighlight}</span>
            {titleAfter}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative flex min-h-[280px] flex-col rounded-3xl border border-[#e2e8f1] bg-white p-7 shadow-[0_16px_40px_-24px_rgba(16,22,81,0.35)]"
            >
              <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center">
                <SafeImage src={card.iconSrc} alt={card.iconAlt} width={56} height={56} className="object-contain" />
              </div>
              <h3 className="pr-16 text-left text-2xl font-bold leading-tight text-[#101651]">{card.title}</h3>
              <ul className="mt-5 space-y-3 text-left">
                {card.bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-base font-medium leading-snug text-[#2a2f61]">
                    <CircleCheck className="mt-0.5 size-[1.125rem] shrink-0 fill-[#22c55e] text-white" aria-hidden />
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
