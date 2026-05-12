"use client";

import { useEffect, useMemo, useState } from "react";
import { SafeImage } from "@/components/shared/SafeImage";
import { cn } from "@/lib/utils";

export type ServiceHeroIncludedChecklistProps = {
  /** All bullet strings; component slices into pages of `itemsPerPage`. */
  items: readonly string[];
  /** How many checklist rows per “page” before the next dot. Default 5. */
  itemsPerPage?: number;
  /** Starting page (0-based). Clamped if out of range. */
  initialPageIndex?: number;
  className?: string;
};

/**
 * “What’s included” checklist + dot pagination for service hero sections.
 * Add more strings to `items` — extra pages appear automatically (no manual dot count).
 */
export function ServiceHeroIncludedChecklist({
  items,
  itemsPerPage = 5,
  initialPageIndex = 0,
  className,
}: ServiceHeroIncludedChecklistProps) {
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  /** Clamped so the view stays valid if `items` / `totalPages` shrinks (no effect + setState). */
  const safePageIndex = Math.min(Math.max(0, pageIndex), Math.max(0, totalPages - 1));

  const visibleItems = useMemo(
    () =>
      items.slice(safePageIndex * itemsPerPage, (safePageIndex + 1) * itemsPerPage),
    [items, itemsPerPage, safePageIndex],
  );

  /** Always `itemsPerPage` slots so section height stays stable when the last page has fewer rows. */
  const rowSlots = useMemo(
    () => Array.from({ length: itemsPerPage }, (_, i) => visibleItems[i] ?? null),
    [visibleItems, itemsPerPage],
  );

  const showDots = totalPages > 1;

  useEffect(() => {
    if (!showDots) return;
    const timerId = window.setInterval(() => {
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => window.clearInterval(timerId);
  }, [showDots, totalPages]);

  return (
    <div
      className={cn(
        "w-full min-w-0 space-y-3 sm:space-y-4",
        className,
      )}
    >
      <div className="space-y-3 sm:space-y-4" role="list" aria-label="What is included">
        {rowSlots.map((item, idx) =>
          item !== null ? (
            <div
              key={`${safePageIndex}-${idx}`}
              role="listitem"
              className="relative rounded-2xl border border-white/20 bg-white/8 py-3 pl-14 pr-3 backdrop-blur-[2px] sm:py-4 sm:pl-16 sm:pr-4"
            >
              <SafeImage
                src="/images/Service - Checklist.png"
                alt=""
                width={40}
                height={40}
                className="absolute left-[-18px] top-1/2 h-[40px] w-[40px] -translate-y-1/2"
              />
              <p className="type-rule-h5 leading-relaxed text-white/95 xl:leading-tight">{item}</p>
            </div>
          ) : (
            <div
              key={`pad-${safePageIndex}-${idx}`}
              aria-hidden
              className="pointer-events-none relative rounded-2xl border border-white/20 bg-white/8 py-3 pl-14 pr-3 opacity-0 sm:py-4 sm:pl-16 sm:pr-4"
            >
              <p className="type-rule-h5 leading-relaxed text-white/95 xl:leading-tight">&nbsp;</p>
            </div>
          ),
        )}
      </div>
      {/* Fixed vertical space for dots so single-page checklists don’t shorten the block vs multi-page. */}
      <div
        className="flex min-h-[2rem] items-center justify-center gap-2 pt-2"
        role={showDots ? "tablist" : undefined}
        aria-label={showDots ? "Included items pages" : undefined}
      >
        {showDots
          ? Array.from({ length: totalPages }, (_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                role="tab"
                aria-selected={safePageIndex === dotIndex}
                aria-label={`Page ${dotIndex + 1} of ${totalPages}`}
                onClick={() => setPageIndex(dotIndex)}
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80",
                  safePageIndex === dotIndex ? "bg-[#F5B419]" : "bg-white/40 hover:bg-white/55",
                )}
              />
            ))
          : null}
      </div>
    </div>
  );
}
