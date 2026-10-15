import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersHero } from "@/data/careers";

export function CareersHero() {
  const d = careersHero;

  return (
    // White section bg so transparent wave in hero-careers-bg reads as white (matches section 2).
    <section className="relative overflow-hidden bg-white pb-0 pt-28 text-white sm:pt-32 xl:pt-40">
      <div className="pointer-events-none absolute inset-0 z-0">
        <SafeImage
          src={d.backgroundImage}
          alt=""
          fill
          priority
          quality={80}
          optimized
          sizes="100vw"
          className="h-full w-full object-fill object-center"
          aria-hidden
        />
      </div>

      <Container className="relative z-20 max-w-[1440px] !px-4 pb-12 sm:!px-6 sm:pb-16 lg:!px-20 xl:pb-24">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 xl:gap-6">
          <div className="relative z-20 min-w-0 text-center lg:text-left">
            <p className="font-[var(--font-poppins)] text-[13px] font-bold uppercase leading-[1.4] tracking-[2px] text-[#F60996] sm:text-[15px] lg:text-[17px]">
              {d.eyebrow}
            </p>
            <h1 className="mx-auto mt-3 max-w-[620px] font-[var(--font-poppins)] text-[32px] font-bold leading-[1.12] tracking-[-1px] text-white sm:mt-4 sm:text-[42px] lg:mx-0 lg:text-[50px] xl:text-[58px] xl:tracking-[-1.2px]">
              {d.titleBefore}
              <span className="text-[#F60996]">{d.titleAccent}</span>
              {d.titleAfter}
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] font-[var(--font-inter)] text-[14px] font-semibold leading-[1.6] tracking-normal text-white sm:mt-6 sm:text-[15px] lg:mx-0">
              {d.lead}
            </p>
            <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center lg:justify-start">
              <Link
                href={d.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#F60996] to-[#f97316] px-7 py-3.5 font-[var(--font-poppins)] text-[14px] font-semibold leading-[1.4] text-white shadow-lg transition hover:brightness-110"
              >
                {d.primaryCta.label}
                <ChevronRight className="size-5 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
              </Link>
              <Link
                href={d.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-7 py-3.5 font-[var(--font-poppins)] text-[14px] font-semibold leading-[1.4] text-white transition hover:bg-white/10"
              >
                {d.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative z-20 mx-auto w-full max-w-[420px] sm:max-w-[520px] lg:max-w-none">
            <div className="relative mx-auto aspect-[541/449] w-full max-w-[541px]">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                priority
                quality={80}
                optimized
                sizes="(max-width: 639px) min(100vw, 420px), (max-width: 1023px) min(100vw, 520px), 560px"
                className="object-contain object-center mix-blend-lighten"
              />
            </div>

            <div className="absolute left-0 top-4 z-30 max-w-[140px] rotate-[-8deg] rounded-md bg-[#F60996] px-2.5 py-1.5 shadow-lg sm:-left-2 sm:top-6 sm:max-w-[160px] sm:px-3 sm:py-2 md:-left-4 md:max-w-[180px]">
              <p className="font-[var(--font-poppins)] text-[11px] font-bold leading-snug text-white sm:text-[12px] md:text-[13px]">
                {d.stickyNote}
              </p>
            </div>

            <div className="absolute bottom-2 right-0 z-30 flex max-w-[150px] items-center gap-2 rounded-xl bg-[#4C1D95] px-2.5 py-2 shadow-lg sm:bottom-4 sm:right-0 sm:max-w-[170px] sm:px-3 sm:py-2.5 md:right-2 md:max-w-[190px]">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm sm:h-8 sm:w-8"
                aria-hidden
              >
                ★
              </span>
              <p className="font-[var(--font-poppins)] text-[10px] font-bold leading-snug text-white sm:text-[11px] md:text-[12px]">
                {d.badge}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
