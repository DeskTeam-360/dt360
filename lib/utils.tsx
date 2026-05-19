import { Fragment, type ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const NBSP = "\u00A0";

/** Gabungkan N kata terakhir dengan non-breaking space agar tidak jadi orphan. */
export function tieLastWords(text: string, wordCount: number): string {
  if (wordCount <= 0) return text;
  const words = text.trim().split(/\s+/);
  if (words.length <= wordCount) return words.join(NBSP);
  return [...words.slice(0, -wordCount), words.slice(-wordCount).join(NBSP)].join(" ");
}

type AvoidOrphansOptions = {
  /** Berapa kata terakhir yang tidak boleh terpisah (default: 2). */
  tieCount?: number;
};

/**
 * Kurangi orphan baris terakhir dengan mengikat hanya 2 (atau 3) kata terakhir.
 * Tidak mengikat seluruh klauzul setelah `&` — itu membuat satu kata pendek
 * tertinggal di baris atas (mis. "Workflows," sendirian).
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
 * Pecah string dengan pola `**snippet**` jadi fragmen teks + <strong>.
 * Satu tingkat saja (tanpa nesting); untuk mega-menu Services dll.
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
