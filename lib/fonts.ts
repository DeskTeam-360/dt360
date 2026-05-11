import { Readex_Pro, Russo_One } from "next/font/google";

/** Satu instance untuk seluruh app: hindari dua kali load @font-face. */
export const fontRussoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo-one",
});

/** Harga kartu pricing (homepage) — Readex Pro Bold. */
export const fontReadexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-readex-pro",
});
