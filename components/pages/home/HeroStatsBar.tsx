import type { HeroStatItem } from "@/data/home";
import { heroStats } from "@/data/home";
import { cn } from "@/lib/utils";

const valueLg = "text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl sm:leading-none";
const caption = "text-left text-xs font-normal leading-tight text-white/90 sm:text-sm";
const textBlock = "text-center text-sm font-normal leading-snug text-white/95 sm:text-base";

/** Wrapper salinan: diposisikan di tengah vertikal sel (`top-1/2` + `-translate-y-1/2`). */
const hoverOverlayOuter = cn(
  "pointer-events-none absolute left-1 right-1 top-1/2 z-30 -translate-y-1/2",
  "opacity-0 transition-opacity duration-300 ease-out",
  "group-hover:opacity-100",
  "motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:group-hover:opacity-100",
);

/** Isi salinan: scale hover (transform terpisah dari translate pusat). */
const hoverOverlayInner = cn(
  "origin-center rounded-2xl bg-[#10103a] shadow-[0_0_40px_0_rgba(1,211,252,0.48)] ring-2 ring-[#01d3fc]",
  "scale-100 transition-transform duration-300 ease-out",
  "group-hover:scale-[1.25]",
  "motion-reduce:scale-100 motion-reduce:group-hover:scale-100",
);

const sideLayout = "flex min-h-[5.5rem] flex-row items-center justify-center gap-2.5 px-3 py-4 sm:min-h-[5.75rem] sm:gap-3.5 sm:px-4 sm:py-5 lg:min-h-[5.5rem] lg:py-4";

const textLayout =
  "flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 px-3 py-4 text-center sm:min-h-[5.75rem] sm:px-4 sm:py-5 lg:min-h-[5.5rem] lg:py-4";

/**
 * Salinan hover: min-h & py vertikal = **1.5×** dari overlay pertama (6.75rem / 7rem, py 1.25rem / 1.5rem).
 * 6.75×1.5 = 10.125rem, 7×1.5 = 10.5rem.
 */
const sideLayoutOverlay =
  "flex min-h-[10.125rem] flex-row items-center justify-center gap-2.5 px-3 py-[1.875rem] sm:min-h-[10.5rem] sm:gap-3.5 sm:px-4 sm:py-[2.25rem] lg:min-h-[10.125rem] lg:py-[1.875rem]";

const textLayoutOverlay =
  "flex min-h-[10.125rem] flex-col items-center justify-center gap-0.5 px-3 py-[1.875rem] text-center sm:min-h-[10.5rem] sm:px-4 sm:py-[2.25rem] lg:min-h-[10.125rem] lg:py-[1.875rem]";

function StatCell({ stat, index, isLast }: { stat: HeroStatItem; index: number; isLast: boolean }) {
  const outer = cn(
    "group relative z-0 overflow-visible p-2 hover:z-40 sm:p-3 lg:p-4",
    !isLast && "border-b border-white lg:border-b-0",
    index <= 2 && "lg:border-r lg:border-r-white",
  );

  if (stat.layout === "side") {
    return (
      <div className={outer}>
        <div className={cn("relative z-0", sideLayout)}>
          <span className={cn("shrink-0 tabular-nums", valueLg)}>{stat.value}</span>
          <div className={cn("flex min-w-0 flex-col justify-center gap-0", caption)}>
            <span>{stat.labelLine1}</span>
            <span>{stat.labelLine2}</span>
          </div>
        </div>
        <div aria-hidden className={hoverOverlayOuter}>
          <div className={cn(hoverOverlayInner, sideLayoutOverlay)}>
            <span className={cn("shrink-0 tabular-nums", valueLg)}>{stat.value}</span>
            <div className={cn("flex min-w-0 flex-col justify-center gap-0", caption)}>
              <span>{stat.labelLine1}</span>
              <span>{stat.labelLine2}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={outer}>
      <div className={cn("relative z-0", textLayout)}>
        <p className={cn("max-w-[12rem] text-pretty", textBlock)}>{stat.line1}</p>
        <p className={cn("max-w-[12rem] text-pretty", textBlock)}>{stat.line2}</p>
      </div>
      <div aria-hidden className={hoverOverlayOuter}>
        <div className={cn(hoverOverlayInner, textLayoutOverlay)}>
          <p className={cn("max-w-[12rem] text-pretty", textBlock)}>{stat.line1}</p>
          <p className={cn("max-w-[12rem] text-pretty", textBlock)}>{stat.line2}</p>
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
