import Link from "next/link";
import { heroContent } from "@/data/home";
import { cn } from "@/lib/utils";

function ArrowCircle() {
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
      <svg className="size-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 01.75-.75h9.546l-2.955-2.955a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.955-2.955H3.75A.75.75 0 013 10z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

export function HeroActions() {
  const { primaryCta, secondaryCta } = heroContent;
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <Link
        href={primaryCta.href}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition",
          "bg-[#e4277a] shadow-rose-600/30 hover:bg-[#f0308a]",
        )}
      >
        {primaryCta.label}
        <ArrowCircle />
      </Link>
      <Link
        href={secondaryCta.href}
        className={cn(
          "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition",
          "bg-gradient-to-r from-[#ff7a32] to-[#e4277a] hover:brightness-110",
        )}
      >
        {secondaryCta.label}
        <ArrowCircle />
      </Link>
    </div>
  );
}
