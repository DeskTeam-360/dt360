import Link from "next/link";
import type { CSSProperties } from "react";
import type { PricingPlanCard } from "@/data/home";
import { fontReadexPro } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type Props = {
  plan: PricingPlanCard;
  ctaLabel: string;
};

/** Ribbon dengan bentuk takik kanan ke dalam (sama untuk semua plan, beda warna). */
function PlanRibbon({
  title,
  labelledById,
  fillColor,
}: {
  title: string;
  labelledById: string;
  fillColor: string;
}) {
  return (
    <div className="absolute left-0 top-8 z-10 w-[min(340px,calc(100%-1.5rem))] drop-shadow-[2px_4px_12px_rgba(0,0,0,0.16)]">
      <div className="relative h-[59px] w-full">
        <svg
          className="absolute inset-0 h-[59px] w-full font-sans"
          viewBox="0 0 340 59"
          preserveAspectRatio="xMinYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          {/* Takik kanan: kedalaman horizontal ~20px (puncak di tengah vertikal 59px) */}
          <path fill={fillColor} d="M0 0 H312.581 L292.581 29.5 L312.581 59 H0 Z" stroke="none" />
        </svg>
        <span
          id={labelledById}
          className="type-rule-h5 pointer-events-none absolute left-0 top-0 flex h-[59px] w-full items-center whitespace-nowrap pl-5 pr-12 uppercase tracking-[0.06em] text-white"
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function CtaCircleChevron({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 3.25 8 6.5 4 9.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingPlanCardComponent({ plan, ctaLabel }: Props) {
  const ctaStyle = {
    "--plan-accent": plan.buttonTextColor,
  } as CSSProperties;

  return (
    <article
      className={cn(
        "relative flex min-h-[32rem] flex-col overflow-hidden rounded-[14px] px-7 pb-8 pt-28 shadow-[0_0_20px_0_rgba(0,0,0,0.2)]",
        "transform-gpu transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
        "sm:min-h-[36rem]",
      )}
      style={{ background: plan.cardBackground }}
      aria-labelledby={`pricing-plan-${plan.id}`}
    >
      <PlanRibbon
        title={plan.name}
        labelledById={`pricing-plan-${plan.id}`}
        fillColor={plan.ribbonColor}
      />

      <div className="relative z-[1] mt-2 shrink-0">
        <p className="flex w-full justify-center text-white">
          <span className="inline-flex items-end gap-1.5">
          <span
            className={cn(
              fontReadexPro.className,
              "leading-none text-[80px] font-bold tracking-tight",
            )}
          >
            ${plan.price}
          </span>
          <span className={cn("type-rule-p pb-1 leading-none text-white/90")}>
            /month
          </span>
          </span>
        </p>
      </div>

      <div
        className="relative z-[1] my-6 h-[3px] w-full bg-white/40 shadow-[0_4px_8px_rgba(0,0,0,0.5)] sm:my-7"
        role="presentation"
      />

      <ul className="type-rule-p relative z-[1] flex flex-1 flex-col gap-4 px-2 text-white sm:px-3">
        {plan.features.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span className="mt-0.5 shrink-0 font-semibold opacity-95" aria-hidden>
              ✓
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-[1] mt-8 flex w-full justify-center pt-8 before:absolute before:inset-x-0 before:-top-[3px] before:h-[3px] before:bg-white/40 before:shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
        <Link
          href={plan.ctaHref}
          className="font-button inline-flex items-center justify-center gap-3 rounded-full border border-transparent bg-white px-2.5 py-2.5 uppercase tracking-[0.12em] text-[var(--plan-accent)] shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-colors duration-300 hover:bg-[var(--plan-accent)] hover:text-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101651]"
          style={ctaStyle}
        >
          <span className="shrink-0">{ctaLabel}</span>
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-current text-current"
            aria-hidden
          >
            <CtaCircleChevron className="translate-x-px" />
          </span>
        </Link>
      </div>
    </article>
  );
}
