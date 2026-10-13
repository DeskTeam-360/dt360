import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { careersHero } from "@/data/careers";

export function CareersHero() {
  const d = careersHero;

  return (
    <section className="relative overflow-hidden bg-[#02063B] pb-16 pt-32 text-white sm:pb-20 xl:pb-24 xl:pt-40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(227,5,141,0.45),transparent_42%),radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.4),transparent_40%)]"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[1440px] !px-6 lg:!px-20">
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:gap-16">
          <div className="min-w-0">
            <p className="font-[var(--font-montserrat)] text-[13px] font-bold uppercase tracking-[0.14em] text-[#E3058D]">
              {d.eyebrow}
            </p>
            <h1 className="mt-4 font-[var(--font-poppins)] text-[40px] font-bold leading-[1.08] tracking-tight sm:text-[52px] lg:text-[64px]">
              {d.titleBefore}
              <span className="text-[#E3058D]">{d.titleAccent}</span>
              {d.titleAfter}
            </h1>
            <p className="mt-6 max-w-xl font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.7] text-white/85">
              {d.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={d.primaryCta.href}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#e4277a] to-[#f97316] px-6 py-3.5 font-[var(--font-montserrat)] text-[15px] font-bold text-white shadow-lg transition hover:brightness-110"
              >
                {d.primaryCta.label}
              </Link>
              <Link
                href={d.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 bg-transparent px-6 py-3.5 font-[var(--font-montserrat)] text-[15px] font-bold text-white transition hover:bg-white/10"
              >
                {d.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] xl:max-w-none">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[40%_45%_42%_48%/48%_42%_50%_45%] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-4 ring-white/10">
              <SafeImage
                src={d.image}
                alt={d.imageAlt}
                fill
                priority
                quality={75}
                optimized
                sizes="(max-width: 1279px) min(100vw, 520px), 560px"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute -left-2 top-6 max-w-[160px] rotate-[-8deg] rounded-md bg-[#E3058D] px-3 py-2 shadow-lg sm:-left-4 sm:max-w-[180px]">
              <p className="font-[var(--font-montserrat)] text-[12px] font-bold leading-snug text-white sm:text-[13px]">
                {d.stickyNote}
              </p>
            </div>

            <div className="absolute bottom-4 right-0 flex max-w-[170px] items-center gap-2 rounded-xl bg-[#4C1D95] px-3 py-2.5 shadow-lg sm:right-2 sm:max-w-[190px]">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm"
                aria-hidden
              >
                ★
              </span>
              <p className="font-[var(--font-montserrat)] text-[11px] font-bold leading-snug text-white sm:text-[12px]">
                {d.badge}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white sm:h-24"
        aria-hidden
      />
    </section>
  );
}
