"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { rotateProblemCards } from "@/data/home";
import { cn } from "@/lib/utils";

export function RotateProblemCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((dir: -1 | 1) => {
    setActiveIndex((i) => (i + dir + rotateProblemCards.length) % rotateProblemCards.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      id="problem-cards"
      className="relative overflow-x-hidden"
      aria-label="Outsourcing challenges"
    >
      <div className="pointer-events-none absolute inset-0 flex min-h-full flex-col" aria-hidden>
        <div className="min-h-[50%] flex-1 bg-white" />
        <div className="min-h-[50%] flex-1 bg-[#11104C]" />
      </div>

      <Container className="relative z-10 max-w-7xl px-4 py-0 sm:px-6">
        <div className="mx-auto flex w-full max-w-[min(100%,1100px)] flex-col items-center">
          <div
            className="relative w-[min(560px,calc(100vw-2rem))] shrink-0 [aspect-ratio:464/610]"
            style={{ perspective: "1400px" }}
          >
            <div
              className="relative h-full w-full [transform-style:preserve-3d]"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const start = touchStartX.current;
                touchStartX.current = null;
                if (start == null) return;
                const end = e.changedTouches[0]?.clientX;
                if (end == null) return;
                const dx = end - start;
                if (dx < -48) go(1);
                else if (dx > 48) go(-1);
              }}
            >
              {rotateProblemCards.map((card, i) => {
                const pos = (i - activeIndex + rotateProblemCards.length) % rotateProblemCards.length;
                const isCenter = pos === 0;
                const isRight = pos === 1;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      if (!isCenter) setActiveIndex(i);
                    }}
                    className={cn(
                      // backface-hidden + translateZ moderat mengurangi blur teks di layer GPU (Chrome/Edge)
                      "absolute inset-0 overflow-hidden rounded-xl border-2 border-white/95 text-left shadow-2xl shadow-black/25 outline-none transition-[transform,opacity] duration-500 ease-out [backface-visibility:hidden] focus-visible:ring-2 focus-visible:ring-[#e4277a] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      isCenter ? "z-30 cursor-default" : "z-20 cursor-pointer hover:brightness-[1.02]",
                    )}
                    style={{
                      transformOrigin: "center center",
                      transform: isCenter
                        ? "translateZ(0) rotateY(0deg) scale(1)"
                        : isRight
                          ? "translateX(62%) translateZ(-48px) rotateY(-26deg) scale(0.88)"
                          : "translateX(-62%) translateZ(-48px) rotateY(26deg) scale(0.88)",
                    }}
                    aria-label={isCenter ? undefined : `Show card: ${card.title}`}
                    aria-current={isCenter ? "true" : undefined}
                  >
                    <span className="pointer-events-none absolute inset-0 z-0">
                      <Image
                        src={card.imageSrc}
                        alt=""
                        fill
                        className="object-cover object-bottom"
                        sizes="(max-width: 640px) 92vw, 560px"
                        priority={i === 0}
                      />
                    </span>
                    <span
                      className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:from-black/45"
                      aria-hidden
                    />
                    <span
                      className="relative z-[2] flex h-full max-h-full flex-col justify-end overflow-y-auto p-6 sm:p-8 sm:pb-9 lg:max-w-[58%] [transform:translate3d(0,0,0.1px)] antialiased"
                      aria-hidden={!isCenter}
                    >
                      <span className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-[2rem] sm:leading-[1.08] lg:text-[2.25rem] lg:leading-[1.06]">
                        {card.title}
                      </span>
                      <span className="mt-5 text-pretty text-[0.9375rem] font-normal leading-[1.55] text-white sm:mt-6 sm:text-base sm:leading-[1.5] lg:mt-7 lg:text-[1.0625rem] lg:leading-[1.5]">
                        {card.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 z-40 hidden size-11 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-xl border border-white/40 bg-white/90 text-[#11104C] shadow-md transition hover:bg-white md:flex lg:-translate-x-3"
              aria-label="Previous card"
            >
              <ChevronLeft className="size-5" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 z-40 hidden size-11 -translate-y-1/2 translate-x-1 items-center justify-center rounded-xl border border-white/40 bg-white/90 text-[#11104C] shadow-md transition hover:bg-white md:flex lg:translate-x-3"
              aria-label="Next card"
            >
              <ChevronRight className="size-5" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
