import type { HeroStatItem } from "@/data/home";
import { heroStats } from "@/data/home";
import { fontRussoOne } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/** Large numbers (8+, 400+, 1-3): size aligned with H2, Russo One family (next/font/google). */
const statValue = cn(
  fontRussoOne.className,
  "type-rule-h2-hero-stats shrink-0 tabular-nums leading-none tracking-tight text-white",
);

/** Label & copy for 4th cell: aligned with global B — Montserrat Bold 20px. */
const statLabel = cn("type-rule-b text-left leading-tight text-white/90");

/** Label on hover overlay for "side" cells: centered, stacked vertically with number. */
const statLabelHoverStacked = cn("type-rule-b text-center leading-tight text-white/90");

const statTextBlock = cn(
  "type-rule-b max-w-full text-pretty text-center leading-snug text-white/95",
);

/** Copy wrapper: vertically centered in cell (`top-1/2` + `-translate-y-1/2`). */
const hoverOverlayOuter = cn(
  "pointer-events-none absolute left-1 right-1 top-1/2 z-10 -translate-y-1/2 px-4",
  "opacity-0 transition-opacity duration-50 ease-out",
  "group-hover:opacity-100",
  "motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:group-hover:opacity-100",
);

/**
 * Copy content: hover scale.
 * FIX: scale reduced on mobile (1.05) to prevent overflow on 430px screens.
 * Desktop keeps the original 1.25 scale.
 */
const hoverOverlayInner = cn(
  "origin-center rounded-2xl bg-[#10103a] shadow-[0_0_40px_0_rgba(1,211,252,0.48)] ring-2 ring-[#01d3fc]",
  "scale-100 transition-transform duration-50 ease-out",
  "group-hover:scale-[1.05] sm:group-hover:scale-[1.15] lg:group-hover:scale-[1.25]",
  "motion-reduce:scale-100 motion-reduce:group-hover:scale-100",
);

const sideLayout =
  "flex min-h-[6.25rem] flex-row items-center justify-center gap-2.5 px-3 py-4 sm:min-h-[6.5rem] sm:gap-3.5 sm:px-4 sm:py-5 lg:min-h-[6.25rem] lg:gap-4 lg:py-4";

const textLayout =
  "mx-auto flex w-fit min-h-[6.25rem] flex-col items-start justify-center gap-1 px-4 py-4 text-center sm:min-h-[6.5rem] sm:px-4 sm:py-5 lg:min-h-[6.25rem] lg:gap-1.5 lg:py-4";

/** Hover overlay for "side" cells: number on top, text below (not side-by-side). */
const sideLayoutOverlay = cn(
  "flex min-h-[10rem] flex-col items-center justify-center gap-2 px-3 py-[1.875rem] text-center",
  "sm:min-h-[10.25rem] sm:gap-2.5 sm:px-4 sm:py-[2.25rem] lg:min-h-[10rem] lg:py-[1.875rem]",
);

const textLayoutOverlay =
  "flex min-h-[9.5rem] flex-col items-center justify-center gap-1 px-0 py-[1.875rem] text-center sm:min-h-[9.75rem] sm:py-[2.25rem] lg:min-h-[9.5rem] lg:gap-1.5 lg:py-[1.875rem]";

function StatCell({ stat, index, isLast }: { stat: HeroStatItem; index: number; isLast: boolean }) {
  const outer = cn(
    /* FIX: changed overflow-visible → overflow-hidden to clip scaled hover card on mobile */
    "group relative z-0 overflow-hidden hover:z-10",
    stat.layout === "text" ? "w-full text-center px-4 py-0" : "p-0",
    !isLast && "border-b border-white lg:border-b-0",
    index <= 2 && "lg:border-r lg:border-r-white",
  );

  if (stat.layout === "side") {
    return (
      <div className={outer}>
        <div className={cn("relative z-0", sideLayout)}>
          <span className={statValue}>{stat.value}</span>
          <p className={cn(statLabel, "min-w-0")}>
            {stat.labelLine1}
            <br />
            {stat.labelLine2}
          </p>
        </div>
        <div aria-hidden className={hoverOverlayOuter}>
          <div className={cn(hoverOverlayInner, sideLayoutOverlay)}>
            <span className={cn(statValue, "text-center")}>{stat.value}</span>
            <p className={cn(statLabelHoverStacked, "min-w-0 max-w-full text-pretty")}>
              {stat.labelLine1} {stat.labelLine2}
            </p>
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
          <p className={cn(statTextBlock, "text-left")}>
            {stat.line1}
            <br />
            {stat.line2}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroStatsBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-label="Company highlights">
      <div className="overflow-hidden rounded-3xl border border-white bg-[#151448]/70 px-1.5 py-3 backdrop-blur-sm sm:px-2 sm:py-3.5 lg:px-2.5 lg:py-4">
        <div className="relative isolate grid grid-cols-1 overflow-hidden lg:grid-cols-4">
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
