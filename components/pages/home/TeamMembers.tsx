"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { teamMembers } from "@/data/home";
import { cn } from "@/lib/utils";

/** ~ lebar kartu (280) + gap antar kartu */
const SCROLL_STEP = 312;

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
            className="absolute left-0 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/50 hover:text-zinc-600 md:flex sm:h-14 sm:w-10 lg:-left-2"
            aria-label="Show previous team members"
          >
            <ChevronLeft className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-12 w-9 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/50 bg-white/40 text-zinc-500 shadow-sm backdrop-blur-md transition hover:bg-white/50 hover:text-zinc-600 md:flex sm:h-14 sm:w-10 lg:-right-2"
            aria-label="Show next team members"
          >
            <ChevronRight className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
          </button>

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Team member cards"
          >
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="w-[min(100%,280px)] shrink-0 snap-center sm:w-[280px]"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                  {/* Foto memenuhi seluruh kotak; label di atas lapisan gambar */}
                  <div className="absolute inset-0 z-[1] overflow-hidden">
                    <SafeImage
                      src={member.imageSrc}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      className="origin-center object-cover object-center scale-[1.08]"
                      sizes="(max-width: 640px) 85vw, 280px"
                      priority={member.id === "1"}
                    />
                  </div>
                  <div
                    className={cn(
                      // Chip menempel kiri; jarak hanya dari bawah; sudut kanan atas membulat
                      "absolute left-0 bottom-2 z-[2] max-w-[min(100%,18rem)] rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-[1.35rem] px-3 py-2 pl-3 pr-4 sm:bottom-3 sm:rounded-tr-[1.75rem] sm:py-2.5 sm:pr-5",
                      member.labelClass,
                    )}
                  >
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.18)] sm:text-xs">
                      <span>{member.name}</span>
                      <span className="mx-2 font-normal text-white" aria-hidden>
                        |
                      </span>
                      <span className="inline sm:whitespace-nowrap">{member.role}</span>
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
