"use client";

import { useMemo, useState } from "react";
import { SafeImage } from "@/components/shared/SafeImage";
import { showcaseHeroContent } from "@/data/showcase";
import type { ShowcaseItem } from "@/data/showcase";
import { cn } from "@/lib/utils";
import { ShowcaseCarousel } from "./ShowcaseCarousel";

type Props = {
  categories: string[];
  itemsByCategory: Record<string, ShowcaseItem[]>;
  allItems: ShowcaseItem[];
};

export function ShowcaseHero({ categories, itemsByCategory, allItems }: Props) {
  const { titleLine1, titleLine2, description } = showcaseHeroContent;
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? "All Work");

  const filteredItems = useMemo(() => {
    return itemsByCategory[activeCategory] ?? allItems.slice(0, 5);
  }, [activeCategory, itemsByCategory, allItems]);

  return (
    <section
      id="showcase-hero"
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-[#11104C]"
      aria-labelledby="showcase-hero-heading"
    >
      {/* Radial washes — di level section supaya bisa overlap keluar max-w container */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_100%_0%,rgba(227,5,141,0.42)_0%,rgba(227,5,141,0.12)_42%,transparent_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_0%_50%,rgba(0,200,244,0.4)_0%,rgba(0,200,244,0.1)_40%,transparent_70%)]" />
      </div>

      {/* Frame desain 1440px */}
      <div className="relative z-0 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-center px-4 pt-[100px] pb-0 sm:px-8 lg:px-12 xl:px-14 min-[1440px]:px-20">

        {/* Gambar samping */}
        <div
          className="pointer-events-none absolute z-[1] left-[-12%] top-[6%] w-[min(42vw,22rem)] sm:left-[-10%] sm:top-[7%] sm:w-[min(38vw,24rem)] lg:left-[-8%] lg:w-full lg:max-w-[307px] min-[1440px]:left-[-140px] min-[1440px]:top-[72px]"
          aria-hidden
        >
          <SafeImage
            src="/images/showcase-hero-bgleft-1.png"
            alt=""
            width={400}
            height={480}
            className="h-auto w-full object-contain select-none"
          />
        </div>
        <div
          className="pointer-events-none absolute z-[1] right-[-12%] top-[14%] w-[min(44vw,23rem)] sm:right-[-10%] sm:top-[15%] sm:w-[min(40vw,25rem)] lg:right-[-8%] lg:w-full lg:max-w-[396px] min-[1440px]:right-[-160px] min-[1440px]:top-[140px]"
          aria-hidden
        >
          <SafeImage
            src="/images/showcase-hero-bgright-1.png"
            alt=""
            width={440}
            height={500}
            className="h-auto w-full object-contain select-none"
          />
        </div>

        {/* Konten teks */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-12 text-center">
          <h1 id="showcase-hero-heading" className="type-rule-h1 text-balance text-[#11104C]">
            <span className="block tracking-tight">{titleLine1}</span>
            <span className="mt-2 block tracking-tight lg:mt-3">{titleLine2}</span>
          </h1>
          <p className="type-rule-p mx-auto mt-10 w-full max-w-[590px] text-pretty text-[#11104C]/90">
            {description}
          </p>

          {/* Filter buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200",
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#E3058D] to-[#E3058D] text-white shadow-md"
                    : "border border-[#11104C]/20 bg-white text-[#11104C] hover:border-[#11104C]/40 hover:shadow-sm"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase carousel */}
        <div className="relative z-10 w-full pb-16">
          <ShowcaseCarousel items={filteredItems} />
        </div>
      </div>

      {/* Arc divider */}
      <div className="relative z-10 w-full" aria-hidden>
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
