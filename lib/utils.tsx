import { Fragment, type ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const NBSP = "\u00A0";

/** Join the last N words with non-breaking space to avoid an orphan line. */
export function tieLastWords(text: string, wordCount: number): string {
  if (wordCount <= 0) return text;
  const words = text.trim().split(/\s+/);
  if (words.length <= wordCount) return words.join(NBSP);
  return [...words.slice(0, -wordCount), words.slice(-wordCount).join(NBSP)].join(" ");
}

type AvoidOrphansOptions = {
  /** How many trailing words must not break apart (default: 2). */
  tieCount?: number;
};

/**
 * Reduce last-line orphans by tying only the last 2 (or 3) words.
 * Does not tie the whole clause after `&` — that leaves a short word
 * alone on the line above (e.g. "Workflows," by itself).
 */
export function avoidOrphansInPhrase(text: string, options?: AvoidOrphansOptions): string {
  const s = text.trim();
  if (!s) return s;
  const words = s.split(/\s+/);
  const tieCount = options?.tieCount ?? 2;
  if (words.length <= tieCount) return words.join(NBSP);
  return tieLastWords(s, tieCount);
}

/**
 * Split a string on `**snippet**` into text fragments + <strong>.
 * Single level only (no nesting); for Services mega-menu, etc.
 */
export function formatInlineBoldStars(text: string): ReactNode {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((seg, i) => {
    if (!seg) return null;
    if (seg.startsWith("**") && seg.endsWith("**") && seg.length > 4) {
      return (
        <strong key={i} className="font-bold text-[#282830]">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{seg}</Fragment>;
  });
}
