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
  /** Fixed negative margin-top on mobile only (max-width: 767px), overrides calculated overlap */
  mobileNegativeMarginTopPx?: number;
  /** Fixed negative margin-bottom on mobile only (max-width: 767px), overrides calculated overlap */
  mobileNegativeMarginBottomPx?: number;
  /**
   * Below xl (&lt;1280px): no negative bottom margin — pricing stacks under cards
   * (web-design-development tablet/mobile).
   */
  disableOverlapBelowXl?: boolean;
  className?: string;
};

export function ServicesHowItWorksFloatingRow({
  children,
  overlapFraction = DEFAULT_HOW_IT_WORKS_OVERLAP_FRACTION,
  extraNegativeMarginTopPx = 0,
  extraNegativeMarginBottomPx = 0,
  mobileNegativeMarginTopPx,
  mobileNegativeMarginBottomPx,
  disableOverlapBelowXl = false,
  className,
}: Props) {
  const measureRef = useRef<HTMLDivElement>(null);
  /** Mobile & tablet: smaller negative top + full negative bottom. Desktop: same overlap top and bottom. */
  const [overlapTopPx, setOverlapTopPx] = useState(0);
  const [overlapBottomPx, setOverlapBottomPx] = useState(0);
  /** Extra pull-up on mobile so the light section meets the cards (no white strip). */
  const [mobileExtraBottomPx, setMobileExtraBottomPx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      /** getBoundingClientRect.height tracks visual bounds (cards include slight protruding assets). */
      const h = Math.ceil(el.getBoundingClientRect().height);
      const clamped = Math.max(0, Math.min(1, overlapFraction));
      const fullPx = Math.round(h * clamped);
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      setIsMobile(isMobile);
      /** Mobile, tablet & narrow desktop (&lt;1280px): less negative top. Full desktop (xl+): unified overlap. */
      const isDesktopLayout = window.matchMedia("(min-width: 1280px)").matches;
      if (disableOverlapBelowXl && !isDesktopLayout) {
        /** Mobile: no pull-up — step 1 must not cover the “How It Works” title. Tablet: light split only. */
        setOverlapTopPx(isMobile ? 0 : Math.round(h * Math.min(clamped, 0.12)));
        setOverlapBottomPx(0);
        setMobileExtraBottomPx(0);
      } else if (!isDesktopLayout) {
        setOverlapTopPx(Math.round(h * Math.min(clamped, 0.12)));
        setOverlapBottomPx(fullPx);
        setMobileExtraBottomPx(isMobile ? 140 : 0);
      } else {
        setOverlapTopPx(fullPx);
        setOverlapBottomPx(fullPx);
        setMobileExtraBottomPx(0);
      }
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    const mqXl = window.matchMedia("(min-width: 1280px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqMaxMd = window.matchMedia("(max-width: 767px)");
    mqXl.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    mqMaxMd.addEventListener("change", update);
    return () => {
      ro.disconnect();
      mqXl.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
      mqMaxMd.removeEventListener("change", update);
    };
  }, [overlapFraction, disableOverlapBelowXl]);

  const marginTopPx =
    isMobile && mobileNegativeMarginTopPx !== undefined
      ? mobileNegativeMarginTopPx
      : overlapTopPx + extraNegativeMarginTopPx;

  const marginBottomPx =
    isMobile && mobileNegativeMarginBottomPx !== undefined
      ? mobileNegativeMarginBottomPx
      : overlapBottomPx + extraNegativeMarginBottomPx + mobileExtraBottomPx;

  return (
    <div
      className={["overflow-visible", className].filter(Boolean).join(" ")}
      style={
        marginTopPx > 0 || marginBottomPx > 0
          ? {
              marginTop: -marginTopPx,
              marginBottom: -marginBottomPx,
            }
          : undefined
      }
    >
      <div ref={measureRef}>{children}</div>
    </div>
  );
}
