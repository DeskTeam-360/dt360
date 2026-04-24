import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  primary:
    "bg-[#e4277a] shadow-[0_4px_24px_-4px_rgba(228,39,122,0.55)] hover:bg-[#f0308a]",
  secondary:
    "bg-[#FF7A32] shadow-[0_4px_24px_-4px_rgba(255,122,50,0.45)] hover:bg-[#ff8f4d]",
} as const;

export type HeroCtaLinkVariant = keyof typeof variantClass;

export type HeroCtaLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant: HeroCtaLinkVariant;
  className?: string;
};

/** Hero CTA: kotak rounded + label + ikon chevron dalam lingkaran (Lucide). */
export function HeroCtaLink({ variant, className, children, ...linkProps }: HeroCtaLinkProps) {
  return (
    <Link
      {...linkProps}
      className={cn(
        "inline-flex min-h-[3rem] w-full min-w-0 items-center justify-between gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition sm:w-auto sm:px-7 sm:py-3.5",
        variantClass[variant],
        className,
      )}
    >
      <span className="min-w-0 text-left">{children}</span>
      <CircleChevronRight className="size-9 shrink-0 text-white" strokeWidth={1.65} aria-hidden />
    </Link>
  );
}
