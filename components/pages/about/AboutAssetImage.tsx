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
};

export function AboutAssetImage({ 
  src, 
  alt, 
  className, 
  rounded = "rounded-2xl",
  objectFitClass = "object-cover",
  objectPositionClass = "object-center"
}: AboutAssetImageProps) {
  return (
    <div className={cn("relative min-h-44 overflow-hidden border border-white/20 bg-white/10", rounded, className)}>
      <SafeImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(objectFitClass, objectPositionClass)}
      />
    </div>
  );
}
