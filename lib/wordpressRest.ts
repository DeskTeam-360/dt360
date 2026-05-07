/** Helper URL + fetch untuk WordPress REST (`rest_route=` atau `/wp-json`). */

export function getWordPressRestBase(): string | null {
  const base =
    process.env.WORDPRESS_REST_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_WORDPRESS_REST_BASE_URL?.trim();
  return base || null;
}

export function joinWordPressRestUrl(base: string, route: string): string {
  const path = route.startsWith("/") ? route : `/${route}`;
  const trimmed = base.trim().replace(/\/+$/, "");
  if (trimmed.includes("rest_route=")) {
    return `${trimmed}${path}`;
  }
  if (trimmed.endsWith("/wp-json")) {
    return `${trimmed}${path}`;
  }
  return `${trimmed}/wp-json${path}`;
}

export function unwrapList(json: unknown): unknown[] {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object") {
    const record = json as Record<string, unknown>;
    for (const key of ["data", "items", "testimonials", "teams", "results", "records"]) {
      const inner = record[key];
      if (Array.isArray(inner)) return inner;
    }
  }
  return [];
}

export async function fetchWpRouteJson(route: string, logLabel: string): Promise<unknown | null> {
  const base = getWordPressRestBase();
  if (!base) return null;

  const path = route.startsWith("/") ? route : `/${route}`;
  const url = joinWordPressRestUrl(base, path);

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status !== 404) {
      console.warn(`[${logLabel}] HTTP ${res.status} from ${url}`);
    }
    return null;
  }

  return res.json();
}
