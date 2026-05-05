import { Russo_One } from "next/font/google";

/** Satu instance untuk seluruh app: hindari dua kali load @font-face. */
export const fontRussoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo-one",
});
