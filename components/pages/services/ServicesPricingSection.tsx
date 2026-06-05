import Image from "next/image";
import Link from "next/link";
import { Montserrat, Readex_Pro } from "next/font/google";
import { pricingCheckoutUrls } from "@/config/urls";
import { ServiceSafeImage } from "@/components/pages/service/shared/ServiceSafeImage";
import { cn } from "@/lib/utils";

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
    gradientClass: "from-[#BD62FF] to-[#7E5BFD]",
    dividerClass: "bg-[#b28cff]",
    accentClass: "text-[#5b21b6]",
    ctaHref: pricingCheckoutUrls.entrepreneur,
  },
  {
    id: "marketer",
    name: "MARKETER",
    labelImageSrc: "/images/dt360-marketer.png",
    labelImageAlt: "Marketer plan label",
    tasks: "2 Task",
    price: "$2,994",
    period: "/month",
    ribbonClass: "bg-[#7f1d1d]",
    ribbonCutClass: "border-l-[#f97316]",
    gradientClass: "from-[#FF8B52] to-[#EE4176]",
    dividerClass: "bg-[#ff8d4f]",
    accentClass: "text-[#be123c]",
    ctaHref: pricingCheckoutUrls.marketer,
  },
  {
    id: "agency",
    name: "AGENCY",
    labelImageSrc: "/images/dt360-agency.png",
    labelImageAlt: "Agency plan label",
    tasks: "3 Task",
    price: "$4,491",
    period: "/month",
    ribbonClass: "bg-[#134e4a]",
    ribbonCutClass: "border-l-[#84cc16]",
    gradientClass: "from-[#9DC54E] to-[#1D8A7D]",
    dividerClass: "bg-[#7cd44e]",
    accentClass: "text-[#0f766e]",
    ctaHref: pricingCheckoutUrls.agency,
  },
] as const;

const FEATURE_ITEMS = [
  "All Services Included",
  "North American Account Manager",
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
      sizes="20px"
      className={className}
      aria-hidden
    />
  );
}

export type ServicesPricingSectionVariant = "default" | "webDesignDevelopment";

export type ServicesPricingSectionProps = {
  /** `webDesignDevelopment`: title + footer CTA only for `/services/web-design-development`. */
  variant?: ServicesPricingSectionVariant;
};

export function ServicesPricingSection({ variant = "default" }: ServicesPricingSectionProps = {}) {
  const isWebDev = variant === "webDesignDevelopment";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-white",
        isWebDev
          ? "z-0 isolate bg-white pb-[72px] max-md:mt-0 max-md:pt-115 md:mt-0 md:pt-0 md:pb-[88px] lg:pt-0 xl:-mt-[140px] xl:pb-[100px] xl:pt-[300px] 2xl:pt-[320px]"
          : "z-10 isolate pb-[20px] pt-[160px] max-md:-mt-[16rem] max-md:pt-[40rem] md:-mt-[10rem] md:pb-[88px] md:pt-[420px] xl:mt-0 xl:pb-[100px] xl:pt-[200px]",
      )}
      aria-labelledby={isWebDev ? "web-design-dev-pricing-heading" : "services-pricing-heading"}
    >
      {isWebDev ? (
        <>
          {/* Tablet: white bg extends up behind step cards without pulling the title under them */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden bg-white md:block md:-top-36 lg:-top-40 xl:hidden"
            aria-hidden
          />
          <ServiceSafeImage
            src="/images/Service/web-design-dev-pricing-bottom-left.png"
            alt=""
            width={500}
            height={500}
            sizes="(max-width: 1280px) 40vw, 500px"
            className="pointer-events-none absolute bottom-0 left-0 z-[1] h-auto w-[30%] max-w-none object-contain object-left-bottom"
          />
        </>
      ) : null}
      {/* Radial pink — bottom left, larger */}
      <div
        className="pointer-events-none absolute -bottom-[24%] -left-[18%] aspect-square w-[75%] min-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(227,5,141,0.4)_0%,rgba(227,5,141,0.18)_32%,rgba(227,5,141,0.06)_52%,transparent_72%)]"
        aria-hidden
      />
      {/* Radial blue — top right, behind bubble */}
      <div
        className="pointer-events-none absolute -right-[8%] -top-[14%] z-0 aspect-square h-[45%] min-h-[260px] rounded-full bg-[radial-gradient(circle,rgba(0,200,244,0.4)_0%,rgba(0,200,244,0.16)_38%,transparent_68%)]"
        aria-hidden
      />

      <Image
        src="/images/dt360-topbubble.png"
        alt=""
        width={540}
        height={714}
        sizes="(max-width: 1280px) 52vw, 520px"
        className="pointer-events-none absolute right-0 top-0 z-[1] h-auto w-[min(52vw,420px)] max-w-none opacity-95 md:w-[min(44vw,480px)] xl:w-[min(38vw,520px)]"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10 xl:px-10">
        <h2
          id={isWebDev ? "web-design-dev-pricing-heading" : "services-pricing-heading"}
          className={cn(
            "relative z-[1] text-center text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight tracking-tight text-[#101651] max-md:mt-0 max-md:pt-0 md:text-[64px] xl:mt-0",
            isWebDev
              ? "max-md:mt-0 md:mt-0 md:pt-[13rem] lg:pt-[14rem] xl:mt-0 xl:pt-0"
              : "md:mt-12",
          )}
        >
          {isWebDev ? (
            <>
              One Team, <span className="text-[#E3058D]">Three Plans,</span><br/>Pick Your Speed
            </>
          ) : (
            <>
              Simple Pricing,
              <br />
              <span className="text-[#E3058D]">All-Inclusive</span>
            </>
          )}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-1 md:gap-3 xl:mt-14 xl:grid-cols-3 xl:gap-3">
          {PLANS.map((plan) => {
            return (
              <article
                key={plan.id}
                className={cn(
                  "mx-auto flex h-full min-h-[370px] w-full flex-col overflow-hidden rounded-[14px] bg-gradient-to-b p-0 text-white shadow-[0_12px_26px_-10px_rgba(16,22,81,0.35)] transition duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_20px_38px_-14px_rgba(16,22,81,0.45)] md:max-w-[450px] xl:max-w-none",
                  plan.gradientClass,
                )}
              >
                <div className="flex items-center justify-between gap-3 pr-5 pt-10">
                  <Image
                    src={plan.labelImageSrc}
                    alt={plan.labelImageAlt}
                    width={366}
                    height={78}
                    className="h-auto w-[68%] max-w-[366px] object-contain"
                    sizes="(min-width: 1280px) 23vw, 60vw"
                  />
                  <span className="text-[24px] font-bold leading-none text-white/95">{plan.tasks}</span>
                </div>
                <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-14">
                  <p className="inline-flex w-full items-end justify-center whitespace-nowrap font-extrabold leading-none tracking-tight text-[72px]">
                    <span className={readexPro.className}>{plan.price}</span>
                    <span
                      className={`${montserrat.className} ml-1 text-[18px] tracking-normal font-bold text-white/90`}
                    >
                      {plan.period}
                    </span>
                  </p>
                  <div className={cn(`my-12 h-[5px] w-full self-stretch ${plan.dividerClass}`)} aria-hidden />
                  <Link
                    href={plan.ctaHref}
                    className={`font-button group mt-auto inline-flex w-fit items-center justify-center gap-2 self-center rounded-full bg-white px-3.5 py-3 tracking-wide shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-95 hover:shadow-[0_10px_22px_-8px_rgba(0,0,0,0.35)] ${plan.accentClass}`}
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
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {isWebDev ? (
          <div className="mt-10 flex justify-center md:mt-12 xl:mt-14">
            <Link
              href="/#pricing"
              className="font-button group inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#E6236D] px-4 py-3.5 text-center tracking-wide text-white shadow-[0_10px_28px_-8px_rgba(239,47,169,0.55)] transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_34px_-10px_rgba(239,47,169,0.65)]"
            >
              See Full Pricing &amp; Plans &raquo;
            </Link>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-6 rounded-[24px] border border-[#e8eaf4] bg-white/90 p-6 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm md:mt-12 md:flex md:flex-col md:gap-6 md:p-6 lg:p-8 xl:mt-14 xl:flex-row xl:items-center xl:gap-8">
            <ul className="grid min-w-0 flex-1 grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-x-4 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.38fr)] md:gap-x-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.28fr)] lg:gap-x-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] xl:gap-x-8">
              {FEATURE_ITEMS.map((label) => (
                <li
                  key={label}
                  className="type-rule-p flex items-start gap-2.5 break-inside-avoid text-left text-[#101651] md:gap-2 md:text-[16px] lg:gap-2.5 lg:text-[18px]"
                >
                  <CheckIcon className="mt-0.5 shrink-0" />
                  <span
                    className={cn(
                      label === "North American Account Manager" &&
                        "md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-normal",
                    )}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="shrink-0 xl:pl-0">
              <Link
                href="/#pricing"
                className="font-button group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E3058D] px-3 py-3.5 text-center tracking-wide text-white shadow-[0_10px_28px_-8px_rgba(239,47,169,0.55)] transition duration-300 ease-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_34px_-10px_rgba(239,47,169,0.65)] md:w-auto md:min-w-[220px] xl:min-w-[240px]"
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
        )}
      </div>
    </section>
  );
}
