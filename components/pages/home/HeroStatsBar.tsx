import type { HeroStatItem } from "@/data/home";
import { heroStats } from "@/data/home";
import { cn } from "@/lib/utils";

const valueLg = "text-4xl font-bold leading-[0.95] tracking-tight text-white sm:text-5xl sm:leading-none";
const caption = "text-left text-xs font-normal leading-tight text-white/90 sm:text-sm";
const textBlock = "text-center text-sm font-normal leading-snug text-white/95 sm:text-base";

function StatCell({ stat, index, isLast }: { stat: HeroStatItem; index: number; isLast: boolean }) {
  if (stat.layout === "side") {
    return (
      <div
        className={cn(
          "flex min-h-[5.5rem] flex-row items-center justify-center gap-2.5 px-3 py-4 sm:min-h-[5.75rem] sm:gap-3.5 sm:px-4 sm:py-5 lg:min-h-[5.5rem] lg:py-4",
          !isLast && "border-b border-white lg:border-b-0",
          index <= 2 && "lg:border-r lg:border-r-white",
        )}
      >
        <span className={cn("shrink-0 tabular-nums", valueLg)}>{stat.value}</span>
        <div className={cn("flex min-w-0 flex-col justify-center gap-0", caption)}>
          <span>{stat.labelLine1}</span>
          <span>{stat.labelLine2}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 px-3 py-4 text-center sm:min-h-[5.75rem] sm:px-4 sm:py-5 lg:min-h-[5.5rem] lg:py-4",
        !isLast && "border-b border-white lg:border-b-0",
        index <= 2 && "lg:border-r lg:border-r-white",
      )}
    >
      <p className={cn("max-w-[12rem] text-pretty", textBlock)}>{stat.line1}</p>
      <p className={cn("max-w-[12rem] text-pretty", textBlock)}>{stat.line2}</p>
    </div>
  );
}

export function HeroStatsBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-label="Company highlights">
      <div className="rounded-3xl border border-white bg-[#151448]/70 px-1.5 py-3 backdrop-blur-sm sm:px-2 sm:py-3.5 lg:px-2.5 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4">
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
