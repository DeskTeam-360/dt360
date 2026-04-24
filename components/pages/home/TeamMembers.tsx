"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { Container } from "@/components/shared/Container";
import { teamMembers } from "@/data/home";
import { cn } from "@/lib/utils";

const SCROLL_STEP = 340;

export function TeamMembers() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * SCROLL_STEP, behavior: "smooth" });
  }, []);

  return (
    <section
      id="team"
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="team-heading"
    >
      <Container className="max-w-7xl">
        <h2
          id="team-heading"
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]"
        >
          <span className="text-[#0b0d2a]">Team </span>
          <span className="bg-gradient-to-r from-[#e4277a] to-[#ff4d8d] bg-clip-text text-transparent">
            Members
          </span>
        </h2>

        <div className="relative mt-12 lg:mt-14">
          <button
            type="button"
            onClick={() => scrollByDir(-1)}
            className="absolute left-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-600 shadow-md backdrop-blur transition hover:bg-white hover:text-zinc-900 md:flex lg:-left-2"
            aria-label="Show previous team members"
          >
            <Chevron className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            className="absolute right-0 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-600 shadow-md backdrop-blur transition hover:bg-white hover:text-zinc-900 md:flex lg:-right-2"
            aria-label="Show next team members"
          >
            <Chevron />
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Team member cards"
          >
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="w-[min(100%,280px)] shrink-0 snap-center sm:w-[260px]"
              >
                <div
                  className={cn(
                    "relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5",
                    member.accentClass,
                  )}
                >
                  <div className="absolute inset-2 overflow-hidden rounded-xl bg-zinc-900/10">
                    <div className="relative h-full w-full">
                      <Image
                        src={member.imageSrc}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        className="object-cover object-top"
                        sizes="280px"
                        priority={member.id === "1"}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 rounded-lg bg-black/45 px-3 py-2 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white">
                      {member.name}
                      <span className="mx-1.5 text-white/50">|</span>
                      {member.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
