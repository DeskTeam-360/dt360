import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  primary:
    "bg-[#e4277a] shadow-[0_4px_24px_-4px_rgba(228,39,122,0.55)] group-hover:bg-[#f0308a] group-hover:shadow-[0_14px_44px_-6px_rgba(228,39,122,0.62)]",
  secondary:
    "bg-[#FF7A32] shadow-[0_4px_24px_-4px_rgba(255,122,50,0.45)] group-hover:bg-[#ff8f4d] group-hover:shadow-[0_14px_44px_-6px_rgba(255,122,50,0.58)]",
} as const;

export type HeroCtaLinkVariant = keyof typeof variantClass;

export type HeroCtaLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant: HeroCtaLinkVariant;
  className?: string;
};

/**
 * Hero CTA: kotak rounded + label + ikon chevron dalam lingkaran (Lucide).
 * Hover slide + shadow diterapkan pada span dalam + `group-hover`, supaya area klik `<Link>`
 * tidak ikut bergerak (menghindari “lompat-lompat” di tepi tombol).
 */
export function HeroCtaLink({ variant, className, children, ...linkProps }: HeroCtaLinkProps) {
  return (
    <Link
      {...linkProps}
      className={cn(
        "group inline-flex w-full min-w-0 rounded-xl pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11104C] sm:w-auto",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex min-h-[3rem] w-full min-w-0 items-center justify-between gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-[transform,box-shadow,background-color] duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-colors motion-reduce:group-hover:translate-y-0 sm:px-7 sm:py-3.5",
          variantClass[variant],
        )}
      >
        <span className="min-w-0 text-left">{children}</span>
        <CircleChevronRight className="size-9 shrink-0 text-white" strokeWidth={1.65} aria-hidden />
      </span>
    </Link>
  );
}
