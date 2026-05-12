import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { howItWorksDontSection, type HowItWorksDontItem } from "@/data/howItWorks";

function DontScopeCard({ item }: { item: HowItWorksDontItem }) {
  const borderGradient = `linear-gradient(${item.borderGradientDeg}deg, #FB3A1E 0%, #e3058d 33%, #7547c5 100%)`;

  return (
    <div className="relative h-[219px] w-[219px] shrink-0">
      <div
        className="flex h-full w-full flex-col overflow-hidden rounded-[60px] p-px shadow-[0_0_20px_-6px_rgba(236,72,153,0.35)]"
        style={{ background: borderGradient }}
      >
        <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center gap-y-4 rounded-[59px] bg-[#02063B] px-2.5 py-7 text-center">
          <h3 className="text-balance text-[0.8125rem] font-bold leading-snug tracking-tight text-white">
            {item.label}
          </h3>
          <Link
            href={item.detailHref}
            className="text-[0.6875rem] font-semibold text-white underline-offset-2 transition hover:underline"
          >
            View Details &gt;&gt;
          </Link>
        </div>
      </div>
      {/* X — di luar overflow gradient supaya lingkaran penuh; di atas tepi bawah kartu */}
      <span
        className="absolute bottom-0 left-1/2 z-[99] flex size-11 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#e11d48] text-[1.625rem] font-bold leading-none text-white shadow-md"
        aria-hidden
      >
        ×
      </span>
      {/* Icon — white ring, overlaps top border */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[98] flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-solid border-white bg-[#02063B] shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
        <SafeImage
          src={item.iconSrc}
          alt={item.iconAlt}
          width={35}
          height={35}
          className="h-[35px] w-[35px] object-contain"
        />
      </div>
    </div>
  );
}

export function HowItWorksDontDo() {
  const { kicker, titleBefore, titleHighlight, titleAfter, intro, items, bannerTextAccent, bannerTextRest } =
    howItWorksDontSection;

  return (
    <section className="relative z-10 isolate pb-0" aria-labelledby="how-it-works-dont-heading">
      <div className="relative -mt-[2.5rem] overflow-hidden rounded-t-[50%_2.25rem] bg-gradient-to-b from-[#231d62] via-[#181547] to-[#0f0c32] pt-14 shadow-[0_-12px_40px_-28px_rgba(15,12,42,0.35)] sm:-mt-[3.25rem] sm:rounded-t-[50%_2.75rem] sm:pt-[3.25rem] md:-mt-[3.75rem] md:rounded-t-[50%_3.75rem] md:pt-[3.75rem] lg:-mt-16 lg:rounded-t-[50%_4.5rem] lg:pt-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(129,106,246,0.22)_0%,transparent_55%),radial-gradient(ellipse_50%_40%_at_100%_70%,rgba(236,72,153,0.12)_0%,transparent_50%)]"
          aria-hidden
        />

        <Container className="relative z-[1] mx-auto max-w-[1440px] px-5 pb-12 text-center md:px-10 lg:pb-14 lg:px-10">
          <p className="text-[36px] font-bold leading-tight tracking-wide text-[#ff9f6e]">{kicker}</p>
          <h2
            id="how-it-works-dont-heading"
            className="type-rule-h2 mx-auto mt-4 max-w-4xl font-extrabold tracking-tight text-white"
          >
            {titleBefore}
            <span className="text-[#ee3eb8]">{titleHighlight}</span>
            {titleAfter}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/92">{intro}</p>

          {/* Dua baris flex: jarak antar baris lebih besar; jarak antar kartu per baris */}
          <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-y-[2.875rem] md:gap-y-[4.025rem]">
            <div className="flex flex-wrap justify-center gap-[1.54rem] md:gap-[1.925rem]">
              {items.slice(0, 3).map((item) => (
                <DontScopeCard key={item.id} item={item} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-[1.54rem] md:gap-[1.925rem]">
              {items.slice(3).map((item) => (
                <DontScopeCard key={item.id} item={item} />
              ))}
            </div>
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
