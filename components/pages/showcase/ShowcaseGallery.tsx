"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ShowcaseItem } from "@/data/showcase";

const ITEMS_PER_ROW = 5;
const INITIAL_ROWS = 3;
const ROWS_PER_LOAD = 2;

type Props = {
  allItems: ShowcaseItem[];
  activeCategory: string;
};

function MarqueeRow({
  items,
  direction,
  speed = 30,
}: {
  items: ShowcaseItem[];
  direction: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  const dur = items.length * speed;

  return (
    <div className="group relative overflow-hidden">
      <div
        className="flex w-max gap-4 hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-${direction} ${dur}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative h-[220px] w-[320px] flex-shrink-0 overflow-hidden rounded-xl sm:h-[260px] sm:w-[380px] lg:h-[280px] lg:w-[420px]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
              <span className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white drop-shadow-md">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShowcaseGallery({ allItems, activeCategory }: Props) {
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All Work") return allItems;
    return allItems.filter((item) => item.categories.includes(activeCategory));
  }, [allItems, activeCategory]);

  const rows = useMemo(() => {
    const result: ShowcaseItem[][] = [];
    for (let i = 0; i < filteredItems.length; i += ITEMS_PER_ROW) {
      result.push(filteredItems.slice(i, i + ITEMS_PER_ROW));
    }
    return result;
  }, [filteredItems]);

  const displayedRows = rows.slice(0, visibleRows);
  const hasMore = visibleRows < rows.length;

  if (filteredItems.length === 0) {
    return (
      <section className="bg-[#EEEEEE] py-20 text-center">
        <p className="type-rule-p text-[#11104C]/60">
          No showcase items in this category yet.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#EEEEEE] py-16 lg:py-24">
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
        {displayedRows.map((rowItems, rowIdx) => (
          <MarqueeRow
            key={`row-${rowIdx}-${activeCategory}`}
            items={rowItems}
            direction={rowIdx % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleRows((v) => v + ROWS_PER_LOAD)}
            className="rounded-full border-2 border-[#11104C] px-10 py-3 font-bold text-[#11104C] transition-all duration-200 hover:bg-[#11104C] hover:text-white"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
