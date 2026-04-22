"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type NavKey = "how" | "services" | "showcase" | "about" | null;

const serviceItems = [
  {
    label: "Website Tasks",
    iconBg: "bg-[#fecaca]",
    icon: (
      <path
        d="M8 10h24v20H8V10zm4 4v12h16V14H12zm6 2h4v2h-4v-2zm-2 6l2-2 2 2 2-2"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "CRM, Automation, and Marketing Tech",
    iconBg: "bg-[#fbcfe8]",
    icon: (
      <>
        <rect x="10" y="12" width="20" height="14" rx="2" fill="none" stroke="white" strokeWidth="1.6" />
        <circle cx="20" cy="19" r="3" fill="none" stroke="white" strokeWidth="1.4" />
        <path d="M26 26h6v6h-6z" fill="none" stroke="white" strokeWidth="1.4" />
      </>
    ),
  },
  {
    label: "Email Marketing and Cold Outreach Setup",
    iconBg: "bg-[#fde68a]",
    icon: (
      <>
        <rect x="12" y="14" width="16" height="12" rx="2" fill="none" stroke="white" strokeWidth="1.6" />
        <path d="M12 16l8 6 8-6" fill="none" stroke="white" strokeWidth="1.6" />
        <path d="M16 28h12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Video Editing and Production",
    iconBg: "bg-[#ddd6fe]",
    icon: (
      <>
        <rect x="11" y="13" width="18" height="14" rx="2" fill="none" stroke="white" strokeWidth="1.6" />
        <path d="M26 18l6-3v14l-6-3v-8z" fill="white" fillOpacity="0.9" />
      </>
    ),
  },
  {
    label: "Graphic Design",
    iconBg: "bg-[#bae6fd]",
    icon: (
      <path
        d="M14 28l10-14 6 6-10 14-6-2-2-6zm8-10l4 4"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "On-Page Marketing Tasks",
    iconBg: "bg-[#e2e8f0]",
    icon: (
      <>
        <rect x="11" y="13" width="18" height="14" rx="2" fill="none" stroke="#64748b" strokeWidth="1.6" />
        <path d="M15 24l4 4 8-10" fill="none" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
] as const;

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="45%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
      <path
        fill="url(#logoGrad)"
        d="M6 28c2-10 6-18 14-22 4-2 8-2 10 1 1 2 0 5-3 8-4 4-10 7-16 8-3 1-5 3-5 5z M18 8c6 1 11 5 12 11 0 3-1 6-4 8-2 2-5 3-8 3 5-4 8-9 8-14 0-4-2-7-5-8h-3z"
      />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={`opacity-90 transition-transform ${open ? "-rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M3 4.5L6 7.5L9 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SiteNavbar() {
  const [openMenu, setOpenMenu] = useState<NavKey>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpenMenu(null), []);

  useEffect(() => {
    if (!openMenu) return;
    const onPointer = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        close();
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu, close]);

  const toggle = (key: NavKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  return (
    <header ref={navRef} className="relative z-30 border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <LogoMark />
          <span className="text-lg sm:text-xl">DeskTeam360</span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 text-sm font-medium text-white/95 lg:flex">
          <a className="rounded-md px-3 py-2 hover:bg-white/10" href="/">
            Home
          </a>
          <button
            type="button"
            className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "how" ? "bg-white/10" : ""}`}
            aria-expanded={openMenu === "how"}
            onClick={() => toggle("how")}
          >
            How it Works
            <Chevron open={openMenu === "how"} />
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "services" ? "bg-white/10 underline decoration-amber-400 decoration-2 underline-offset-[10px]" : ""}`}
            aria-expanded={openMenu === "services"}
            onClick={() => toggle("services")}
          >
            Services
            <Chevron open={openMenu === "services"} />
          </button>
          <button
            type="button"
            className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "showcase" ? "bg-white/10" : ""}`}
            aria-expanded={openMenu === "showcase"}
            onClick={() => toggle("showcase")}
          >
            Showcase
            <Chevron open={openMenu === "showcase"} />
          </button>
          <a className="rounded-md px-3 py-2 hover:bg-white/10" href="#">
            Blog
          </a>
          <button
            type="button"
            className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "about" ? "bg-white/10" : ""}`}
            aria-expanded={openMenu === "about"}
            onClick={() => toggle("about")}
          >
            About
            <Chevron open={openMenu === "about"} />
          </button>

          <span className="mx-2 h-5 w-px bg-white/30" aria-hidden />

          <a className="rounded-md px-3 py-2 hover:bg-white/10" href="#">
            Log in
          </a>
          <a
            href="#"
            className="ml-1 rounded-full bg-[#e11d74] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition hover:bg-[#c91662]"
          >
            Book a call
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-md p-2 text-white hover:bg-white/10"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
          <a href="#" className="rounded-full bg-[#e11d74] px-4 py-2 text-sm font-semibold">
            Book a call
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#081736] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <a className="rounded-lg px-3 py-2 hover:bg-white/10" href="/" onClick={() => setMobileOpen(false)}>
              Home
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-white/10" href="#" onClick={() => setMobileOpen(false)}>
              How it Works
            </a>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/10"
              onClick={() => setOpenMenu((prev) => (prev === "services" ? null : "services"))}
            >
              Services
              <Chevron open={openMenu === "services"} />
            </button>
            {openMenu === "services" && (
              <ul className="ml-2 space-y-1 border-l border-white/15 pl-3 text-white/90">
                {serviceItems.map((item) => (
                  <li key={item.label}>
                    <a href="#" className="block rounded-md py-1.5 hover:text-white" onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <a className="rounded-lg px-3 py-2 hover:bg-white/10" href="#" onClick={() => setMobileOpen(false)}>
              Showcase
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-white/10" href="#" onClick={() => setMobileOpen(false)}>
              Blog
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-white/10" href="#" onClick={() => setMobileOpen(false)}>
              About
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-white/10" href="#" onClick={() => setMobileOpen(false)}>
              Log in
            </a>
          </nav>
        </div>
      )}

      {openMenu === "services" && (
        <div className="absolute left-0 right-0 top-full z-40 hidden justify-center px-4 pb-6 pt-2 lg:flex">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200/80 bg-white p-4 text-slate-900 shadow-2xl shadow-black/40">
            <ul className="divide-y divide-slate-100">
              {serviceItems.map((item, i) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className="flex items-center gap-3 py-3 transition-colors first:pt-1 last:pb-1"
                    onMouseEnter={() => setHoveredService(i)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                      <svg width="28" height="28" viewBox="0 0 40 40" className="overflow-visible">
                        {item.icon}
                      </svg>
                    </span>
                    <span
                      className={`text-[15px] font-medium leading-snug ${hoveredService === i ? "text-[#6d28d9]" : "text-slate-800"}`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-sky-100 pt-4">
              <a
                href="#"
                className="mx-auto flex w-max items-center gap-2 rounded-full border-2 border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                See Full Services
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-900">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                    <path
                      d="M5 3l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {openMenu && openMenu !== "services" && (
        <div className="absolute left-0 right-0 top-full z-40 hidden justify-center px-4 pb-4 pt-2 lg:flex">
          <div className="min-w-[220px] rounded-xl border border-white/10 bg-[#0b2255] p-2 text-sm shadow-xl">
            {openMenu === "how" && (
              <ul className="space-y-1">
                <li>
                  <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="#">
                    3 simple steps
                  </a>
                </li>
                <li>
                  <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="#">
                    What we won&apos;t do
                  </a>
                </li>
              </ul>
            )}
            {openMenu === "showcase" && (
              <ul className="space-y-1">
                <li>
                  <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="#">
                    Graphics
                  </a>
                </li>
                <li>
                  <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="#">
                    Websites
                  </a>
                </li>
              </ul>
            )}
            {openMenu === "about" && (
              <ul className="space-y-1">
                <li>
                  <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="#">
                    Our story
                  </a>
                </li>
                <li>
                  <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="#">
                    Meet the team
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
