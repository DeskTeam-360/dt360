import { SafeImage } from "@/components/shared/SafeImage";
import { cn } from "@/lib/utils";

export const serviceFaqIllustrationWrapperClassName =
  "relative mx-auto w-full max-w-[min(100%,320px)] sm:max-w-[400px]";

export const serviceFaqIllustrationImageClassName =
  "max-h-[min(50vw,280px)] w-full max-w-full object-contain object-top sm:max-h-[360px] lg:max-h-[520px] lg:h-auto lg:max-w-[34rem]";

type ServiceFaqIllustrationProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  wrapperClassName?: string;
  imageClassName?: string;
};

export function ServiceFaqIllustration({
  src,
  alt,
  width = 860,
  height = 640,
  sizes,
  wrapperClassName,
  imageClassName,
}: ServiceFaqIllustrationProps) {
  return (
    <div className={cn(serviceFaqIllustrationWrapperClassName, wrapperClassName)}>
      <SafeImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes ?? "(max-width: 1023px) 90vw, 560px"}
        optimized
        className={cn(serviceFaqIllustrationImageClassName, imageClassName)}
      />
    </div>
  );
}
