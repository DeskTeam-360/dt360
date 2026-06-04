"use client";

import { useMemo } from "react";
import { ShowcaseSafeImage } from "@/components/pages/showcase/shared/ShowcaseSafeImage";
import { showcaseHeroContent } from "@/data/showcase";
import type { ShowcaseItem } from "@/data/showcase";
import { cn } from "@/lib/utils";
import { ShowcaseCarousel } from "./ShowcaseCarousel";

type Props = {
  categories: string[];
  itemsByCategory: Record<string, ShowcaseItem[]>;
  allItems: ShowcaseItem[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

export function ShowcaseHero({
  categories,
  itemsByCategory,
  allItems,
  activeCategory,
  onCategoryChange,
}: Props) {
  const { titleLine1, titleLine2, description } = showcaseHeroContent;

  const filteredItems = useMemo(() => {
    const list = itemsByCategory[activeCategory] ?? allItems;
    return list.slice(0, 5);
  }, [activeCategory, itemsByCategory, allItems]);

  return (
    <section
      id="showcase-hero"
      className="relative isolate min-h-0 overflow-x-clip overflow-y-visible text-[#11104C] lg:min-h-screen"
      aria-labelledby="showcase-hero-heading"
    >
      {/* White + radial washes — forced behind decor & content */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_100%_0%,rgba(227,5,141,0.42)_0%,rgba(227,5,141,0.12)_42%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_0%_50%,rgba(0,200,244,0.4)_0%,rgba(0,200,244,0.1)_40%,transparent_70%)]" />
      </div>

      {/* 1440px design frame */}
      <div className="relative z-0 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center px-5 pb-0 pt-30 sm:px-8 sm:pt-28 lg:min-h-screen lg:px-12 lg:pt-32 xl:px-14 min-[1440px]:px-20">
        {/* Side decor — inside frame; above -z-10 gradients, no opacity bleed-through */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
        >
          <div className="absolute left-[-12%] top-[10%] w-[min(42vw,22rem)] sm:left-[-10%] sm:top-[7%] sm:w-[min(38vw,24rem)] lg:left-[-8%] lg:w-full lg:max-w-[307px] min-[1440px]:left-[-140px] min-[1440px]:top-[72px]">
            <ShowcaseSafeImage
              src="/images/showcase-hero-bgleft-1.png"
              alt=""
              width={400}
              height={480}
              sizes="(max-width: 1024px) 40vw, 307px"
              className="h-auto w-full object-contain select-none"
              aria-hidden
            />
          </div>
          <div className="absolute right-[-12%] top-[14%] w-[min(44vw,23rem)] sm:right-[-10%] sm:top-[15%] sm:w-[min(40vw,25rem)] lg:right-[-8%] lg:w-full lg:max-w-[396px] min-[1440px]:right-[-160px] min-[1440px]:top-[140px]">
            <ShowcaseSafeImage
              src="/images/showcase-hero-bgright-1.png"
              alt=""
              width={440}
              height={500}
              sizes="(max-width: 1024px) 44vw, 396px"
              className="h-auto w-full object-contain select-none"
              aria-hidden
            />
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-[2] flex flex-1 flex-col items-center justify-center py-8 text-center sm:py-12">
          <h1 id="showcase-hero-heading" className="type-rule-h1 text-balance text-[#11104C]">
            <span className="block tracking-tight">{titleLine1}</span>
            <span className="mt-2 block tracking-tight lg:mt-3">{titleLine2}</span>
          </h1>
          <p className="type-rule-p mx-auto mt-6 w-full max-w-[590px] text-pretty text-[#11104C]/90 sm:mt-10">
            {description}
          </p>

          {/* Filter buttons — mobile: 2-col for first 6, then full-width; md+: flex wrap */}
          <div className="mt-8 flex w-full min-w-0 flex-wrap items-center justify-center gap-3 sm:mt-10 max-md:mx-auto max-md:grid max-md:w-full max-md:max-w-[min(100%,22rem)] max-md:grid-cols-2 max-md:gap-3 md:max-w-none">
            {categories.map((cat, index) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "box-border min-w-0 max-w-full cursor-pointer rounded-full px-4 py-2.5 text-center text-sm font-bold leading-snug break-words whitespace-normal transition-all duration-200 max-md:w-full md:px-6 md:w-auto",
                  index === 0 && "max-md:col-span-2 max-md:justify-self-center",
                  index >= 7 && "max-md:col-span-2",
                  activeCategory === cat
                    ? "border border-[#E3058D] bg-[#E3058D] text-white shadow-md md:border-transparent"
                    : "border border-[#11104C] bg-white text-[#11104C] hover:shadow-sm md:border-[#11104C]/20 md:hover:border-[#11104C]/40",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase carousel */}
        <div className="relative z-[2] w-full pb-8 sm:pb-16">
          <ShowcaseCarousel items={filteredItems} />
        </div>
      </div>

      {/* Arc divider */}
      <div className="relative z-[2] w-full" aria-hidden>
        <svg
          className="block h-6 w-full"
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,24 C0,24 720,-24 1440,24 L1440,24 L0,24 Z" fill="#EEEEEE" />
        </svg>
      </div>
    </section>
  );
}
