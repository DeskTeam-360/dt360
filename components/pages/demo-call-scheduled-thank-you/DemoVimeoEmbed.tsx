"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DemoVimeoEmbedProps = {
  embedSrc: string;
  posterSrc: string;
  posterAlt: string;
  ariaLabel: string;
  className?: string;
};

/**
 * Vimeo embed with poster overlay — click to load iframe (Elementor-style).
 */
export function DemoVimeoEmbed({
  embedSrc,
  posterSrc,
  posterAlt,
  ariaLabel,
  className,
}: DemoVimeoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[20px] shadow-[0_20px_48px_rgba(17,16,76,0.14)]",
        className,
      )}
    >
      {isPlaying ? (
        <iframe
          className="absolute inset-0 size-full border-0"
          src={`${embedSrc}${embedSrc.includes("?") ? "&" : "?"}autoplay=1`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          title={ariaLabel}
        />
      ) : (
        <button
          type="button"
          className="group absolute inset-0 size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3058D] focus-visible:ring-offset-2"
          onClick={() => setIsPlaying(true)}
          aria-label={ariaLabel}
        >
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <span className="absolute inset-0 bg-[#11104C]/20 transition group-hover:bg-[#11104C]/30" aria-hidden />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-105 sm:size-[72px]">
              <Play className="ml-1 size-8 fill-[#11104C] text-[#11104C] sm:size-9" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
