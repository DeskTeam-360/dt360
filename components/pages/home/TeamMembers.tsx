"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { teamMembers } from "@/data/home";
import { cn } from "@/lib/utils";

/** ~ card width (280) + gap between cards */
const SCROLL_STEP = 312;

function centerHorizontalScroll(el: HTMLDivElement | null) {
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  if (max <= 0) return;
  el.scrollLeft = max / 2;
}

type MouseDragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
};

export function TeamMembers() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const mouseDragRef = useRef<MouseDragState | null>(null);
  const [mouseDragging, setMouseDragging] = useState(false);

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

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });
  }, []);

  /** Default view starts centered on the members row, not from the left. */
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const apply = () => centerHorizontalScroll(el);

    apply();
    const raf = requestAnimationFrame(apply);

    const ro = new ResizeObserver(apply);
    ro.observe(el);

    const onResize = () => apply();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
  }, []);

  const onScrollerPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    endMouseDrag(el, e.pointerId);
  }, [endMouseDrag]);

  const onScrollerLostPointerCapture = useCallback(() => {
    mouseDragRef.current = null;
    setMouseDragging(false);
  }, []);

  return (
    <section
      id="team"
      className="overflow-x-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="team-heading"
    >
      <Container className="max-w-7xl">
        <h2
          id="team-heading"
          className="text-center font-bold tracking-tight"
        >
          <span className="text-[#0b0d2a]">Team </span>
          <span className="bg-gradient-to-r from-[#e4277a] to-[#ff4d8d] bg-clip-text text-transparent">
            Members
          </span>
        </h2>
      </Container>

      {/* Full-bleed slider: di bawah 1440px padding = setengah kartu di tepi + snap center; ≥1440px padding lebih kecil agar lebih banyak kartu penuh terlihat */}
      <div
        className={cn(
          "relative mt-12 w-screen max-w-[100vw] shrink-0 -translate-x-1/2 left-1/2 lg:mt-14",
        )}
      >
        <button
          type="button"
          onClick={() => scrollByDir(-1)}
          className="absolute left-3 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/50 hover:text-zinc-600 min-[1440px]:left-6 md:flex sm:h-14 sm:w-10"
          aria-label="Show previous team members"
        >
          <ChevronLeft className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollByDir(1)}
          className="absolute right-3 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/50 hover:text-zinc-600 min-[1440px]:right-6 md:flex sm:h-14 sm:w-10"
          aria-label="Show next team members"
        >
          <ChevronRight className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          className={cn(
            "team-members-scroller-peek flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden",
            // Desktop: klik–geser horizontal (mouse); sentuh tetap native (pointerType touch diabaikan)
            "cursor-grab select-none",
            mouseDragging && "cursor-grabbing snap-none",
            // ≥1440px: padding horizontal lebih kecil → lebih banyak kartu penuh terlihat
            "min-[1440px]:px-10 min-[1440px]:scroll-pl-10 min-[1440px]:scroll-pr-10 xl:px-14 xl:scroll-pl-14 xl:scroll-pr-14 2xl:px-20 2xl:scroll-pl-20 2xl:scroll-pr-20",
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
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="w-[min(100%,280px)] shrink-0 snap-center sm:w-[280px]"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                  {/* Photo fills the whole tile; label sits above the image layer */}
                  <div className="absolute inset-0 z-[1] overflow-hidden">
                    <SafeImage
                      src={member.imageSrc}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      className="object-cover object-left-bottom scale-100"
                      sizes="(max-width: 640px) 85vw, 280px"
                      priority={member.id === "1"}
                    />
                  </div>
                  {/* Overlay chip nama | role (di atas foto, z-[2]); warna per anggota dari `labelClass` di data */}
                  <div
                    className={cn(
                      // Chip menempel kiri bawah; sudut kanan atas membulat
                      "absolute left-0 bottom-2 z-[2] max-w-[min(100%,18rem)] rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-[1.35rem] px-3 py-2 pl-3 pr-4 sm:bottom-3 sm:rounded-tr-[1.75rem] sm:py-2.5 sm:pr-5",
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
