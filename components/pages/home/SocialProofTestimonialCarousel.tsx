"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { SocialProofTestimonial } from "@/data/home";
import { cn } from "@/lib/utils";

type Props = {
  items: SocialProofTestimonial[];
};

export function SocialProofTestimonialCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="mt-12 w-full sm:mt-14 lg:mt-16">
      <div className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="w-full shrink-0 px-1 sm:px-2"
              aria-roledescription="slide"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#EFEFEF] px-6 pb-8 pt-14 shadow-sm sm:px-8 sm:pb-10 sm:pt-16">
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
                      sizes="(max-width: 640px) 200px, 176px"
                    />
                  </div>
                  <div className="min-w-0 pt-0 sm:pt-1">
                    <p className="text-base leading-relaxed text-[#2a2f61] sm:text-lg">{item.quote}</p>
                    <p className="mt-4 text-base font-bold text-[#101651] sm:text-lg">{item.attribution}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
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
