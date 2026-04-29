"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ServicesTestimonial } from "@/data/servicesPage";
import { cn } from "@/lib/utils";

type Props = {
  items: ServicesTestimonial[];
};

export function ServicesTestimonialsCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const count = items.length;

  const scrollToSlide = (targetIndex: number) => {
    const viewport = viewportRef.current;
    const targetSlide = slideRefs.current[targetIndex];
    if (!viewport || !targetSlide) return;

    viewport.scrollTo({
      left:
        targetSlide.offsetLeft -
        viewport.offsetLeft -
        (viewport.clientWidth - targetSlide.clientWidth) / 2,
      behavior: "smooth",
    });
    setIndex(targetIndex);
  };

  const handleScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, slideIndex) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft - viewport.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = slideIndex;
      }
    });

    if (nearestIndex !== index) setIndex(nearestIndex);
  };

  if (count === 0) return null;

  return (
    <div className="mt-12 w-full sm:mt-14 lg:mt-16">
      <div
        ref={viewportRef}
        onScroll={handleScroll}
        className="relative w-full snap-x snap-mandatory overflow-x-auto overflow-y-visible px-[7%] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-[9%] lg:px-[13%]"
      >
        <div className="flex items-stretch gap-[60px] pb-2">
          {items.map((item, slideIndex) => (
            <article
              key={item.id}
              ref={(element) => {
                slideRefs.current[slideIndex] = element;
              }}
              className="flex w-[86%] shrink-0 snap-center sm:w-[82%] lg:w-[74%]"
              aria-roledescription="slide"
            >
              <div className="relative flex h-full w-full overflow-visible rounded-[30px] bg-transparent px-6 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14">
                <Image
                  src="/images/dt360-bg-testimonials-v2.png"
                  alt=""
                  fill
                  className="pointer-events-none rounded-[30px] object-cover object-top"
                  sizes="(max-width: 640px) 86vw, (max-width: 1024px) 82vw, 74vw"
                />
                <div className="relative z-[1] grid h-full gap-8 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-center sm:gap-10">
                  <div className="mx-auto aspect-square w-full max-w-[12rem] overflow-hidden rounded-2xl bg-neutral-200 sm:mx-0">
                    {item.imageSrc ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={320}
                        height={320}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 640px) 220px, 192px"
                      />
                    ) : (
                      <div
                        className="flex h-full min-h-[12rem] w-full items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 text-center text-xs font-medium text-neutral-500"
                        role="img"
                        aria-label={item.imageAlt}
                      >
                        Foto
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 pt-0 sm:pt-2">
                    <p className="text-base leading-relaxed text-[#2a2f61] sm:text-lg">{item.quote}</p>
                    <p className="mt-5 text-base font-bold text-[#101651] sm:text-lg">{item.attribution}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3 sm:mt-12">
        {items.map((item, dotIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSlide(dotIndex)}
            className={cn(
              "h-3 w-3 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101651]",
              dotIndex === index ? "bg-[#e4277a]" : "bg-[#c6d2df] hover:bg-[#aebdd0]",
            )}
            aria-label={`Tampilkan testimonial ${dotIndex + 1}`}
            aria-current={dotIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
