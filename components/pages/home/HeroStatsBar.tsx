import type { HeroStatItem } from "@/data/home";
import { heroStats } from "@/data/home";
import { fontRussoOne } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/** Angka besar (8+, 400+, 1-3): Russo One 64px — `className` next/font menjamin font-family computed (var saja bisa turun ke Montserrat). */
const statValue = cn(
  fontRussoOne.className,
  "shrink-0 tabular-nums text-[64px] font-normal leading-none tracking-tight text-white",
  "max-sm:text-[2.5rem] max-sm:leading-none",
);

/** Label & salinan teks seluler ke-4: Montserrat 20 semibold. */
const statLabel = "text-left font-[var(--font-montserrat)] text-[20px] font-semibold leading-tight text-white/90";

/** Label di overlay hover sel “side”: tengah, stack vertikal bersama angka. */
const statLabelHoverStacked =
  "font-[var(--font-montserrat)] text-center text-[20px] font-semibold leading-tight text-white/90";

const statTextBlock = cn(
  "max-w-full text-pretty text-center font-[var(--font-montserrat)] text-[20px] font-semibold leading-snug text-white/95",
);

/** Wrapper salinan: diposisikan di tengah vertikal sel (`top-1/2` + `-translate-y-1/2`). */
const hoverOverlayOuter = cn(
  "pointer-events-none absolute left-1 right-1 top-1/2 z-10 -translate-y-1/2",
  "opacity-0 transition-opacity duration-50 ease-out",
  "group-hover:opacity-100",
  "motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:group-hover:opacity-100",
);

/** Isi salinan: scale hover (transform terpisah dari translate pusat). */
const hoverOverlayInner = cn(
  "origin-center rounded-2xl bg-[#10103a] shadow-[0_0_40px_0_rgba(1,211,252,0.48)] ring-2 ring-[#01d3fc]",
  "scale-100 transition-transform duration-50 ease-out",
  "group-hover:scale-[1.25]",
  "motion-reduce:scale-100 motion-reduce:group-hover:scale-100",
);

const sideLayout =
  "flex min-h-[6.25rem] flex-row items-center justify-center gap-2.5 px-3 py-4 sm:min-h-[6.5rem] sm:gap-3.5 sm:px-4 sm:py-5 lg:min-h-[6.25rem] lg:gap-4 lg:py-4";

const textLayout =
  "flex min-h-[6.25rem] flex-col items-center justify-center gap-1 px-3 py-4 text-center sm:min-h-[6.5rem] sm:px-4 sm:py-5 lg:min-h-[6.25rem] lg:gap-1.5 lg:py-4";

/** Overlay hover untuk sel “side”: angka di atas, teks di bawah (bukan samping-samping). */
const sideLayoutOverlay = cn(
  "flex min-h-[10rem] flex-col items-center justify-center gap-2 px-3 py-[1.875rem] text-center",
  "sm:min-h-[10.25rem] sm:gap-2.5 sm:px-4 sm:py-[2.25rem] lg:min-h-[10rem] lg:py-[1.875rem]",
);

const textLayoutOverlay =
  "flex min-h-[9.5rem] flex-col items-center justify-center gap-1 px-3 py-[1.875rem] text-center sm:min-h-[9.75rem] sm:px-4 sm:py-[2.25rem] lg:min-h-[9.5rem] lg:gap-1.5 lg:py-[1.875rem]";

function StatCell({ stat, index, isLast }: { stat: HeroStatItem; index: number; isLast: boolean }) {
  const outer = cn(
    "group relative z-0 overflow-visible p-0 hover:z-10",
    !isLast && "border-b border-white lg:border-b-0",
    index <= 2 && "lg:border-r lg:border-r-white",
  );

  if (stat.layout === "side") {
    return (
      <div className={outer}>
        <div className={cn("relative z-0", sideLayout)}>
          <span className={statValue}>{stat.value}</span>
          <div className="flex min-w-0 flex-col justify-center gap-0">
            <p className={statLabel}>{stat.labelLine1}</p>
            <p className={statLabel}>{stat.labelLine2}</p>
          </div>
        </div>
        <div aria-hidden className={hoverOverlayOuter}>
          <div className={cn(hoverOverlayInner, sideLayoutOverlay)}>
            <span className={cn(statValue, "text-center")}>{stat.value}</span>
            <div className="flex min-w-0 flex-col items-center justify-center gap-0">
              <p className={statLabelHoverStacked}>{stat.labelLine1}</p>
              <p className={statLabelHoverStacked}>{stat.labelLine2}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={outer}>
      <div className={cn("relative z-0", textLayout)}>
        <p className={statTextBlock}>{stat.line1}</p>
        <p className={statTextBlock}>{stat.line2}</p>
      </div>
      <div aria-hidden className={hoverOverlayOuter}>
        <div className={cn(hoverOverlayInner, textLayoutOverlay)}>
          <p className={statTextBlock}>{stat.line1}</p>
          <p className={statTextBlock}>{stat.line2}</p>
        </div>
      </div>
    </div>
  );
}

export function HeroStatsBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-label="Company highlights">
      <div className="overflow-visible rounded-3xl border border-white bg-[#151448]/70 px-1.5 py-3 backdrop-blur-sm sm:px-2 sm:py-3.5 lg:px-2.5 lg:py-4">
        <div className="relative isolate grid grid-cols-1 overflow-visible lg:grid-cols-4">
          {heroStats.map((stat, index) => (
            <StatCell
              key={stat.id}
              stat={stat}
              index={index}
              isLast={index === heroStats.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
