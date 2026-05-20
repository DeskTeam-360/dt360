"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { teamMembers } from "@/data/home";
import { cn } from "@/lib/utils";

const MEMBER_COUNT = teamMembers.length;
const INITIAL_INDEX = Math.floor(MEMBER_COUNT / 2);

type MouseDragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
};

export function TeamMembers() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const mouseDragRef = useRef<MouseDragState | null>(null);
  const programmaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(INITIAL_INDEX);
  const [mouseDragging, setMouseDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);

  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  /** Posisi slide dalam track scroll (akurat di mobile/tablet). */
  const getSlideOffsetInScroller = useCallback(
    (viewport: HTMLDivElement, slide: HTMLElement) => {
      const vRect = viewport.getBoundingClientRect();
      const sRect = slide.getBoundingClientRect();
      return viewport.scrollLeft + (sRect.left - vRect.left);
    },
    [],
  );

  /** ScrollLeft agar kartu `index` berada di tengah viewport. */
  const getCenterScrollForIndex = useCallback(
    (viewport: HTMLDivElement, index: number) => {
      const slide = slideRefs.current[index];
      if (!slide) return 0;
      const slideLeft = getSlideOffsetInScroller(viewport, slide);
      return slideLeft + slide.offsetWidth / 2 - viewport.clientWidth / 2;
    },
    [getSlideOffsetInScroller],
  );

  /** Batas scroll: kartu pertama & terakhir ter-center — tidak masuk spacer kosong. */
  const getScrollBounds = useCallback(
    (viewport: HTMLDivElement) => {
      const min = Math.max(0, getCenterScrollForIndex(viewport, 0));
      const max = Math.max(min, getCenterScrollForIndex(viewport, MEMBER_COUNT - 1));
      return { min, max };
    },
    [getCenterScrollForIndex],
  );

  const clampScrollLeft = useCallback(
    (el: HTMLDivElement) => {
      const { min, max } = getScrollBounds(el);
      if (el.scrollLeft < min) el.scrollLeft = min;
      if (el.scrollLeft > max) el.scrollLeft = max;
    },
    [getScrollBounds],
  );

  const findNearestIndex = useCallback((viewport: HTMLDivElement) => {
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, slideIndex) => {
      if (!slide) return;
      const slideLeft = getSlideOffsetInScroller(viewport, slide);
      const slideCenter = slideLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = slideIndex;
      }
    });

    return nearestIndex;
  }, [getSlideOffsetInScroller]);

  const scrollToIndex = useCallback(
    (targetIndex: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = scrollerRef.current;
      const slide = slideRefs.current[targetIndex];
      if (!viewport || !slide) return;

      const index = Math.max(0, Math.min(targetIndex, MEMBER_COUNT - 1));
      const { min, max } = getScrollBounds(viewport);
      const desiredLeft = getCenterScrollForIndex(viewport, index);

      programmaticScrollRef.current = true;
      viewport.scrollTo({
        left: Math.min(Math.max(min, desiredLeft), max),
        behavior,
      });
      setActiveIndex(index);
    },
    [getCenterScrollForIndex, getScrollBounds],
  );

  const onScrollSettled = useCallback(() => {
    const viewport = scrollerRef.current;
    if (!viewport) return;

    clampScrollLeft(viewport);
    if (programmaticScrollRef.current) return;

    const nearest = findNearestIndex(viewport);
    const { min, max } = getScrollBounds(viewport);
    const current = viewport.scrollLeft;

    if (current < min - 2 || current > max + 2) {
      scrollToIndex(nearest, "auto");
      return;
    }

    if (nearest !== activeIndexRef.current) {
      setActiveIndex(nearest);
    }
  }, [findNearestIndex, clampScrollLeft, getScrollBounds, scrollToIndex]);

  const onScrollEnd = useCallback(() => {
    programmaticScrollRef.current = false;
    onScrollSettled();
  }, [onScrollSettled]);

  const scheduleScrollSettled = useCallback(() => {
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(onScrollSettled, 120);
  }, [onScrollSettled]);

  const endMouseDrag = useCallback((el: HTMLDivElement, pointerId: number) => {
    const d = mouseDragRef.current;
    if (!d || d.pointerId !== pointerId) return;
    mouseDragRef.current = null;
    setMouseDragging(false);
    try {
      el.releasePointerCapture(pointerId);
    } catch {
      /* already released */
    }
  }, []);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  /** Default view: kartu tengah ter-center; resize mengikuti index aktif tanpa reset ke max/2. */
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const apply = () => {
      scrollToIndex(activeIndexRef.current, "auto");
    };

    apply();
    const raf = requestAnimationFrame(apply);

    const ro = new ResizeObserver(() => apply());
    ro.observe(el);

    const onResize = () => apply();
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      clampScrollLeft(el);
      scheduleScrollSettled();
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    el.addEventListener("scrollend", onScrollEnd);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
    };
  }, [scrollToIndex, scheduleScrollSettled, onScrollSettled, onScrollEnd, clampScrollLeft]);

  const onScrollerPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth + 1) return;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      return;
    }
    mouseDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
    };
    setMouseDragging(true);
  }, []);

  const onScrollerPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = mouseDragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = d.startScrollLeft - (e.clientX - d.startX);
    clampScrollLeft(el);
  }, [clampScrollLeft]);

  const onScrollerPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = scrollerRef.current;
      if (!el) return;
      endMouseDrag(el, e.pointerId);
      scheduleScrollSettled();
    },
    [endMouseDrag, scheduleScrollSettled],
  );

  const onScrollerLostPointerCapture = useCallback(() => {
    mouseDragRef.current = null;
    setMouseDragging(false);
  }, []);

  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= MEMBER_COUNT - 1;

  return (
    <section
      id="team"
      className="overflow-x-hidden bg-white py-16 sm:py-20 lg:py-24 mt-[-2px]"
      aria-labelledby="team-heading"
    >
      <Container className="max-w-7xl">
        <h2 id="team-heading" className="text-center tracking-tight">
          <span className="text-[#0b0d2a]">Team </span>
          <span className="bg-gradient-to-r from-[#e4277a] to-[#ff4d8d] bg-clip-text text-transparent">
            Members
          </span>
        </h2>
      </Container>

      {/* Full-bleed slider: below 1440px padding = half card at edge + snap center; ≥1440px smaller padding so more full cards show */}
      <div
        className={cn(
          "relative mt-12 w-screen max-w-[100vw] shrink-0 -translate-x-1/2 left-1/2 lg:mt-14 min-[1920px]:max-w-[1920px] min-[1920px]:mx-auto min-[1920px]:left-auto min-[1920px]:translate-x-0 min-[1920px]:w-full",
        )}
      >
        {!atStart ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/50 hover:text-zinc-600 min-[1440px]:left-6 md:flex sm:h-14 sm:w-10"
            aria-label="Show previous team members"
          >
            <ChevronLeft className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
          </button>
        ) : null}
        {!atEnd ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/50 hover:text-zinc-600 min-[1440px]:right-6 md:flex sm:h-14 sm:w-10"
            aria-label="Show next team members"
          >
            <ChevronRight className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
          </button>
        ) : null}

        <div
          ref={scrollerRef}
          className={cn(
            "team-members-scroller-peek flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-none pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden",
            "cursor-grab select-none",
            mouseDragging && "cursor-grabbing snap-none",
            "min-[1440px]:px-6 min-[1440px]:scroll-pl-6 min-[1440px]:scroll-pr-6 xl:px-10 xl:scroll-pl-10 xl:scroll-pr-10 2xl:px-14 2xl:scroll-pl-14 2xl:scroll-pr-14",
          )}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Team member cards"
          onPointerDown={onScrollerPointerDown}
          onPointerMove={onScrollerPointerMove}
          onPointerUp={onScrollerPointerUp}
          onPointerCancel={onScrollerPointerUp}
          onLostPointerCapture={onScrollerLostPointerCapture}
        >
          {teamMembers.map((member, index) => (
            <article
              key={member.id}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className="w-[min(100%,300px)] shrink-0 snap-center sm:w-[300px]"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-none bg-white">
                <div className="absolute inset-0 z-[1] overflow-hidden">
                  <SafeImage
                    src={member.imageSrc}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    className="object-cover object-left-bottom scale-100"
                    sizes="(max-width: 640px) 90vw, 300px"
                    priority={member.id === "1"}
                  />
                </div>
                <div
                  className={cn(
                    "absolute left-0 bottom-2 z-[2] max-w-[min(100%,18rem)] rounded-none px-3 py-2 pl-3 pr-4 sm:bottom-3 sm:py-2.5 sm:pr-5",
                    member.labelClass,
                  )}
                >
                  <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)] sm:text-xs">
                    <span>{member.name}</span>
                    <span className="mx-2 font-normal text-white" aria-hidden>
                      |
                    </span>
                    <span className="inline sm:whitespace-nowrap">{member.role}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
