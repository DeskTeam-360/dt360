import Image from "next/image";
import { Fragment } from "react";
import {
  DEFAULT_HOW_IT_WORKS_OVERLAP_FRACTION,
  ServicesHowItWorksFloatingRow,
} from "@/components/pages/services/ServicesHowItWorksFloatingRow";

/** Intrinsic PNG dimensions (Task / Work / Result box) — all are 298x136 */
const ASSET_HEADER_W = 298;
const ASSET_HEADER_H = 136;

type HowItWorksStep = {
  number: string;
  headerSrc: string;
  headerAlt: string;
  description: string;
  cardBodyClass: string;
};

const STEPS: HowItWorksStep[] = [
  {
    number: "1",
    headerSrc: "/images/dt360-icon-Task-box.png",
    headerAlt: "Step 1: submit your web task",
    description: "Submit your web task - Loom video, written brief, or quick description",
    cardBodyClass: "bg-[#0E3160]",
  },
  {
    number: "2",
    headerSrc: "/images/dt360-icon-Work-box.png",
    headerAlt: "Step 2: your account manager assigns a developer",
    description: "Your North American account manager assigns a developer and manages the build",
    cardBodyClass: "bg-[#121550]",
  },
  {
    number: "3",
    headerSrc: "/images/dt360-icon-Result-box.png",
    headerAlt: "Step 3: work delivered with revisions",
    description: "Work delivered in 1-3 days. Unlimited revisions until perfect.",
    cardBodyClass: "bg-[#281D4D]",
  },
];

function DotsArrow() {
  return (
    <div
      className="relative mx-auto box-border hidden h-full w-[110px] max-w-[110px] shrink-0 items-center justify-center px-5 py-3 lg:mx-0 lg:flex lg:min-h-0 lg:overflow-visible lg:py-0"
      aria-hidden
    >
      <Image
        src="/images/dt360-dots-arrow.png"
        alt=""
        width={120}
        height={100}
        className="h-[72px] w-full max-w-[70px] shrink-0 rotate-90 object-contain opacity-100 lg:absolute lg:left-1/2 lg:top-0 lg:h-auto lg:max-h-[90px] lg:max-w-[70px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rotate-0"
      />
    </div>
  );
}

function HowItWorksCard({ step, stepIndex }: { step: HowItWorksStep; stepIndex: number }) {
  const halfHeightPadding = `calc(100% * ${ASSET_HEADER_H / 2} / ${ASSET_HEADER_W})`;
  const mobileMarginBelow = stepIndex < STEPS.length - 1 ? "max-md:mb-24" : "";

  return (
    <article
      className={`relative mx-auto flex min-w-0 flex-col self-stretch overflow-visible rounded-[24px] border border-white/[0.08] max-md:h-auto max-md:flex-none md:min-h-0 md:flex-1 md:max-w-none lg:mx-0 lg:max-w-none ${mobileMarginBelow} ${step.cardBodyClass} shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] lg:h-full lg:flex-none`}
    >
      <div className="relative z-10 mx-auto w-[85%] max-md:pb-1" style={{ paddingTop: halfHeightPadding }}>
        <Image
          src={step.headerSrc}
          alt={step.headerAlt}
          width={ASSET_HEADER_W}
          height={ASSET_HEADER_H}
          sizes="(max-width: 1024px) 72vw, 22vw"
          className="absolute left-0 top-0 z-20 h-auto w-full -translate-y-1/2 object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        />
      </div>
      <p className="relative z-0 mx-auto mt-1 flex max-w-[28ch] flex-col justify-center overflow-visible px-5 pb-8 pt-2 text-center text-[20px] font-semibold leading-snug text-white max-md:mt-10 sm:px-7 max-md:min-h-0 max-md:flex-none md:min-h-0 md:flex-1 lg:min-h-0 lg:flex-1">
        {step.description}
      </p>
    </article>
  );
}

type ServicesHowItWorksProps = {
  /** 0-1: how much of the card-row height overlaps into the next section (0.5 ~= half). */
  cardsOverlapFraction?: number;
};

export function ServicesHowItWorks({ cardsOverlapFraction = DEFAULT_HOW_IT_WORKS_OVERLAP_FRACTION }: ServicesHowItWorksProps = {}) {
  return (
    <section
      className="relative z-[30] flex flex-col gap-0 overflow-visible bg-transparent"
      aria-labelledby="services-how-it-works-heading"
    >
      {/* Navy only on top; larger pb creates runway so negative card margin does not cover heading */}
      <div className="bg-[#0c1030] px-5 pb-22 pt-[72px] max-md:pb-28 md:px-10 md:pb-30 md:pt-[88px] lg:px-10 lg:pb-62 lg:pt-[100px]">
        <div className="mx-auto max-w-6xl">
          <h2
            id="services-how-it-works-heading"
            className="text-center text-[64px] font-extrabold leading-tight tracking-tight text-white"
          >
            How It <span className="text-[#ef2fa9]">Works</span>
          </h2>
        </div>
      </div>

      <div className="relative z-[25] mx-auto w-full max-w-6xl px-5 pb-0 pt-0 max-md:pt-28 md:px-10 md:pt-8 lg:px-10 lg:pt-0">
        <ServicesHowItWorksFloatingRow overlapFraction={cardsOverlapFraction} extraNegativeMarginTopPx={30} extraNegativeMarginBottomPx={30}>
          <div className="flex flex-col items-stretch gap-0 overflow-visible drop-shadow-[0_28px_60px_-12px_rgba(0,0,0,0.45)] md:min-h-0 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)_110px_minmax(0,1fr)] lg:gap-0 lg:items-stretch">
            {STEPS.map((step, i) => (
              <Fragment key={step.number}>
                <HowItWorksCard step={step} stepIndex={i} />
                {i < STEPS.length - 1 ? <DotsArrow /> : null}
              </Fragment>
            ))}
          </div>
        </ServicesHowItWorksFloatingRow>
      </div>
    </section>
  );
}
