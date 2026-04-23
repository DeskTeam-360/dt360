"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNavItems, servicesMegaItems, servicesPromo, type NavItem } from "./data";
import { LogoMark } from "./LogoMark";

function Chevron({ up }: { up?: boolean }) {
  return (
    <svg
      className={`size-3.5 shrink-0 opacity-80 ${up ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
    </svg>
  );
}

function ServiceThumb({ index }: { index: number }) {
  const hues = ["#dbeafe", "#fce7f3", "#fef3c7", "#e0e7ff", "#d1fae5", "#fee2e2"];
  const bg = hues[index % hues.length];
  return (
    <div
      className="size-14 shrink-0 overflow-hidden rounded-md border border-slate-200/80 bg-slate-100"
      style={{ background: `linear-gradient(135deg, ${bg}, #fff)` }}
    />
  );
}

function ServicesMegaPanel() {
  const left = servicesMegaItems.slice(0, 4);
  const right = servicesMegaItems.slice(4, 8);

  return (
    <div className="rounded-b-xl border border-t-2 border-slate-200 border-t-[#2563eb] bg-white shadow-2xl shadow-slate-900/10">
      <div className="grid max-w-6xl grid-cols-1 lg:grid-cols-[1fr_minmax(260px,320px)]">
        <div className="p-6 pr-4 lg:p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Our Services
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <ul className="flex flex-col gap-5">
              {left.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group/item flex gap-3 rounded-lg p-1 outline-none transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-pink-500"
                  >
                    <ServiceThumb index={i} />
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold leading-snug ${
                          item.highlighted ? "text-violet-600" : "text-slate-900"
                        } group-hover/item:text-[#0b1028]`}
                      >
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-5">
              {right.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group/item flex gap-3 rounded-lg p-1 outline-none transition hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-pink-500"
                  >
                    <ServiceThumb index={i + 4} />
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold leading-snug ${
                          item.highlighted ? "text-violet-600" : "text-slate-900"
                        } group-hover/item:text-[#0b1028]`}
                      >
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative flex flex-col bg-[#fce7f3] lg:min-h-[320px]">
          <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-40 lg:flex-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={servicesPromo.imageSrc}
              alt={servicesPromo.imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6 pt-5">
            <h3 className="text-lg font-bold leading-tight text-[#0b1028] sm:text-xl">
              {servicesPromo.headline}{" "}
              <span className="text-pink-600">{servicesPromo.headlineAccent}</span>{" "}
              {servicesPromo.headlineSuffix}
            </h3>
            <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">{servicesPromo.body}</p>
            <div className="mt-auto pt-2">
              <Link
                href={servicesPromo.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b1028] shadow-sm ring-1 ring-slate-200/80 transition hover:bg-slate-50"
              >
                {servicesPromo.ctaLabel}
                <span className="flex size-7 items-center justify-center rounded-full bg-[#0b1028] text-white">
                  <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M3 10a.75.75 0 01.75-.75h9.546l-3.955-3.955a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l3.955-3.955H3.75A.75.75 0 013 10z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLinkRow({
  item,
  onNavigate,
  servicesChevronClassName,
}: {
  item: NavItem;
  onNavigate: () => void;
  /** Kelas tambahan untuk chevron Services (mis. rotate saat group-hover mega) */
  servicesChevronClassName?: string;
}) {
  const isServices = item.mega === "services";
  const chevron =
    item.chevron === "down" ? (
      <span className={isServices ? servicesChevronClassName : undefined}>
        <Chevron up={false} />
      </span>
    ) : null;

  if (isServices) {
    return (
      <Link
        href={item.href}
        className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-white outline-none transition hover:text-amber-200/90 group-hover:text-amber-300 focus-visible:ring-2 focus-visible:ring-amber-300"
        onClick={onNavigate}
      >
        {item.label}
        {chevron}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-white/95 transition hover:text-amber-200/90 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none"
      onClick={onNavigate}
    >
      {item.label}
      {chevron}
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1028] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <LogoMark className="size-9" />
          <span className="text-lg font-bold tracking-tight">DeskTeam360</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Utama">
          {mainNavItems.map((item) =>
            item.mega === "services" ? (
              <div key={item.label} className="group relative">
                <NavLinkRow
                  item={item}
                  onNavigate={() => {}}
                  servicesChevronClassName="transition-transform duration-150 group-hover:[&_svg]:-rotate-180"
                />
                <div
                  className="absolute left-1/2 top-full z-[60] -mt-2 w-[min(100vw-1.5rem,1152px)] -translate-x-1/2 pt-3"
                  role="region"
                  aria-label="Layanan"
                >
                  <div
                    className="pointer-events-none translate-y-1 opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100"
                  >
                    <ServicesMegaPanel />
                  </div>
                </div>
              </div>
            ) : (
              <NavLinkRow key={item.label} item={item} onNavigate={() => {}} />
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="h-6 w-px bg-white/25" aria-hidden />
          <Link
            href="#login"
            className="text-sm font-medium text-white/90 transition hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-[#e11d8c] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-900/20 transition hover:bg-[#c9167a]"
          >
            Book a call
            <span aria-hidden className="text-base leading-none">
              »
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/90 ring-1 ring-white/15 transition hover:bg-white/10 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          {mobileOpen ? (
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/10 bg-[#0b1028] md:hidden ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
          {mainNavItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm font-medium text-white/95 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.mega === "services" && (
                <div className="mt-2 rounded-lg border border-white/10 bg-[#0f1536] p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
                    Services
                  </p>
                  <ul className="grid gap-1">
                    {servicesMegaItems.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="block rounded-md px-2 py-1.5 text-sm text-white/85 hover:bg-white/10"
                          onClick={() => setMobileOpen(false)}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
            <Link
              href="#login"
              className="text-sm font-medium text-white/90"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="#book"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e11d8c] px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
