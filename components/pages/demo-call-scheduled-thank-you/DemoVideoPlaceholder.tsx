import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type DemoVideoPlaceholderProps = {
  ariaLabel: string;
  className?: string;
  /** Dark framed player (hero section) */
  variant?: "framed" | "thumbnail";
  label?: string;
};

/**
 * Dummy video placeholder — gradient thumbnail + play affordance until real embeds are wired.
 */
export function DemoVideoPlaceholder({
  ariaLabel,
  className,
  variant = "thumbnail",
  label,
}: DemoVideoPlaceholderProps) {
  if (variant === "framed") {
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl bg-[#2B2B2B] shadow-[0_24px_64px_rgba(17,16,76,0.18)]",
          className,
        )}
      >
        {label ? (
          <p className="px-6 py-5 text-center font-[var(--font-poppins)] text-[18px] font-semibold leading-snug text-white sm:px-8 sm:text-[22px] lg:text-[24px]">
            {label}
          </p>
        ) : null}
        <div className="relative aspect-video w-full bg-[#1a1a1a]">
          <div
            className="absolute inset-0 bg-[linear-gradient(135deg,#3a3f7a_0%,#1a1a2e_45%,#2d1b3d_100%)]"
            aria-hidden
          />
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3058D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B2B2B]"
            aria-label={ariaLabel}
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition hover:bg-white/25 sm:size-20">
              <Play className="ml-1 size-8 fill-white text-white sm:size-10" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[20px] shadow-[0_20px_48px_rgba(17,16,76,0.14)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(145deg,#5F69AD_0%,#9B7DFF_38%,#E3058D_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.22)_0%,transparent_55%)]"
        aria-hidden
      />
      <button
        type="button"
        className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3058D] focus-visible:ring-offset-2"
        aria-label={ariaLabel}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-105 sm:size-[72px]">
          <Play className="ml-1 size-8 fill-[#11104C] text-[#11104C] sm:size-9" aria-hidden />
        </span>
      </button>
    </div>
  );
}
