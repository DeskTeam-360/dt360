"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import {
  careersCategories,
  careersOpportunities,
  type CareersRole,
} from "@/data/careers";

function RoleRow({
  role,
  showTip,
  onEnter,
  onLeave,
}: {
  role: CareersRole;
  showTip: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const hasDetail = Boolean(role.whatYoullDo || role.requirements);

  return (
    <li
      className="relative border-b border-[#E8EAF4] last:border-b-0"
      onMouseEnter={hasDetail ? onEnter : undefined}
      onMouseLeave={hasDetail ? onLeave : undefined}
      onFocus={hasDetail ? onEnter : undefined}
      onBlur={hasDetail ? onLeave : undefined}
    >
      <div
        className="flex w-full items-center justify-between gap-1.5 px-2.5 py-2.5 text-left sm:px-3 sm:py-3"
        tabIndex={hasDetail ? 0 : undefined}
        role={hasDetail ? "button" : undefined}
        aria-describedby={hasDetail && showTip ? `role-tip-${role.title}` : undefined}
      >
        <span className="min-w-0 whitespace-nowrap font-[var(--font-inter)] text-[11px] font-semibold leading-[1.6] tracking-normal text-[#080F40]">
          {role.title}
        </span>
        {role.talentPool ? (
          <span className="shrink-0 rounded-full bg-[#EAE5FD] px-1.5 py-px font-[var(--font-poppins)] text-[8px] font-bold uppercase leading-none tracking-wide text-[#6646BD]">
            Talent pool
          </span>
        ) : null}
      </div>

      {hasDetail && showTip ? (
        <div
          id={`role-tip-${role.title}`}
          role="tooltip"
          className="absolute left-0 top-full z-20 mt-1 box-border h-auto max-h-[209px] w-[min(376px,calc(100vw-2rem))] overflow-auto rounded-xl border border-[#E8EAF4] bg-white p-3 shadow-[0_16px_40px_rgba(17,16,76,0.16)] sm:h-[209px] sm:p-4"
        >
          {role.whatYoullDo ? (
            <div className="mb-3">
              <p className="font-[var(--font-poppins)] text-[12px] font-bold uppercase tracking-[2px] text-[#F60996] sm:text-[14px]">
                What you&apos;ll do
              </p>
              <p className="mt-1 font-[var(--font-inter)] text-[12px] font-semibold leading-[1.5] text-[#080F40] sm:text-[13px]">
                {role.whatYoullDo}
              </p>
            </div>
          ) : null}
          {role.requirements ? (
            <div>
              <p className="font-[var(--font-poppins)] text-[12px] font-bold uppercase tracking-[2px] text-[#F60996] sm:text-[14px]">
                Requirements
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

  return (
    <section
      id="opportunities"
      className="scroll-mt-28 relative overflow-hidden bg-[#F5F6FB] pb-10 pt-5 sm:pb-14 sm:pt-7 lg:pb-16 lg:pt-8"
    >
      <SafeImage
        src={d.backgroundImage}
        alt=""
        fill
        quality={100}
        unoptimized
        sizes="100vw"
        className="h-full w-full object-cover object-center lg:object-fill"
        aria-hidden
      />
      <Container className="relative z-10 max-w-[1440px] !px-4 sm:!px-6 lg:!px-20">
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

        <div className="mt-6 grid justify-items-center gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {careersCategories.map((cat) => (
            <article
              key={cat.id}
              className="flex w-full max-w-[265px] min-h-0 flex-col overflow-visible rounded-2xl bg-white shadow-[0_8px_28px_rgba(17,16,76,0.08)] sm:max-w-none xl:max-w-[265px]"
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
              <ul className="relative flex-1 px-1 py-1">
                {cat.roles.map((role) => {
                  const key = `${cat.id}:${role.title}`;
                  return (
                    <RoleRow
                      key={role.title}
                      role={role}
                      showTip={hoverKey === key}
                      onEnter={() => setHoverKey(key)}
                      onLeave={() => setHoverKey(null)}
                    />
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
