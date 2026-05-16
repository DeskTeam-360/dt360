"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn, formatInlineBoldStars } from "@/lib/utils";
import { megaServiceColumns, megaServicesFeatured } from "@/data/navMegaServices";

const PANEL_ID = "services-mega-panel";

type Props = {
  triggerClassName: string;
  useDarkTopNav: boolean;
  /** Halaman di bawah /services — penanda visual pada label Services */
  servicesRouteActive?: boolean;
};

export function ServicesMegaMenuDesktop({
  triggerClassName,
  useDarkTopNav,
  servicesRouteActive = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (!mq.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])");
      first?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, close]);

  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    ).filter((el) => el.offsetParent !== null);
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          "font-nav-primary flex items-center gap-1 rounded-lg px-1 py-0.5 text-left transition-colors",
          triggerClassName,
          servicesRouteActive &&
            !open &&
            (useDarkTopNav
              ? "text-[#b45309] underline decoration-[#b45309]/35 underline-offset-4"
              : "text-[#fde047] underline decoration-white/25 underline-offset-4"),
          open &&
            (useDarkTopNav
              ? "text-[#b45309] underline decoration-[#b45309]/40 underline-offset-4"
              : "text-[#fde047] underline decoration-white/30 underline-offset-4"),
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={PANEL_ID}
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <ChevronDown
          className={cn("size-3.5 shrink-0 opacity-80 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-[40] cursor-default bg-black/10 lg:top-[72px] lg:bg-black/5"
            aria-hidden
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          />
          <div
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Services menu"
            tabIndex={-1}
            className="fixed left-0 right-0 z-[45] max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#101651]/10 bg-white shadow-xl lg:top-[72px] lg:max-h-[calc(100dvh-72px)]"
            onKeyDown={handlePanelKeyDown}
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:p-0">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_429px] lg:items-stretch lg:gap-12">
                <div className="min-w-0 py-[38px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#101651]/55">Our Services</p>
                  <hr className="mt-2 border-[#101651]/12" />
                  <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-10">
                    {megaServiceColumns.map((column, colIdx) => (
                      <ul key={colIdx} className="flex min-w-0 flex-col gap-5" role="list">
                        {column.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-sky-50/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e4277a]"
                              onClick={close}
                            >
                              <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-[#f4f7fb] ring-1 ring-[#101651]/6">
                                <Image
                                  src={item.iconSrc}
                                  alt=""
                                  width={48}
                                  height={48}
                                  className="object-contain p-1"
                                  sizes="48px"
                                />
                              </span>
                              <span className="min-w-0">
                                <span className="block font-montserrat text-base font-bold leading-snug tracking-tight text-[#101651] group-hover:text-[#11104C]">
                                  {item.label}
                                </span>
                                <span className="mt-1 block text-sm font-medium leading-snug text-zinc-600">
                                  {formatInlineBoldStars(item.description)}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>

                <aside className="flex min-h-0 min-w-0 flex-col justify-center gap-5 bg-[#fdf2f8] px-6 py-[35px] lg:h-full lg:min-h-0">
                  <div className="relative mx-auto h-[133px] w-full max-w-[381px] shrink-0 overflow-hidden rounded-xl bg-white/60 shadow-sm ring-1 ring-[#101651]/8">
                    <Image
                      src={megaServicesFeatured.imageSrc}
                      alt={megaServicesFeatured.imageAlt}
                      fill
                      className="object-cover"
                      sizes="381px"
                      priority={false}
                    />
                  </div>
                  <div>
                    <p className="type-rule-h4 text-balance text-[#11104C] leading-[48px]">
                      {megaServicesFeatured.headlineBefore}
                      <span className="text-[#E3058D]">{megaServicesFeatured.headlineHighlight}</span>
                      {megaServicesFeatured.headlineAfter}
                    </p>
                    <p className="mt-3 w-[90%] max-w-full font-sans text-[10px] font-medium leading-normal text-[#11104C]">
                      <strong className="font-bold">{megaServicesFeatured.bodyLeadBold}</strong>
                      {megaServicesFeatured.bodyRest}
                    </p>
                  </div>
                  <Link
                    href={megaServicesFeatured.ctaHref}
                    className="font-nav-primary mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#101651] shadow-md ring-1 ring-[#101651]/10 transition hover:bg-[#101651] hover:text-white"
                    onClick={close}
                  >
                    {megaServicesFeatured.ctaLabel}
                    <span aria-hidden className="text-lg leading-none">
                      →
                    </span>
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
