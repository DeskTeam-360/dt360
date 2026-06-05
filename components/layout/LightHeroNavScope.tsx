"use client";

import { useEffect, type ReactNode } from "react";

const DATA_ATTR = "data-light-hero-nav";

/** Marks the page for blog-style navbar (transparent + dark links). Required when nav sits outside this subtree in root layout. */
export function LightHeroNavScope({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute(DATA_ATTR, "true");
    return () => {
      document.documentElement.removeAttribute(DATA_ATTR);
    };
  }, []);

  return children;
}

export function readLightHeroNavFromDocument(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute(DATA_ATTR) === "true";
}
