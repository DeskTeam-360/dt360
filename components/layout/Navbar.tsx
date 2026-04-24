"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import { DeskTeamLogo } from "./DeskTeamLogo";
import { NavDropdown } from "./NavDropdown";
import { navAbout, navHowItWorks, navServices, navShowcase, type NavMenuItem } from "@/data/nav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#001f3f] to-[#000814] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.06)]">
        <Container className="max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
            <DeskTeamLogo />

            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Primary navigation"
            >
              <Link
                href="/"
                className="text-sm font-medium text-white transition-colors hover:text-white/80"
              >
                Home
              </Link>
              <NavDropdown label="How it Works" items={navHowItWorks} />
              <NavDropdown label="Services" items={navServices} />
              <NavDropdown label="Showcase" items={navShowcase} />
              <Link
                href="/blog"
                className="text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                Blog
              </Link>
              <NavDropdown label="About" items={navAbout} />
            </nav>

            <div className="hidden h-6 w-px shrink-0 bg-white/25 lg:block" aria-hidden />

            <div className="hidden items-center gap-5 lg:flex">
              <Link
                href="/login"
                className="text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/book-a-call"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#e4277a] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-[#f0308a]"
              >
                Book a call
                <ChevronsRight className="size-4" aria-hidden />
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </Container>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[100] lg:hidden" id="mobile-nav" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 bg-gradient-to-b from-[#001f3f] to-[#000814] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <span className="text-sm font-semibold text-white">Menu</span>
              <button
                type="button"
                className="rounded-lg p-2 text-white hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile navigation">
              <MobileLink href="/" onNavigate={() => setMobileOpen(false)}>
                Home
              </MobileLink>
              <MobileGroup title="How it Works" items={navHowItWorks} onPick={() => setMobileOpen(false)} />
              <MobileGroup title="Services" items={navServices} onPick={() => setMobileOpen(false)} />
              <MobileGroup title="Showcase" items={navShowcase} onPick={() => setMobileOpen(false)} />
              <MobileLink href="/blog" onNavigate={() => setMobileOpen(false)}>
                Blog
              </MobileLink>
              <MobileGroup title="About" items={navAbout} onPick={() => setMobileOpen(false)} />
              <hr className="my-3 border-white/10" />
              <MobileLink href="/login" onNavigate={() => setMobileOpen(false)}>
                Log in
              </MobileLink>
              <Link
                href="/book-a-call"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#e4277a] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book a call
                <ChevronsRight className="size-4" aria-hidden />
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  title,
  items,
  onPick,
}: {
  title: string;
  items: NavMenuItem[];
  onPick: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-white"
        aria-expanded={open}
      >
        {title}
        <ChevronSmall className={cn("size-4 transition", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="border-t border-white/5 pb-2 pt-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onPick}
              className="block px-5 py-2 text-sm text-white/75 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ChevronSmall({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronsRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l6 7-6 7M6 5l6 7-6 7" />
    </svg>
  );
}
