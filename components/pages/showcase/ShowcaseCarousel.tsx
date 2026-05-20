"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShowcaseItem } from "@/data/showcase";
import { ImageLightbox } from "@/components/shared/ImageLightbox";

const CARD_W = 520;
const CARD_H = 380;

type Position = "far-left" | "left" | "center" | "right" | "far-right" | "hidden";

function getPosition(offset: number): Position {
  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === -1) return "left";
  if (offset === 2) return "far-right";
  if (offset === -2) return "far-left";
  return "hidden";
}

const positionStyles: Record<Position, { transform: string; zIndex: number; opacity: number }> = {
  center:      { transform: "translateX(0%) scale(1)",          zIndex: 30, opacity: 1 },
  right:       { transform: "translateX(58%) scale(0.82)",      zIndex: 20, opacity: 1 },
  left:        { transform: "translateX(-58%) scale(0.82)",     zIndex: 20, opacity: 1 },
  "far-right": { transform: "translateX(108%) scale(0.68)",     zIndex: 10, opacity: 0.7 },
  "far-left":  { transform: "translateX(-108%) scale(0.68)",    zIndex: 10, opacity: 0.7 },
  hidden:      { transform: "translateX(0%) scale(0.5)",        zIndex: 0,  opacity: 0 },
};

type Props = {
  items: ShowcaseItem[];
};

export function ShowcaseCarousel({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (count === 0) return;
      setActiveIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const visibleCards = useMemo(() => {
    if (count === 0) return [];
    return items.map((item, i) => {
      let offset = i - activeIndex;
      if (offset > Math.floor(count / 2)) offset -= count;
      if (offset < -Math.floor(count / 2)) offset += count;
      const position = getPosition(offset);
      return { item, index: i, offset, position };
    });
  }, [items, activeIndex, count]);

  if (count === 0) return null;

  return (
    <div className="relative w-full">
      <div
        className="relative mx-auto overflow-visible"
        style={{
          width: CARD_W,
          height: CARD_H,
          maxWidth: "calc(100vw - 2rem)",
          perspective: "1400px",
        }}
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
          {visibleCards.map(({ item, index, position }) => {
            const style = positionStyles[position];
            const isCenter = position === "center";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (!isCenter) setActiveIndex(index);
                  else setSelectedItem(item);
                }}
                className={cn(
                  "absolute inset-0 overflow-hidden rounded-2xl shadow-xl shadow-black/15 outline-none transition-all duration-500 ease-out [backface-visibility:hidden]",
                  isCenter
                    ? "z-30 cursor-pointer ring-0"
                    : "cursor-pointer hover:brightness-105",
                  position === "hidden" && "pointer-events-none",
                )}
                style={{
                  transformOrigin: "center center",
                  transform: style.transform,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                }}
                aria-label={isCenter ? item.title : `Show: ${item.title}`}
                aria-current={isCenter ? "true" : undefined}
                tabIndex={position === "hidden" ? -1 : 0}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes={`(max-width: 640px) 92vw, ${CARD_W}px`}
                  priority={index === 0}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-[#11104C]/15 bg-white text-[#11104C] shadow-sm transition hover:bg-gray-50 hover:shadow-md cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex size-10 items-center justify-center rounded-full border border-[#11104C]/15 bg-white text-[#11104C] shadow-sm transition hover:bg-gray-50 hover:shadow-md cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      )}

      <ImageLightbox
        isOpen={!!selectedItem}
        src={selectedItem?.image || ""}
        alt={selectedItem?.title || ""}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
