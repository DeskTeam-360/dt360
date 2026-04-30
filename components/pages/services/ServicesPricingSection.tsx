import Image from "next/image";
import Link from "next/link";
import { Montserrat, Readex_Pro } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
});

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["700"],
});

const PLANS = [
  {
    id: "entrepreneur",
    name: "ENTREPRENEUR",
    labelImageSrc: "/images/dt360-enterpreneur.png",
    labelImageAlt: "Entrepreneur plan label",
    tasks: "1 Task",
    price: "$1,497",
    period: "/month",
    ribbonClass: "bg-[#1e3a5f]",
    ribbonCutClass: "border-l-[#6d4df6]",
    gradientClass: "from-[#c4b5fd] via-[#8b5cf6] to-[#4c1d95]",
    dividerClass: "bg-[#b28cff]",
    accentClass: "text-[#5b21b6]",
  },
  {
    id: "marketer",
    name: "MARKETER",
    labelImageSrc: "/images/dt360-marketer.png",
    labelImageAlt: "Marketer plan label",
    tasks: "2 Tasks",
    price: "$2,994",
    period: "/month",
    ribbonClass: "bg-[#7f1d1d]",
    ribbonCutClass: "border-l-[#f97316]",
    gradientClass: "from-[#fb923c] via-[#f43f5e] to-[#be123c]",
    dividerClass: "bg-[#ff8d4f]",
    accentClass: "text-[#be123c]",
  },
  {
    id: "agency",
    name: "AGENCY",
    labelImageSrc: "/images/dt360-agency.png",
    labelImageAlt: "Agency plan label",
    tasks: "3 Tasks",
    price: "$4,491",
    period: "/month",
    ribbonClass: "bg-[#134e4a]",
    ribbonCutClass: "border-l-[#84cc16]",
    gradientClass: "from-[#d9f99d] via-[#4ade80] to-[#0f766e]",
    dividerClass: "bg-[#7cd44e]",
    accentClass: "text-[#0f766e]",
  },
] as const;

const FEATURE_ITEMS = [
  "All Services Included",
  "North America Account Manager",
  "1-3 Day Turnaround",
  "Unlimited Revisions",
  "Month-to-Month",
] as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/dt360-check-icon.png"
      alt=""
      width={20}
      height={20}
      className={className}
      aria-hidden
    />
  );
}

export function ServicesPricingSection() {
  return (
    <section
      className="relative z-10 isolate overflow-hidden bg-white pb-[72px] pt-[160px] max-md:-mt-[16rem] max-md:pt-[58rem] md:-mt-[10rem] md:pb-[88px] md:pt-[420px] lg:mt-0 lg:pb-[100px] lg:pt-[200px]"
      aria-labelledby="services-pricing-heading"
    >
      {/* Radial pink — kiri bawah, lebih besar */}
      <div
        className="pointer-events-none absolute -bottom-[24%] -left-[18%] aspect-square w-[75%] min-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(227,5,141,0.4)_0%,rgba(227,5,141,0.18)_32%,rgba(227,5,141,0.06)_52%,transparent_72%)]"
        aria-hidden
      />
      {/* Radial biru — kanan atas, di belakang bubble */}
      <div
        className="pointer-events-none absolute -right-[8%] -top-[14%] z-0 aspect-square h-[45%] min-h-[260px] rounded-full bg-[radial-gradient(circle,rgba(0,200,244,0.4)_0%,rgba(0,200,244,0.16)_38%,transparent_68%)]"
        aria-hidden
      />

      <Image
        src="/images/dt360-topbubble.png"
        alt=""
        width={540}
        height={714}
        className="pointer-events-none absolute right-0 top-0 z-[1] h-auto w-[min(52vw,420px)] max-w-none opacity-95 md:w-[min(44vw,480px)] lg:w-[min(38vw,520px)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10 lg:px-10">
        <h2
          id="services-pricing-heading"
          className="relative z-[1] text-center text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-[#101651] max-md:mt-0 max-md:pt-0 md:mt-12 md:text-[64px] lg:mt-0"
        >
          Simple Pricing.
          <br />
          <span className="text-[#ef2fa9]">All-Inclusive</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-1 md:gap-3 lg:mt-14 lg:grid-cols-3 lg:gap-3">
          {PLANS.map((plan) => {
            return (
              <article
                key={plan.id}
                className={`mx-auto flex min-h-[370px] w-full flex-col overflow-hidden rounded-[14px] bg-gradient-to-b p-0 text-white shadow-[0_12px_26px_-10px_rgba(16,22,81,0.35)] transition duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_38px_-14px_rgba(16,22,81,0.45)] md:max-w-[450px] lg:max-w-none ${plan.gradientClass}`}
              >
                <div className="flex items-center justify-between gap-3 pr-5 pt-10">
                  <Image
                    src={plan.labelImageSrc}
                    alt={plan.labelImageAlt}
                    width={366}
                    height={78}
                    className="h-auto w-[68%] max-w-[366px] object-contain"
                    sizes="(min-width: 1024px) 23vw, 60vw"
                  />
                  <span className="text-[24px] font-bold leading-none text-white/95">{plan.tasks}</span>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-14">
                  <p
                    className="inline-flex items-end whitespace-nowrap font-extrabold leading-none tracking-tight text-[72px]"
                  >
                    <span className={readexPro.className}>{plan.price}</span>
                    <span
                      className={`${montserrat.className} ml-1 text-[18px] tracking-normal font-bold text-white/90`}
                    >
                      {plan.period}
                    </span>
                  </p>
                  <div className={`my-12 h-[5px] w-full ${plan.dividerClass}`} aria-hidden />
                  <button
                    type="button"
                    className={`group mt-auto inline-flex w-fit items-center justify-center gap-2 self-center rounded-full bg-white px-7 py-3 text-[20px] font-extrabold tracking-wide shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_10px_22px_-8px_rgba(0,0,0,0.35)] ${plan.accentClass}`}
                  >
                    GET STARTED
                    <span
                      className={`flex h-10 w-10 max-h-[26px] max-w-[26px] items-center justify-center rounded-full border-2 border-current bg-black/5 transition duration-300 ease-out group-hover:translate-x-0.5 ${plan.accentClass}`}
                      aria-hidden
                    >
                      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="translate-x-px">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-6 rounded-[24px] border border-[#e8eaf4] bg-white/90 p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm md:mt-12 md:flex md:flex-col md:gap-8 md:p-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid flex-1 grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            {FEATURE_ITEMS.map((label) => (
              <li key={label} className="flex items-start gap-3 text-left text-[15px] font-semibold text-[#101651] sm:text-base">
                <CheckIcon className="mt-0.5 shrink-0" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <div className="shrink-0 md:pl-2">
            <Link
              href="#"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ef2fa9] px-6 py-3.5 text-center text-[20px] font-extrabold tracking-wide text-white shadow-[0_10px_28px_-8px_rgba(239,47,169,0.55)] transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_34px_-10px_rgba(239,47,169,0.65)] md:w-auto md:min-w-[240px]"
            >
              See Full Pricing & Plans
              <span className="flex h-9 w-9 max-h-[26px] max-w-[26px] shrink-0 items-center justify-center rounded-full border-2 border-white bg-white/20 transition duration-300 ease-out group-hover:translate-x-0.5" aria-hidden>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className="translate-x-px text-white">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
