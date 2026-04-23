import Link from "next/link";
import type { PricingPlan } from "./pricing-data";
import { pricingPlans } from "./pricing-data";

function formatUsd(n: number) {
  return n.toLocaleString("en-US");
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 size-5 shrink-0 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  const ribbonClip =
    "polygon(0 0, calc(100% - 1.75rem) 0, 100% 50%, calc(100% - 1.75rem) 100%, 0 100%)";

  return (
    <article
      className="flex min-h-full flex-col overflow-hidden rounded-2xl shadow-lg shadow-slate-900/15 ring-1 ring-black/5"
      style={{ backgroundColor: plan.cardBg }}
    >
      <div
        className="px-5 py-3.5 text-center text-sm font-bold tracking-wide text-white uppercase sm:text-left sm:pl-6"
        style={{ backgroundColor: plan.ribbonBg, clipPath: ribbonClip }}
      >
        {plan.title}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-8 pt-8">
        <div className="flex flex-wrap items-end justify-center gap-1 text-white sm:justify-start">
          <span className="pb-1 text-3xl font-semibold leading-none">$</span>
          <span className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
            {formatUsd(plan.price)}
          </span>
          <span className="pb-2 text-sm font-medium text-white/90">/month</span>
        </div>

        <div className="mx-auto mt-6 h-px w-full max-w-[220px] bg-white/25 sm:mx-0 sm:max-w-none" />

        <ul className="mt-6 flex flex-1 flex-col gap-3.5">
          {plan.features.map((line) => (
            <li key={line} className="flex gap-3 text-sm font-medium leading-snug text-white">
              <CheckIcon />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="#get-started"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold tracking-wide uppercase shadow-sm transition hover:bg-white/95"
            style={{ color: plan.accentText }}
          >
            Get started
            <span
              className="flex size-8 items-center justify-center rounded-full ring-2"
              style={{ color: plan.accentText, borderColor: "currentColor" }}
              aria-hidden
            >
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 10a.75.75 0 01.75-.75h9.546l-3.955-3.955a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l3.955-3.955H3.75A.75.75 0 013 10z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PricingSection() {
  return (
    <section
      id="plans"
      className="border-t border-slate-200/80 bg-slate-50 py-16 sm:py-20 lg:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="pricing-heading"
          className="sr-only"
        >
          Paket harga
        </h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
