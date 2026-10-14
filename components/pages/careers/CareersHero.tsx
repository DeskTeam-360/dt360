import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersHero } from "@/data/careers";

export function CareersHero() {
  const d = careersHero;

  return (
    // White section bg so transparent wave in hero-careers-bg reads as white (matches section 2).
    <section className="relative overflow-hidden bg-white pb-0 pt-32 text-white xl:pt-40">
      <SafeImage
        src={d.backgroundImage}
        alt=""
        fill
        priority
        quality={75}
        optimized
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] !px-6 pb-16 sm:pb-20 lg:!px-20 xl:pb-24">
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-16">
          <div className="min-w-0">
            <p className="font-[var(--font-poppins)] text-[12px] font-semibold uppercase leading-[1.4] tracking-[2px] text-[#F60996]">
              {d.eyebrow}
            </p>
            <h1 className="mt-4 max-w-[550px] font-[var(--font-poppins)] text-[32px] font-bold leading-[1.12] tracking-[-1px] text-white sm:text-[40px] lg:text-[48px] lg:tracking-[-1.2px]">
              {d.titleBefore}
              <span className="text-[#F60996]">{d.titleAccent}</span>
              {d.titleAfter}
            </h1>
            <p className="mt-6 max-w-[520px] font-[var(--font-inter)] text-[14px] font-normal leading-[1.6] tracking-normal text-white/90 sm:text-[15px]">
              {d.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          <div className="relative mx-auto w-full max-w-[520px] xl:max-w-none">
            <div className="relative mx-auto aspect-[541/449] w-full max-w-[541px]">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                priority
                quality={75}
                optimized
                sizes="(max-width: 1279px) min(100vw, 520px), 560px"
                className="object-contain object-center mix-blend-lighten"
              />
            </div>

            <div className="absolute -left-2 top-6 z-10 max-w-[160px] rotate-[-8deg] rounded-md bg-[#F60996] px-3 py-2 shadow-lg sm:-left-4 sm:max-w-[180px]">
              <p className="font-[var(--font-poppins)] text-[12px] font-semibold leading-snug text-white sm:text-[13px]">
                {d.stickyNote}
              </p>
            </div>

            <div className="absolute bottom-4 right-0 z-10 flex max-w-[170px] items-center gap-2 rounded-xl bg-[#4C1D95] px-3 py-2.5 shadow-lg sm:right-2 sm:max-w-[190px]">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm"
                aria-hidden
              >
                ★
              </span>
              <p className="font-[var(--font-poppins)] text-[11px] font-semibold leading-snug text-white sm:text-[12px]">
                {d.badge}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
