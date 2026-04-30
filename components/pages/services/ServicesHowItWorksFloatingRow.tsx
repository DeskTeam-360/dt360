"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Keep the card row truly split between navy and white backgrounds:
 * - Navy only exists in the heading wrapper; area below is transparent (white from main).
 * - Negative top margin lifts the row so the card midpoint sits near the navy boundary.
 * - Negative bottom margin lifts the next section by the same amount, creating overlap.
 *
 * overlapFraction = 0.5 -> overlapPx ~= half of the row height.
 */
export const DEFAULT_HOW_IT_WORKS_OVERLAP_FRACTION = 0.5;

type Props = {
  children: ReactNode;
  /** 0-1; usually 0.5 for half in How It Works and half in Simple Pricing */
  overlapFraction?: number;
  /** Added only to negative margin-top (px); does not affect margin-bottom */
  extraNegativeMarginTopPx?: number;
  /** Added only to negative margin-bottom (px); does not affect margin-top */
  extraNegativeMarginBottomPx?: number;
  className?: string;
};

export function ServicesHowItWorksFloatingRow({
  children,
  overlapFraction = DEFAULT_HOW_IT_WORKS_OVERLAP_FRACTION,
  extraNegativeMarginTopPx = 0,
  extraNegativeMarginBottomPx = 0,
  className,
}: Props) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [overlapPx, setOverlapPx] = useState(0);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      /** getBoundingClientRect.height tracks visual bounds (cards include slight protruding assets). */
      const h = Math.ceil(el.getBoundingClientRect().height);
      const clamped = Math.max(0, Math.min(1, overlapFraction));
      setOverlapPx(Math.round(h * clamped));
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [overlapFraction]);

  return (
    <div
      className={className}
      style={
        overlapPx > 0
          ? {
              marginTop: -(overlapPx + extraNegativeMarginTopPx),
              marginBottom: -(overlapPx + extraNegativeMarginBottomPx),
            }
          : undefined
      }
    >
      <div ref={measureRef}>{children}</div>
    </div>
  );
}
