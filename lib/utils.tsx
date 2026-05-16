import { Fragment, type ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
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
