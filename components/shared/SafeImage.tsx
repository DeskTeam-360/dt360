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
 *
 * Responsive width (`w-full` in className): scales within its container.
 * Fixed icons (explicit width/height, no `w-full`): keeps intrinsic size for flex rows.
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
  const wantsFluidWidth = Boolean(className?.includes("w-full"));
  const hasDimensions = width != null && height != null;
  const isFixedSize = !fill && hasDimensions && !wantsFluidWidth;

  return (
    <span
      className={cn(
        fill
          ? "relative block size-full"
          : isFixedSize
            ? "relative inline-block shrink-0"
            : "relative block w-full max-w-full",
      )}
    >
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
        style={fill || isFixedSize ? undefined : { width: "100%", height: "auto" }}
        onError={() => setFailed(true)}
      />
      <span
        className={cn(
          "flex items-center justify-center bg-zinc-300 text-center text-xs font-semibold uppercase tracking-wide text-zinc-600",
          fill
            ? "absolute inset-0"
            : isFixedSize
              ? "inline-flex min-h-0 min-w-0"
              : "block min-h-[120px] w-full",
          !failed && "hidden",
        )}
        style={
          isFixedSize && width != null && height != null
            ? { width, height, minWidth: width, minHeight: height }
            : undefined
        }
        role="img"
        aria-label="Image not found"
        aria-hidden={!failed}
      >
        Image not found
      </span>
    </span>
  );
}
