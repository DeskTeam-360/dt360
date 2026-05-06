import { Box, FileText, Link2, Megaphone, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { howItWorksDontSection, type HowItWorksDontItem } from "@/data/howItWorks";

function iconFor(id: string) {
  switch (id) {
    case "copy":
      return FileText;
    case "paid":
      return Megaphone;
    case "social":
      return MessagesSquare;
    case "seo":
      return Link2;
    case "cube":
      return Box;
    default:
      return FileText;
  }
}

function DontScopeCard({ item }: { item: HowItWorksDontItem }) {
  const Icon = iconFor(item.id);

  return (
    <div className="relative flex w-full max-w-[340px] shrink-0 justify-center sm:max-w-none">
      <div className="relative w-full pb-6 pt-10">
        {/* Gradient “glow” border */}
        <div className="rounded-2xl bg-gradient-to-r from-[#ff8a3c] via-[#f43f75] to-[#6366f1] p-[1px] shadow-[0_0_28px_-4px_rgba(236,72,153,0.45)]">
          <div className="relative flex min-h-[196px] flex-col items-center rounded-[0.875rem] bg-[linear-gradient(180deg,#211b58_0%,#151140_55%,#120e36_100%)] px-6 pb-10 pt-12">
            <h3 className="text-center text-lg font-bold leading-snug tracking-tight text-white">
              {item.label}
            </h3>
            <Link
              href={item.detailHref}
              className="mt-3 text-center text-sm font-semibold text-white/95 underline-offset-4 transition hover:text-white hover:underline"
            >
              View Details &gt;&gt;
            </Link>
          </div>
        </div>
        {/* Icon cap — overlaps top border */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(180deg,#282060_0%,#1a1744_100%)] shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
          <Icon className="size-[2rem] text-white" strokeWidth={1.5} aria-hidden />
        </div>
        {/* Bottom X */}
        <span
          className="absolute bottom-[-2px] left-1/2 z-10 flex size-9 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#e11d48] text-base font-bold leading-none text-white shadow-md"
          aria-hidden
        >
          ×
        </span>
      </div>
    </div>
  );
}

export function HowItWorksDontDo() {
  const { kicker, titleBefore, titleHighlight, titleAfter, intro, items, bannerTextAccent, bannerTextRest } =
    howItWorksDontSection;

  return (
    <section className="relative z-10 isolate pb-0" aria-labelledby="how-it-works-dont-heading">
      {/* Curved transition from “Meet” (#f3f6fb): elliptical top + overlap */}
      <div
        className="relative -mt-[2.5rem] overflow-hidden rounded-t-[50%_2.25rem] bg-gradient-to-b from-[#231d62] via-[#181547] to-[#0f0c32] pt-14 shadow-[0_-12px_40px_-28px_rgba(15,12,42,0.35)] sm:-mt-[3.25rem] sm:rounded-t-[50%_2.75rem] sm:pt-[3.25rem] md:-mt-[3.75rem] md:rounded-t-[50%_3.75rem] md:pt-[3.75rem] lg:-mt-16 lg:rounded-t-[50%_4.5rem] lg:pt-20"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(129,106,246,0.22)_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_70%,rgba(236,72,153,0.12)_0%,transparent_50%)]"
          aria-hidden
        />

        <Container className="relative z-[1] mx-auto max-w-[1440px] px-5 pb-12 text-center md:px-10 lg:pb-14 lg:px-10">
          <p className="text-base font-bold tracking-wide text-[#ff9f6e] sm:text-[1.05rem]">{kicker}</p>
          <h2
            id="how-it-works-dont-heading"
            className="type-rule-h2 mx-auto mt-4 max-w-4xl font-extrabold tracking-tight text-white"
          >
            {titleBefore}
            <span className="text-[#ee3eb8]">{titleHighlight}</span>
            {titleAfter}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/92">{intro}</p>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 justify-items-center gap-x-10 gap-y-20 sm:gap-y-[4.75rem] md:grid-cols-3 md:gap-y-[4.5rem] lg:gap-x-12">
            {items.slice(0, 3).map((item) => (
              <DontScopeCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mx-auto mt-[4.5rem] grid max-w-5xl grid-cols-1 justify-items-center gap-x-12 gap-y-20 sm:gap-y-[4.75rem] md:mt-14 md:flex md:flex-wrap md:justify-center md:gap-x-16 md:gap-y-[4.5rem]">
            {items.slice(3).map((item) => (
              <DontScopeCard key={item.id} item={item} />
            ))}
          </div>
        </Container>

        <div
          className="relative z-[1] mt-10 border-t border-black bg-[linear-gradient(45deg,#4F0FB3_0%,#A4199A_65%,#D21E8C_84%,#F7515D_100%)] px-4 py-8 sm:mt-14 sm:px-8 lg:py-10"
          aria-label={`${bannerTextAccent}${bannerTextRest}`}
        >
          <p className="mx-auto max-w-[1100px] text-center text-[26px] font-semibold leading-relaxed">
            <span className="text-[#F5B419]">{bannerTextAccent}</span>
            <span className="text-white">{bannerTextRest}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
