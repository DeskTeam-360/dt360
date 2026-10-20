"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import {
  careersCategories,
  careersOpportunities,
  type CareersRole,
} from "@/data/careers";

function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

function RoleRow({
  role,
  showTip,
  tipAlign,
  isMobile,
  onEnter,
  onLeave,
  onToggle,
}: {
  role: CareersRole;
  showTip: boolean;
  tipAlign: "start" | "end";
  isMobile: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const hasDetail = Boolean(role.whatYoullDo || role.requirements);

  return (
    <li
      className={`relative border-b border-[#E8EAF4] last:border-b-0 ${showTip ? "z-50" : "z-0"}`}
      onMouseEnter={!isMobile && hasDetail ? onEnter : undefined}
      onMouseLeave={!isMobile && hasDetail ? onLeave : undefined}
      onFocus={!isMobile && hasDetail ? onEnter : undefined}
      onBlur={!isMobile && hasDetail ? onLeave : undefined}
    >
      {hasDetail ? (
        <button
          type="button"
          className="flex w-full items-center justify-between gap-1.5 px-2.5 py-2.5 text-left sm:px-3 sm:py-3"
          aria-expanded={showTip}
          aria-controls={`role-tip-${role.title}`}
          onClick={isMobile ? onToggle : undefined}
        >
          <span className="min-w-0 whitespace-nowrap font-[var(--font-inter)] text-[11px] font-semibold leading-[1.6] tracking-normal text-[#080F40]">
            {role.title}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            {role.talentPool ? (
              <span className="rounded-full bg-[#EAE5FD] px-1.5 py-px font-[var(--font-poppins)] text-[8px] font-bold uppercase leading-none tracking-wide text-[#6646BD]">
                Talent pool
              </span>
            ) : null}
            {isMobile ? (
              <span
                className={`inline-flex h-4 w-4 items-center justify-center text-[#6646BD] transition-transform ${
                  showTip ? "rotate-180" : ""
                }`}
                aria-hidden
              >
                <svg viewBox="0 0 12 8" className="h-2.5 w-2.5 fill-current">
                  <path d="M1.4.6 6 5.2 10.6.6 12 2 6 8 0 2z" />
                </svg>
              </span>
            ) : null}
          </span>
        </button>
      ) : (
        <div className="flex w-full items-center justify-between gap-1.5 px-2.5 py-2.5 text-left sm:px-3 sm:py-3">
          <span className="min-w-0 whitespace-nowrap font-[var(--font-inter)] text-[11px] font-semibold leading-[1.6] tracking-normal text-[#080F40]">
            {role.title}
          </span>
          {role.talentPool ? (
            <span className="shrink-0 rounded-full bg-[#EAE5FD] px-1.5 py-px font-[var(--font-poppins)] text-[8px] font-bold uppercase leading-none tracking-wide text-[#6646BD]">
              Talent pool
            </span>
          ) : null}
        </div>
      )}

      {hasDetail && showTip ? (
        <div
          id={`role-tip-${role.title}`}
          role={isMobile ? "region" : "tooltip"}
          className={
            isMobile
              ? "relative z-[200] mx-1 mb-2 box-border overflow-visible rounded-xl border border-[#E8EAF4] bg-white p-3 shadow-[0_8px_20px_rgba(17,16,76,0.12)]"
              : `absolute top-full z-[200] mt-[14px] box-border h-auto min-h-[219px] w-[min(376px,calc(100vw-2rem))] overflow-visible rounded-xl border border-[#E8EAF4] bg-white p-3 shadow-[0_16px_40px_rgba(17,16,76,0.24)] sm:p-4 ${
                  tipAlign === "end" ? "right-0 left-auto" : "left-0"
                }`
          }
        >
          {role.whatYoullDo ? (
            <div className="mb-3">
              <p className="font-[var(--font-poppins)] text-[12px] font-bold uppercase tracking-[2px] text-[#F60996] sm:text-[14px]">
                Short description
              </p>
              <p className="mt-1 font-[var(--font-inter)] text-[12px] font-semibold leading-[1.5] text-[#080F40] sm:text-[13px]">
                {role.whatYoullDo}
              </p>
            </div>
          ) : null}
          {role.requirements ? (
            <div>
              <p className="font-[var(--font-poppins)] text-[12px] font-bold uppercase tracking-[2px] text-[#F60996] sm:text-[14px]">
                Short requirements
              </p>
              <p className="mt-1 font-[var(--font-inter)] text-[12px] font-semibold leading-[1.5] text-[#080F40] sm:text-[13px]">
                {role.requirements}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function CareersOpportunities() {
  const d = careersOpportunities;
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const isMobile = useIsMobileLayout();
  const lastIndex = careersCategories.length - 1;

  return (
    <section
      id="opportunities"
      className="scroll-mt-28 relative z-40 overflow-visible bg-white pb-10 pt-5 sm:pb-14 sm:pt-7 lg:pb-16 lg:pt-8"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <SafeImage
          src={d.backgroundImage}
          alt=""
          fill
          quality={100}
          unoptimized
          sizes="100vw"
          className="h-full w-full object-cover object-center lg:object-fill"
        />
      </div>
      <Container className="relative z-10 mt-[170px] max-w-[1440px] !px-4 sm:!mt-[135px] sm:!px-6 lg:!mt-[70px] lg:!px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[var(--font-poppins)] text-[13px] font-bold uppercase leading-[1.4] tracking-[2px] text-[#F60996] sm:text-[15px] lg:text-[17px]">
            {d.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-poppins)] text-[26px] font-bold leading-[1.12] tracking-[-0.8px] text-[#080F40] sm:text-[34px] lg:text-[45px] lg:tracking-[-1.2px]">
            {d.titleBefore}
            <span className="text-[#F60996]">{d.titleAccent}</span>
          </h2>
          <p className="mt-3 font-[var(--font-inter)] text-[13px] font-semibold leading-[1.6] tracking-normal text-[#080F40] sm:mt-4 sm:text-[14px] lg:text-[15px]">
            {d.lead}
          </p>
        </div>

        <div className="relative z-20 mt-6 grid justify-items-center gap-4 overflow-visible sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {careersCategories.map((cat, index) => {
            // Keep tips inside the viewport on right-edge columns (esp. Paid Media).
            const tipAlign: "start" | "end" =
              cat.id === "paid-media" || index === lastIndex || index >= 3
                ? "end"
                : "start";
            const isActive = hoverKey?.startsWith(`${cat.id}:`) ?? false;

            return (
              <article
                key={cat.id}
                className={`relative flex w-full max-w-[265px] min-h-0 flex-col overflow-visible rounded-2xl bg-white shadow-[0_8px_28px_rgba(17,16,76,0.08)] sm:max-w-none xl:max-w-[265px] ${
                  isActive ? "z-50" : "z-10"
                }`}
              >
                <header
                  className="box-border flex h-[84px] w-full items-center overflow-hidden rounded-[12px] text-white sm:h-[94px]"
                  style={{ background: cat.headerBg }}
                >
                  <div className="flex h-full w-[40%] shrink-0 items-center justify-center px-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.icon}
                      alt={cat.iconAlt}
                      width={cat.iconWidth}
                      height={cat.iconHeight}
                      className="max-h-[70%] max-w-[85%] object-contain"
                      draggable={false}
                    />
                  </div>
                  <div className="flex h-full w-[60%] items-center px-2 pr-3">
                    <p className="font-[var(--font-poppins)] text-[13px] font-bold leading-[1.3] tracking-[-0.2px] sm:text-[14px]">
                      {cat.name}
                    </p>
                  </div>
                </header>
                <ul className="relative z-30 flex-1 overflow-visible px-1 py-1">
                  {cat.roles.map((role) => {
                    const key = `${cat.id}:${role.title}`;
                    return (
                      <RoleRow
                        key={role.title}
                        role={role}
                        tipAlign={tipAlign}
                        isMobile={isMobile}
                        showTip={hoverKey === key}
                        onEnter={() => setHoverKey(key)}
                        onLeave={() => setHoverKey(null)}
                        onToggle={() =>
                          setHoverKey((prev) => (prev === key ? null : key))
                        }
                      />
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
