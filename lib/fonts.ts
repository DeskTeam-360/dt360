import { Caveat, Readex_Pro, Russo_One } from "next/font/google";

/** Single instance for the whole app: avoid loading @font-face twice. */
export const fontRussoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo-one",
});

/** Pricing card price (homepage) — Readex Pro Bold. */
export const fontReadexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-readex-pro",
});

/** Careers handwritten CTA — Caveat. */
export const fontCaveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});
