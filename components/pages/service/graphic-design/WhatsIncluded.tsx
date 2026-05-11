"use client";

import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";

const includedItems = [
  "Ad creatives for Facebook, Instagram, Google, and LinkedIn",
  "Social media graphics - feed posts, carousels, stories, reels covers",
  "Logos and branding materials",
  "Ebooks, lead magnets, and workbooks",
  "Brand guideline decks and visual identity refreshes",
  "Sales page graphics, banner sets, and display ads",
  "Podcast covers, YouTube thumbnails, and web assets",
  "Presentation slides, event collateral, and print-ready files",
];

export function WhatsIncluded() {
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(includedItems.length / itemsPerPage);
  const visibleItems = useMemo(
    () => includedItems.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage),
    [pageIndex],
  );

  useEffect(() => {
    if (totalPages <= 1) return;
    const timerId = window.setInterval(() => {
      setPageIndex((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => window.clearInterval(timerId);
  }, [totalPages]);

  return (
    <div className="relative overflow-hidden bg-transparent py-10 text-white sm:py-14 xl:py-18 2xl:py-24">
      <SafeImage
        src="/images/Service - Ellipse Blue.png"
        alt=""
        width={460}
        height={460}
        className="pointer-events-none absolute -right-24 top-1/2 z-[1] hidden h-auto w-[320px] -translate-y-1/2 rotate-180 opacity-85 xl:block"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,47,179,0.16),transparent_45%)]" aria-hidden />
      <Container className="relative z-10 max-w-[1440px] !px-10 xl:!px-20">
        <div className="grid grid-cols-1 items-start gap-x-16 gap-y-12 sm:gap-y-16 xl:grid-cols-2 xl:gap-x-28 xl:gap-y-24 2xl:gap-x-32 2xl:gap-y-28">
          <h2 className="type-rule-h2 col-span-full w-full max-w-none min-w-0 leading-tight text-white xl:max-w-2xl xl:leading-[1.02]">
            We Handle All of Your <span className="text-[#f6b22e]">Graphic Design</span> Needs
          </h2>
          <div className="flex w-full justify-center">
            <SafeImage
              src="/images/Service - Graphic Whats Included.png"
              alt="Graphic design workstation illustration"
              width={760}
              height={620}
              className="h-auto w-full max-w-[620px]"
            />
          </div>
          <div className="w-full min-w-0 space-y-3 sm:space-y-4">
            {visibleItems.map((item) => (
              <div
                key={item}
                className="relative rounded-2xl border border-white/20 bg-white/8 py-3 pl-14 pr-3 backdrop-blur-[2px] sm:py-4 sm:pl-16 sm:pr-4"
              >
                <SafeImage
                  src="/images/Service - Checklist.png"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute left-[-18px] top-1/2 h-[40px] w-[40px] -translate-y-1/2"
                />
                <p className="type-rule-h5 leading-relaxed text-white/95 xl:leading-tight">
                  {item}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-center gap-2 pt-2">
              {Array.from({ length: totalPages }).map((_, dotIndex) => (
                <button
                  key={`dot-${dotIndex}`}
                  type="button"
                  onClick={() => setPageIndex(dotIndex)}
                  aria-label={`Show list page ${dotIndex + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    pageIndex === dotIndex ? "bg-[#F5B419]" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
