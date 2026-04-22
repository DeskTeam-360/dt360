"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type NavKey = "how" | "services" | "showcase" | "about" | null;

type NavDropdownLink = { label: string; href: string };

/** Dummy dropdown — ubah label/href di sini (satu file) */
const howItWorksDropdown: NavDropdownLink[] = [
  { label: "Option 1", href: "#" },
  { label: "Option 2", href: "#" },
];

const showcaseDropdown: NavDropdownLink[] = [
  { label: "Option 1", href: "#" },
  { label: "Option 2", href: "#" },
];

const aboutDropdown: NavDropdownLink[] = [
  { label: "Option 1", href: "#" },
  { label: "Option 2", href: "#" },
];

const servicesDropdown: NavDropdownLink[] = [
  { label: "Option 1", href: "#" },
  { label: "Option 2", href: "#" },
  { label: "Option 3", href: "#" },
  { label: "Option 4", href: "#" },
  { label: "Option 5", href: "#" },
  { label: "Option 6", href: "#" },
];

const servicesSeeAll: NavDropdownLink = {
  label: "Option 7",
  href: "#",
};

const servicesLinksAll: NavDropdownLink[] = [...servicesDropdown, servicesSeeAll];

function LogoMark() {
  return (
    <Image
      src="/deskteam360-logo-white 1.png"
      alt="DeskTeam360"
      width={220}
      height={44}
      className="h-8 w-auto shrink-0 object-contain object-left sm:h-7"
      priority
    />
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      className={`shrink-0 opacity-95 transition-transform duration-200 ${open ? "-rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M2 4.25h8L6 9.25 2 4.25z" fill="currentColor" />
    </svg>
  );
}

/** Panel dropdown desktop — `alignEnd` untuk menu di kanan (supaya tidak keluar layar) */
function DesktopDropdown({
  items,
  alignEnd,
}: {
  items: NavDropdownLink[];
  alignEnd?: boolean;
}) {
  return (
    <div
      className={`absolute top-full z-50 pt-2 ${alignEnd ? "right-0 left-auto" : "left-0"}`}
      role="presentation"
    >
      <div className="min-w-[220px] rounded-xl border border-white/10 bg-[#0b2255] p-2 text-sm shadow-xl">
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`}>
              <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteNavbar() {
  const [openMenu, setOpenMenu] = useState<NavKey>(null);
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
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-2 py-4 sm:px-3 lg:px-3">
        <a href="/" className="flex items-center font-semibold tracking-tight">
          <LogoMark />
        </a>

        <nav className="ml-auto hidden items-center gap-4 text-sm font-medium text-white/95 lg:flex">
          <a className="rounded-md px-3 py-2 hover:bg-white/10" href="/">
            Home
          </a>
          <div className="relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "how" ? "bg-white/10" : ""}`}
              aria-expanded={openMenu === "how"}
              onClick={() => toggle("how")}
            >
              How it Works
              <Chevron open={openMenu === "how"} />
            </button>
            {openMenu === "how" && <DesktopDropdown items={howItWorksDropdown} />}
          </div>
          <div className="relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "services" ? "bg-white/10" : ""}`}
              aria-expanded={openMenu === "services"}
              onClick={() => toggle("services")}
            >
              Services
              <Chevron open={openMenu === "services"} />
            </button>
            {openMenu === "services" && <DesktopDropdown items={servicesLinksAll} />}
          </div>
          <div className="relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "showcase" ? "bg-white/10" : ""}`}
              aria-expanded={openMenu === "showcase"}
              onClick={() => toggle("showcase")}
            >
              Showcase
              <Chevron open={openMenu === "showcase"} />
            </button>
            {openMenu === "showcase" && <DesktopDropdown items={showcaseDropdown} />}
          </div>
          <a className="rounded-md px-3 py-2 hover:bg-white/10" href="#">
            Blog
          </a>
          <div className="relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 ${openMenu === "about" ? "bg-white/10" : ""}`}
              aria-expanded={openMenu === "about"}
              onClick={() => toggle("about")}
            >
              About
              <Chevron open={openMenu === "about"} />
            </button>
            {openMenu === "about" && <DesktopDropdown items={aboutDropdown} alignEnd />}
          </div>

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
                {servicesLinksAll.map((item, i) => (
                  <li key={`svc-${i}-${item.label}`}>
                    <a
                      href={item.href}
                      className="block rounded-md py-1.5 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
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

    </header>
  );
}
