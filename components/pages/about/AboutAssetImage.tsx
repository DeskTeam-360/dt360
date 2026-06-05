"use client";

import { SafeImage } from "@/components/shared/SafeImage";
import { cn } from "@/lib/utils";

type AboutAssetImageProps = {
  src: string;
  alt: string;
  className?: string;
  rounded?: string;
  objectFitClass?: string;
  objectPositionClass?: string;
  /** Extra classes on the image (e.g. scale to crop baked-in PNG padding). */
  imageClassName?: string;
};

export function AboutAssetImage({
  src,
  alt,
  className,
  rounded = "rounded-2xl",
  objectFitClass = "object-cover",
  objectPositionClass = "object-center",
  imageClassName,
}: AboutAssetImageProps) {
  return (
    <div className={cn("relative min-h-44 overflow-hidden border border-white/20 bg-white/10", rounded, className)}>
      <SafeImage
        src={src}
        alt={alt}
        fill
        optimized
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 560px"
        className={cn(objectFitClass, objectPositionClass, imageClassName)}
      />
    </div>
  );
}
