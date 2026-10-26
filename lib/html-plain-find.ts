import { normalizeQuotes } from "@/data/gate5S9LinkPatches";

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  ndash: "–",
  mdash: "—",
  hellip: "…",
};

/** Decode a single `&...;` / `&#...;` / `&#x...;` entity to plain text. */
export function decodeHtmlEntity(entity: string): string {
  const named = /^&([a-z]+);$/i.exec(entity);
  if (named) {
    return NAMED_ENTITIES[named[1].toLowerCase()] ?? entity;
  }
  const dec = /^&#(\d+);$/.exec(entity);
  if (dec) {
    return String.fromCodePoint(Number(dec[1]));
  }
  const hex = /^&#x([0-9a-f]+);$/i.exec(entity);
  if (hex) {
    return String.fromCodePoint(Number.parseInt(hex[1], 16));
  }
  return entity;
}

function readHtmlChar(
  html: string,
  index: number,
): { char: string; consumed: number } | null {
  if (index >= html.length) return null;

  if (html[index] === "<") {
    const close = html.indexOf(">", index);
    if (close < 0) return { char: "", consumed: html.length - index };
    return { char: "", consumed: close - index + 1 };
  }

  if (html[index] === "&") {
    const semi = html.indexOf(";", index);
    if (semi > index && semi - index < 16) {
      const entity = html.slice(index, semi + 1);
      return { char: decodeHtmlEntity(entity), consumed: entity.length };
    }
  }

  return { char: html[index]!, consumed: 1 };
}

function normChar(ch: string): string {
  return normalizeQuotes(ch);
}

function isSpace(ch: string): boolean {
  return ch.length > 0 && /\s/.test(ch);
}

/**
 * Locate `plainFind` inside HTML, skipping tags and decoding entities.
 * Returns the [start, end) range in the original HTML string.
 */
export function findPlainTextRange(
  html: string,
  plainFind: string,
): { start: number; end: number } | null {
  const needle = normalizeQuotes(plainFind).replace(/\s+/g, " ").trim();
  if (!needle || !html) return null;

  for (let start = 0; start < html.length; start += 1) {
    // Don't start a match inside a tag
    if (html[start] === "<") {
      const close = html.indexOf(">", start);
      if (close < 0) break;
      start = close;
      continue;
    }

    let hi = start;
    let ni = 0;
    let matchedAny = false;

    while (ni < needle.length && hi < html.length) {
      const read = readHtmlChar(html, hi);
      if (!read) break;

      if (read.char === "") {
        hi += read.consumed;
        continue;
      }

      const hay = normChar(read.char);
      const ned = needle[ni]!;

      if (isSpace(hay) && isSpace(ned)) {
        matchedAny = true;
        while (ni < needle.length && isSpace(needle[ni]!)) ni += 1;
        hi += read.consumed;
        // skip extra whitespace in html
        while (hi < html.length) {
          const next = readHtmlChar(html, hi);
          if (!next) break;
          if (next.char === "") {
            hi += next.consumed;
            continue;
          }
          if (!isSpace(next.char)) break;
          hi += next.consumed;
        }
        continue;
      }

      if (hay === ned) {
        matchedAny = true;
        ni += 1;
        hi += read.consumed;
        continue;
      }

      matchedAny = false;
      break;
    }

    if (matchedAny && ni >= needle.length) {
      return { start, end: hi };
    }
  }

  return null;
}
