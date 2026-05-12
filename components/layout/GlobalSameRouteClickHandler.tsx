"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1) || "/";
  }
  return pathname;
}

function isSameDocumentUrl(anchor: HTMLAnchorElement, loc: Location): boolean {
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("javascript:")) return false;

  let targetUrl: URL;
  try {
    targetUrl = new URL(anchor.href);
  } catch {
    return false;
  }

  if (targetUrl.origin !== loc.origin) return false;
  if (normalizePathname(targetUrl.pathname) !== normalizePathname(loc.pathname)) return false;
  if (targetUrl.search !== loc.search) return false;
  if (targetUrl.hash !== loc.hash) return false;

  return true;
}

/**
 * Delegasi klik (capture): tautan internal ke URL yang sama persis dengan halaman
 * aktif → scroll ke atas + refresh RSC (tanpa hard reload).
 */
export function GlobalSameRouteClickHandler() {
  const router = useRouter();

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = e.target;
      if (!(el instanceof Node)) return;

      const anchor = el instanceof Element ? el.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;

      if (anchor.target === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      if (!isSameDocumentUrl(anchor, window.location)) return;

      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      void router.refresh();
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [router]);

  return null;
}
