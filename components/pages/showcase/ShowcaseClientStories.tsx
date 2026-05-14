"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { clientStories } from "@/data/showcase";
import { cn } from "@/lib/utils";

export function ShowcaseClientStories() {
  const [active, setActive] = useState(0);
  const story = clientStories[active]!;

  return (
    <section
      id="client-stories"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: "#11104C" }}
      aria-labelledby="client-stories-heading"
    >
      {/* Left radial — orange from bottom-left */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 -z-[1] h-[650px] w-[650px] -translate-x-[50%] translate-y-[30%] sm:h-[765px] sm:w-[765px] lg:h-[900px] lg:w-[900px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(237,141,83,0.45) 0%, rgba(244,142,80,0) 100%)",
        }}
        aria-hidden
      />
      {/* Right radial — cyan at top-right */}
      <div
        className="pointer-events-none absolute right-0 top-0 -z-[1] h-[650px] w-[650px] translate-x-[40%] -translate-y-[30%] sm:h-[765px] sm:w-[765px] lg:h-[900px] lg:w-[900px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,200,244,0.45) 0%, rgba(1,211,252,0) 100%)",
        }}
        aria-hidden
      />

      {/* Bottom-left ornament */}
      <div className="pointer-events-none absolute z-0 w-full bottom-[-10em] left-[-10em] sm:w-[50%] lg:w-[50%] lg:bottom-[-15em] lg:left-[-18em]" aria-hidden>
        <SafeImage
          src="/images/Showcase - Stories Ornament.png"
          alt=""
          width={400}
          height={400}
          className="h-auto w-full object-contain"
          sizes="200px"
        />
      </div>

      <Container className="relative z-10 max-w-7xl">
        <h2
          id="client-stories-heading"
          className="text-center tracking-tight text-white"
        >
          Behind the Work:{" "}
          <span className="bg-gradient-to-r from-[#e4277a] to-[#ff4d8d] bg-clip-text text-transparent">
            Client Stories
          </span>
        </h2>

        <div className="mx-auto mt-12 max-w-6xl sm:mt-14 lg:mt-16">
          {/* Mobile/Tablet: stack vertical; Desktop: row */}
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-5">
            {/* Highlight card */}
            <div
              className="flex h-[10em] w-full shrink-0 items-center justify-center bg-gradient-to-br from-[#a78bfa]/60 to-[#7c3aed]/40 p-6 text-center backdrop-blur-sm sm:max-w-[280px] lg:w-[200px] lg:max-w-[200px]"
              style={{ borderRadius: "50px 5px 50px 5px" }}
            >
              <p className="text-[16px] font-bold leading-snug text-white">
                {story.highlight}
              </p>
            </div>

            {/* Quote bubble */}
            <div className="relative w-full min-w-0 overflow-hidden rounded-[2.5rem] bg-[#EFEFEF] px-6 pb-8 pt-14 shadow-sm sm:px-10 sm:pb-10 sm:pt-16 lg:flex-1">
              <div
                className="pointer-events-none absolute left-1/2 top-0 z-0 flex w-[120px] -translate-x-1/2 justify-center bg-[#11104C]"
                aria-hidden
              >
                <SafeImage
                  src="/images/home-testimonial-quote1.png"
                  alt=""
                  width={120}
                  height={104}
                  className="h-auto w-[120px] max-w-[120px] object-contain object-top"
                  sizes="120px"
                />
              </div>
              <div className="relative z-[1]">
                <p className="text-center text-[16px] leading-[1.8] text-pretty text-[#2a2f61]">
                  {story.quote}
                </p>
                <p className="mt-5 text-center text-[16px] font-semibold text-[#7547C5]">
                  {story.attribution}
                </p>
              </div>
            </div>

            {/* Person photo */}
            <div className="h-[180px] w-[180px] shrink-0 overflow-hidden rounded-2xl sm:h-[200px] sm:w-[200px] lg:self-center">
              <SafeImage
                src={story.imageSrc}
                alt={story.imageAlt}
                width={400}
                height={400}
                className="h-full w-full object-cover"
                sizes="200px"
              />
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-8 flex justify-center sm:mt-10">
            <Link
              href={story.caseStudyHref}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#e4277a] to-[#c41e6a] px-6 py-3 text-[14px] font-bold text-white shadow-lg shadow-[#e4277a]/25 transition hover:brightness-110"
            >
              View Full Case Study
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l6 7-6 7M6 5l6 7-6 7" />
              </svg>
            </Link>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {clientStories.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "h-3 w-3 rounded-full transition",
                  i === active
                    ? "bg-white shadow-md"
                    : "bg-white/30 hover:bg-white/50",
                )}
                aria-label={`Show story ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
