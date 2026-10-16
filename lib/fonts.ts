import { Readex_Pro, Russo_One } from "next/font/google";
import localFont from "next/font/local";

/**
 * Self-hosted Montserrat (latin 400–800).
 * Avoids Next 16 / Turbopack flakes when Google Fonts returns extensionless
 * `/l/font?kit=…&skey=…` URLs (vercel/next.js#99114).
 */
export const fontMontserrat = localFont({
  src: [
    {
      path: "../app/fonts/montserrat/montserrat-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/montserrat/montserrat-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/montserrat/montserrat-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/montserrat/montserrat-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/montserrat/montserrat-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: "Arial",
});

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
