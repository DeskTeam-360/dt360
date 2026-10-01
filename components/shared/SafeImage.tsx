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
  /** When true, use Next.js image optimizer (phased rollout). Default false elsewhere. */
  optimized?: boolean;
  unoptimized?: boolean;
  /** F16 — decorative images should set alt="" (aria-hidden applied automatically). */
  "aria-hidden"?: boolean | "true" | "false";
};

function SafeImageInner({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  optimized = false,
  unoptimized,
  "aria-hidden": ariaHidden,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const decorative = alt === "" || ariaHidden === true || ariaHidden === "true";

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-zinc-300 text-center text-xs font-semibold uppercase tracking-wide text-zinc-600",
          fill ? "absolute inset-0" : "",
          !fill && width && height ? "" : "",
          className,
        )}
        role="img"
        aria-label="Image not found"
      >
        Image not found
      </div>
    );
  }

  const isSvg = src.endsWith(".svg");

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg || unoptimized === true || !optimized}
      draggable={false}
      className={className}
      onError={() => setFailed(true)}
      aria-hidden={decorative ? true : undefined}
    />
  );
}

export function SafeImage(props: SafeImageProps) {
  return <SafeImageInner key={props.src} {...props} />;
}
