"use client";

import { useEffect, useRef, useState } from "react";
import { SafeImage } from "@/components/shared/SafeImage";
import type { HowItWorksDontItem } from "@/data/howItWorks";

const CARD_WIDTH_CLASS = "w-[15em]";
/** 40px top + 40px bottom spacing around the description */
const DESC_VERTICAL_SPACING_PX = 80;
const DESC_TEXT_CLASS =
  "text-pretty text-[16px] font-medium leading-[1.45] text-white/90";

function DontScopeCard({
  item,
  cardHeight,
}: {
  item: HowItWorksDontItem;
  cardHeight: string | null;
}) {
  const borderGradient = `linear-gradient(${item.borderGradientDeg}deg, #FB3A1E 0%, #e3058d 33%, #7547c5 100%)`;
  const sizeStyle = cardHeight ? { height: cardHeight, width: "15em" } : undefined;

  return (
    <div
      className={`group relative shrink-0 [perspective:1200px] ${CARD_WIDTH_CLASS} ${cardHeight ? "" : "h-[15em]"}`}
      style={sizeStyle}
    >
      {/* Flip wrapper: rotates on hover/focus; icon & X overlays sit outside and stay fixed */}
      <div
        tabIndex={0}
        className="relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:duration-0"
      >
        {/* Front face — label */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <div
            className="flex h-full w-full flex-col overflow-hidden rounded-[60px] p-px shadow-[0_0_20px_-6px_rgba(236,72,153,0.35)]"
            style={{ background: borderGradient }}
          >
            <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center gap-y-4 rounded-[59px] bg-[#02063B] px-2.5 py-7 text-center">
              <h3 className="text-balance text-[18px] font-bold leading-snug tracking-tight text-white">
                {item.label}
              </h3>
            </div>
          </div>
        </div>

        {/* Back face — description */}
        <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div
            className="flex h-full w-full flex-col overflow-hidden rounded-[60px] p-px shadow-[0_0_20px_-6px_rgba(236,72,153,0.35)]"
            style={{ background: borderGradient }}
          >
            <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center rounded-[59px] bg-[#02063B] px-5 pt-10 pb-10 text-center">
              <p className={DESC_TEXT_CLASS}>{item.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* X — outside the flip wrapper so it stays intact and does not rotate */}
      <span
        className="pointer-events-none absolute bottom-0 left-1/2 z-[99] flex size-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#e11d48] text-[3rem] font-bold leading-none text-white shadow-md"
        aria-hidden
      >
        ×
      </span>
      {/* Icon — white ring, overlaps top border */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[98] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-solid border-white bg-[#02063B] p-2 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
        <SafeImage
          src={item.iconSrc}
          alt={item.iconAlt}
          width={75}
          height={75}
          className="h-[75px] w-[75px] object-contain"
        />
      </div>
    </div>
  );
}

export function HowItWorksDontCards({ items }: { items: HowItWorksDontItem[] }) {
  const sizerRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<string | null>(null);

  useEffect(() => {
    const measure = () => {
      const sizer = sizerRef.current;
      if (!sizer) return;

      const descriptions = sizer.querySelectorAll<HTMLElement>("[data-measure-description]");
      let maxDescriptionText = 0;
      descriptions.forEach((el) => {
        maxDescriptionText = Math.max(maxDescriptionText, el.offsetHeight);
      });

      const descriptionMinHeight = maxDescriptionText + DESC_VERTICAL_SPACING_PX;

      const labelBlocks = sizer.querySelectorAll<HTMLElement>("[data-measure-label]");
      let maxLabel = 0;
      labelBlocks.forEach((el) => {
        maxLabel = Math.max(maxLabel, el.offsetHeight);
      });

      const fallbackPx =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 15;
      setCardHeight(`${Math.max(descriptionMinHeight, maxLabel, fallbackPx)}px`);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (sizerRef.current) observer.observe(sizerRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  return (
    <div className="relative">
      {/* Hidden sizer — same width & typography as card faces */}
      <div
        ref={sizerRef}
        className={`pointer-events-none invisible absolute left-0 top-0 -z-10 ${CARD_WIDTH_CLASS}`}
        aria-hidden
      >
        {items.map((item) => (
          <p
            key={item.id}
            data-measure-description
            className={`px-8 text-center ${DESC_TEXT_CLASS}`}
          >
            {item.description}
          </p>
        ))}
        {items.map((item) => (
          <div key={`label-${item.id}`} data-measure-label className="px-2.5 py-7 text-center">
            <h3 className="text-balance text-[18px] font-bold leading-snug tracking-tight text-white">
              {item.label}
            </h3>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-y-[2.875rem] max-md:gap-y-24 md:gap-y-[4.025rem]">
        <div className="flex flex-wrap justify-center gap-x-[1.54rem] gap-y-24 md:gap-[1.925rem]">
          {items.slice(0, 3).map((item) => (
            <DontScopeCard key={item.id} item={item} cardHeight={cardHeight} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-x-[1.54rem] gap-y-24 md:gap-[1.925rem]">
          {items.slice(3).map((item) => (
            <DontScopeCard key={item.id} item={item} cardHeight={cardHeight} />
          ))}
        </div>
      </div>
    </div>
  );
}
