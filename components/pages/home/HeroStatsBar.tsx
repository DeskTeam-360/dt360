import { heroStats } from "@/data/home";
import { cn } from "@/lib/utils";

export function HeroStatsBar({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)} aria-label="Company highlights">
      <div className="rounded-3xl border border-white/15 bg-[#151448]/70 px-1.5 py-3 shadow-black/20 backdrop-blur-sm sm:px-2 sm:py-3.5 lg:px-2.5 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {heroStats.map((stat, index) => {
            const isMetric = Boolean(stat.value?.length);
            const isLast = index === heroStats.length - 1;

            return (
              <div
                key={stat.id}
                className={cn(
                  "flex min-h-[5.5rem] flex-col items-center justify-center gap-0.5 px-4 py-5 text-center sm:min-h-[5.75rem] sm:py-6 lg:min-h-[6.25rem]",
                  !isLast && "border-b border-white/10 lg:border-b-0",
                  index <= 1 && "lg:border-r lg:border-r-white/10",
                  index === 2 && "lg:border-r lg:border-r-white/25",
                )}
              >
                {isMetric ? (
                  <>
                    <p className="text-3xl font-bold tracking-tight text-white sm:text-[2rem]">
                      {stat.value}
                    </p>
                    <p className="max-w-[12rem] text-pretty text-sm font-normal leading-snug text-white/85">
                      {stat.label}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="max-w-[14rem] text-pretty text-sm font-semibold leading-snug text-white sm:text-base">
                      {stat.label}
                    </p>
                    {stat.labelLine2 ? (
                      <p className="max-w-[14rem] text-pretty text-sm font-semibold leading-snug text-white sm:text-base">
                        {stat.labelLine2}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
