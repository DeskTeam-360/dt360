import { unstable_cache } from "next/cache";
import type { TeamMember } from "@/data/home";
import { teamMembers as staticFallback } from "@/data/home";
import { fetchWpRouteJson, getWordPressRestBase, unwrapList } from "@/lib/wordpressRest";

/** Endpoint custom — lihat https://deskteam360.com/wordpress/index.php?rest_route=/dt360/v1/teams */
const DEFAULT_ROUTE = "/dt360/v1/teams";

/** Warna chip `NAME | ROLE` (siklus jika anggota banyak). */
const LABEL_CLASSES = [
  "bg-[#9F731B]",
  "bg-[#A70767]",
  "bg-[#3D109A]",
  "bg-[#C5540A]",
  "bg-[#D03B0E]",
  "bg-[#83259A]",
] as const;

function renderedField(field: unknown): string {
  if (field && typeof field === "object" && "rendered" in field && typeof (field as { rendered: unknown }).rendered === "string") {
    return stripHtml((field as { rendered: string }).rendered);
  }
  return typeof field === "string" ? field.trim() : "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function pickString(...candidates: unknown[]): string {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
    if (typeof c === "number" && !Number.isNaN(c)) return String(c);
  }
  return "";
}

function featuredImageUrl(post: Record<string, unknown>): string | undefined {
  const embedded = post._embedded as Record<string, unknown> | undefined;
  const media = embedded?.["wp:featuredmedia"] as unknown[] | undefined;
  const first = media?.[0] as Record<string, unknown> | undefined;
  const url = first?.source_url;
  return typeof url === "string" && url.startsWith("http") ? url : undefined;
}

export function mapRawToTeamMember(raw: unknown, index: number): TeamMember | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const acf = o.acf && typeof o.acf === "object" ? (o.acf as Record<string, unknown>) : {};

  const id =
    o.id !== undefined && o.id !== null && String(o.id).trim() !== "" ? String(o.id) : pickString(o.slug, `team-${index}`);
  const name = pickString(acf.name, renderedField(o.title), pickString(o.slug));
  const roleRaw = pickString(acf.role, acf.title);
  const role = roleRaw ? roleRaw.toUpperCase() : "TEAM MEMBER";

  const imageSrc = pickString(
    o.featured_image,
    o.image_url,
    acf.image,
    featuredImageUrl(o),
  );

  if (!name || !imageSrc) return null;

  return {
    id,
    name: name.toUpperCase(),
    role,
    imageSrc,
    labelClass: LABEL_CLASSES[index % LABEL_CLASSES.length]!,
  };
}

/**
 * Anggota tim homepage (#team). Pakai `/dt360/v1/teams` bila base WP diset; selain itu `teamMembers` dari `data/home.tsx`.
 */
export const getHomeTeamMembers = unstable_cache(
  async (): Promise<TeamMember[]> => {
    if (!getWordPressRestBase()) return staticFallback;

    const routeEnv = process.env.WORDPRESS_HOME_TEAM_ROUTE?.trim();
    const route = routeEnv ? (routeEnv.startsWith("/") ? routeEnv : `/${routeEnv}`) : DEFAULT_ROUTE;

    try {
      const json = await fetchWpRouteJson(route, "homeTeamMembers");
      if (json === null) return staticFallback;

      const rows = unwrapList(json);
      const mapped = rows
        .map((row, i) => mapRawToTeamMember(row, i))
        .filter((x): x is TeamMember => x !== null);
      return mapped.length > 0 ? mapped : staticFallback;
    } catch (e) {
      console.warn("[homeTeamMembers] fetch failed:", e);
      return staticFallback;
    }
  },
  ["home-team-members"],
  {
    revalidate: Number(process.env.WORDPRESS_HOME_TEAM_REVALIDATE ?? 300) || 300,
    tags: ["home-team-members"],
  },
);
