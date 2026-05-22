"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SafeImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

/**
 * Keeps image + fallback in the DOM (toggle visibility) to avoid React removeChild
 * errors when onError swaps node types during hydration or Fast Refresh.
 */
export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  unoptimized,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const isSvg = src.endsWith(".svg");

  return (
    <span className={cn(fill ? "relative block size-full" : "relative block w-full max-w-full")}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        unoptimized={isSvg || unoptimized}
        draggable={false}
        className={cn(className, failed && "hidden")}
        style={fill ? undefined : { width: "100%", height: "auto" }}
        onError={() => setFailed(true)}
      />
      <span
        className={cn(
          "flex items-center justify-center bg-zinc-300 text-center text-xs font-semibold uppercase tracking-wide text-zinc-600",
          fill ? "absolute inset-0" : "block min-h-[120px] w-full",
          !failed && "hidden",
        )}
        role="img"
        aria-label="Image not found"
        aria-hidden={!failed}
      >
        Image not found
      </span>
    </span>
  );
}
