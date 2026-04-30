"use client";

import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { SocialProofTestimonial } from "@/data/home";
import { cn } from "@/lib/utils";

type Props = {
  items: SocialProofTestimonial[];
};

function TestimonialSlideCard({ item }: { item: SocialProofTestimonial }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-[#EFEFEF] px-6 pb-8 pt-14 shadow-sm sm:px-8 sm:pb-10 sm:pt-16">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 text-[5.5rem] font-serif leading-none text-[#D8D8D8] sm:text-[6.5rem]"
        aria-hidden
      >
        &ldquo;
      </div>
      <div className="relative z-[1] grid gap-6 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-start sm:gap-8">
        <div className="mx-auto aspect-square w-full max-w-[11rem] overflow-hidden rounded-2xl sm:mx-0">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            width={320}
            height={320}
            className="h-full w-full object-cover"
            sizes="(max-width: 1440px) 60vw, 28vw"
          />
        </div>
        <div className="min-w-0 pt-0 sm:pt-1">
          <p className="text-base leading-relaxed text-[#2a2f61] sm:text-lg">{item.quote}</p>
          <p className="mt-4 text-base font-bold text-[#101651] sm:text-lg">{item.attribution}</p>
        </div>
      </div>
    </div>
  );
}

/** Jarak antar slot slide — harus sama dengan `gap-*` di flex (narrow). */
const SLIDE_GAP = "1rem"; /* = Tailwind gap-4 */

function subscribeWideMode(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(min-width: 1441px)");
  mq.addEventListener("change", onStoreChange);
  window.addEventListener("resize", onStoreChange);
  return () => {
    mq.removeEventListener("change", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function getWideModeSnapshot() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1441px)").matches;
}

function getWideModeServerSnapshot() {
  return false;
}

/**
 * Strip triple + anchor index untuk loop tanpa loncat besar.
 * Narrow: peek 20/60/20; wide: tiga kolom penuh + geser.
 */
export function SocialProofTestimonialCarousel({ items }: Props) {
  const count = items.length;

  const isWide = useSyncExternalStore(
    subscribeWideMode,
    getWideModeSnapshot,
    getWideModeServerSnapshot,
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [wideMetrics, setWideMetrics] = useState<{ slideW: number; gapPx: number } | null>(null);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el || !isWide) {
      setWideMetrics(null);
      return;
    }

    const measure = () => {
      const w = el.getBoundingClientRect().width;
      const track = el.querySelector<HTMLElement>("[data-carousel-track]");
      let gapPx = 16;
      if (track) {
        const g = getComputedStyle(track).gap;
        const parsed = parseFloat(g);
        if (!Number.isNaN(parsed)) gapPx = parsed;
      }
      const slideW = Math.max(0, (w - 2 * gapPx) / 3);
      setWideMetrics({ slideW, gapPx });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isWide]);

  const loopedPattern = useMemo((): SocialProofTestimonial[] => {
    if (count === 0) return [];
    if (count === 1) {
      const only = items[0]!;
      return [only, only, only];
    }
    return [items[count - 1]!, ...items, items[0]!];
  }, [count, items]);

  const L = loopedPattern.length;

  const extendedSlides = useMemo(() => {
    if (loopedPattern.length === 0) return [];
    return [...loopedPattern, ...loopedPattern, ...loopedPattern];
  }, [loopedPattern]);

  const [anchor, setAnchor] = useState(0);
  const [jumping, setJumping] = useState(false);

  useLayoutEffect(() => {
    if (L <= 0) return;
    const id = requestAnimationFrame(() => {
      setAnchor(L);
    });
    return () => cancelAnimationFrame(id);
  }, [L]);

  useLayoutEffect(() => {
    if (!jumping) return;
    const id = requestAnimationFrame(() => {
      setJumping(false);
    });
    return () => cancelAnimationFrame(id);
  }, [jumping]);

  const goPrev = useCallback(() => {
    setAnchor((a) => a - 1);
  }, []);

  const goNext = useCallback(() => {
    setAnchor((a) => a + 1);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      const a = anchor;
      if (count === 0) return;
      if (a >= L + count) {
        setJumping(true);
        setAnchor(a - count);
        return;
      }
      if (a < L) {
        setJumping(true);
        setAnchor(a + count);
      }
    },
    [anchor, L, count],
  );

  if (count === 0) return null;

  const transformNarrow = `translateX(calc(20vw - ${anchor + 1} * (60vw + ${SLIDE_GAP})))`;

  const strideWide =
    wideMetrics && wideMetrics.slideW > 0 ? wideMetrics.slideW + wideMetrics.gapPx : 0;
  const transformWide =
    strideWide > 0
      ? `translate3d(${-(anchor - L) * strideWide}px, 0, 0)`
      : "translate3d(0, 0, 0)";

  const transform = isWide ? transformWide : transformNarrow;

  const slideStyle =
    isWide && wideMetrics && wideMetrics.slideW > 0
      ? ({ width: wideMetrics.slideW, flexShrink: 0 } as const)
      : undefined;

  return (
    <div className="mt-12 sm:mt-14 lg:mt-16">
      <div className="w-full px-0 min-[1441px]:px-8 min-[1600px]:px-12">
        <div ref={viewportRef} className="relative w-full overflow-hidden">
          <div
            data-carousel-track
            className={cn(
              "flex gap-4",
              !jumping && "transition-transform duration-500 ease-out",
            )}
            style={{ transform }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((item, slideIdx) => (
              <article
                key={`${item.id}-${slideIdx}`}
                className={cn("shrink-0", !slideStyle && "w-[60vw]")}
                style={slideStyle}
                aria-roledescription="slide"
              >
                <TestimonialSlideCard item={item} />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 px-4 sm:mt-10">
        <button
          type="button"
          onClick={goPrev}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-200 text-zinc-700",
            "transition hover:bg-zinc-300/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101651]",
          )}
          aria-label="Previous testimonial"
        >
          <span className="text-lg font-semibold" aria-hidden>
            &lsaquo;
          </span>
        </button>
        <button
          type="button"
          onClick={goNext}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-[#E3058D] text-white shadow-md shadow-[#E3058D]/25",
            "transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101651]",
          )}
          aria-label="Next testimonial"
        >
          <span className="text-lg font-semibold" aria-hidden>
            &rsaquo;
          </span>
        </button>
      </div>
    </div>
  );
}
