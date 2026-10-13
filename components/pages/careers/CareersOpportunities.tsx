"use client";

import { useState } from "react";
import { Container } from "@/components/shared/Container";
import {
  careersCategories,
  careersOpportunities,
  type CareersRole,
} from "@/data/careers";

function RoleRow({
  role,
  accent,
  active,
  onToggle,
}: {
  role: CareersRole;
  accent: string;
  active: boolean;
  onToggle: () => void;
}) {
  const hasDetail = Boolean(role.whatYoullDo || role.requirements);

  return (
    <li className="relative border-b border-[#E8EAF4] last:border-b-0">
      <button
        type="button"
        onClick={hasDetail ? onToggle : undefined}
        className={`flex w-full items-start justify-between gap-2 px-3 py-3 text-left font-[var(--font-montserrat)] text-[14px] font-semibold leading-snug text-[#11104C] transition hover:bg-[#F7F8FC] sm:text-[15px] ${
          hasDetail ? "cursor-pointer" : "cursor-default"
        }`}
        aria-expanded={hasDetail ? active : undefined}
      >
        <span>{role.title}</span>
        {role.talentPool ? (
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: accent }}
          >
            Talent pool
          </span>
        ) : null}
      </button>

      {hasDetail && active ? (
        <div className="absolute left-0 right-0 top-full z-20 mx-2 mt-1 rounded-xl border border-[#E8EAF4] bg-white p-4 shadow-[0_16px_40px_rgba(17,16,76,0.16)]">
          {role.whatYoullDo ? (
            <div className="mb-3">
              <p className="font-[var(--font-montserrat)] text-[11px] font-bold uppercase tracking-wide text-[#E3058D]">
                What you&apos;ll do
              </p>
              <p className="mt-1 font-[var(--font-montserrat)] text-[13px] font-medium leading-relaxed text-[#11104C]/80">
                {role.whatYoullDo}
              </p>
            </div>
          ) : null}
          {role.requirements ? (
            <div>
              <p className="font-[var(--font-montserrat)] text-[11px] font-bold uppercase tracking-wide text-[#E3058D]">
                Requirements
              </p>
              <p className="mt-1 font-[var(--font-montserrat)] text-[13px] font-medium leading-relaxed text-[#11104C]/80">
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
  const [openKey, setOpenKey] = useState<string | null>("technical:GHL Specialist");

  return (
    <section id="opportunities" className="scroll-mt-28 bg-[#F5F6FB] py-16 sm:py-24">
      <Container className="max-w-[1440px] !px-6 lg:!px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-[var(--font-montserrat)] text-[13px] font-bold uppercase tracking-[0.14em] text-[#E3058D]">
            {d.eyebrow}
          </p>
          <h2 className="mt-3 font-[var(--font-poppins)] text-[36px] font-semibold leading-[1.15] text-[#11104C] sm:text-[48px] lg:text-[56px]">
            {d.titleBefore}
            <span className="text-[#E3058D]">{d.titleAccent}</span>
          </h2>
          <p className="mt-4 font-[var(--font-montserrat)] text-[18px] font-medium leading-[1.7] text-[#11104C]/75">
            {d.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {careersCategories.map((cat) => (
            <article
              key={cat.id}
              className="flex min-h-0 flex-col overflow-visible rounded-2xl bg-white shadow-[0_8px_28px_rgba(17,16,76,0.08)]"
            >
              <header
                className="rounded-t-2xl px-4 py-4 text-center text-white"
                style={{ background: cat.headerBg }}
              >
                <p className="font-[var(--font-montserrat)] text-[13px] font-bold leading-snug sm:text-[14px]">
                  {cat.name}
                </p>
              </header>
              <ul className="relative flex-1 px-1 py-1">
                {cat.roles.map((role) => {
                  const key = `${cat.id}:${role.title}`;
                  return (
                    <RoleRow
                      key={role.title}
                      role={role}
                      accent={cat.accent}
                      active={openKey === key}
                      onToggle={() => setOpenKey((prev) => (prev === key ? null : key))}
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
