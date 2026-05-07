import { unstable_cache } from "next/cache";
import type { ServicesTestimonial } from "@/data/servicesPage";
import { servicesTestimonials as staticFallback } from "@/data/servicesPage";
import { getWordPressRestBase, joinWordPressRestUrl, unwrapList } from "@/lib/wordpressRest";

/** Endpoint custom DeskTeam360 — lihat https://deskteam360.com/wordpress/index.php?rest_route=/dt360/v1/testimonials */
const DEFAULT_ROUTE = "/dt360/v1/testimonials";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeBasicEntities(text: string): string {
  return text
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\u201c")
    .replace(/&#8221;/g, "\u201d")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function renderedField(field: unknown): string {
  if (field && typeof field === "object" && "rendered" in field && typeof (field as { rendered: unknown }).rendered === "string") {
    return decodeBasicEntities(stripHtml((field as { rendered: string }).rendered));
  }
  return typeof field === "string" ? decodeBasicEntities(field.trim()) : "";
}

function pickString(...candidates: unknown[]): string {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return decodeBasicEntities(c.trim());
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

function attributionFromRecord(o: Record<string, unknown>, acf: Record<string, unknown>): string {
  const acfName = pickString(acf.name);
  const acfCompany = pickString(acf.company);
  const fromAcf =
    acfName && acfCompany ? `${acfName}, ${acfCompany}` : pickString(acfName, acfCompany);
  return pickString(o.attribution, fromAcf, renderedField(o.title));
}

/** Mengurai satu objek dari API (dt360/v1, flat, atau post WP + ACF) menjadi model carousel. */
export function mapRawToServicesTestimonial(raw: unknown): ServicesTestimonial | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const acf = o.acf && typeof o.acf === "object" ? (o.acf as Record<string, unknown>) : {};

  const id =
    o.id !== undefined && o.id !== null && String(o.id).trim() !== ""
      ? String(o.id)
      : pickString(o.slug) ||
        (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `t-${Date.now()}`);
  const quote = pickString(
    o.quote,
    acf.quote,
    renderedField(o.content),
    typeof o.excerpt === "object" ? renderedField(o.excerpt) : "",
  );
  const attribution = attributionFromRecord(o, acf);
  const imageAlt = pickString(o.image_alt, o.imageAlt, acf.image_alt, attribution || "Testimonial photo");

  const imageSrc = pickString(
    o.featured_image,
    o.image_src,
    o.imageSrc,
    o.image_url,
    o.image,
    acf.image_src,
    acf.image,
    typeof acf.photo === "string" ? acf.photo : "",
    featuredImageUrl(o),
  );

  if (!quote || !attribution) return null;

  return {
    id: String(id),
    quote,
    attribution,
    imageAlt,
    ...(imageSrc ? { imageSrc } : {}),
  };
}

async function fetchServicesTestimonialsFromApi(): Promise<ServicesTestimonial[]> {
  const base = getWordPressRestBase();
  if (!base) return [];

  const routeEnv = process.env.WORDPRESS_SERVICES_TESTIMONIALS_ROUTE?.trim();
  const route = routeEnv ? (routeEnv.startsWith("/") ? routeEnv : `/${routeEnv}`) : DEFAULT_ROUTE;

  const useEmbed =
    process.env.WORDPRESS_SERVICES_TESTIMONIALS_EMBED !== "0" && route.includes("/wp/v2/");
  let fetchUrl = joinWordPressRestUrl(base, route);
  if (useEmbed && !fetchUrl.includes("_embed")) {
    fetchUrl = `${fetchUrl}${fetchUrl.includes("?") ? "&" : "?"}_embed=1`;
  }

  const res = await fetch(fetchUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status !== 404) {
      console.warn(`[servicesTestimonials] HTTP ${res.status} from ${fetchUrl}`);
    }
    return [];
  }

  const json: unknown = await res.json();
  const rows = unwrapList(json);
  return rows.map(mapRawToServicesTestimonial).filter((x): x is ServicesTestimonial => x !== null);
}

/**
 * Testimonial untuk carousel Services / How It Works.
 * Memanggil WordPress REST jika base URL diset; jika kosong atau gagal, pakai data statis `data/servicesPage.ts`.
 */
export const getServicesTestimonials = unstable_cache(
  async (): Promise<ServicesTestimonial[]> => {
    const base = getWordPressRestBase();
    if (!base) return staticFallback;

    try {
      const fromApi = await fetchServicesTestimonialsFromApi();
      return fromApi.length > 0 ? fromApi : staticFallback;
    } catch (e) {
      console.warn("[servicesTestimonials] fetch failed:", e);
      return staticFallback;
    }
  },
  ["services-testimonials"],
  {
    revalidate: Number(process.env.WORDPRESS_SERVICES_TESTIMONIALS_REVALIDATE ?? 300) || 300,
    tags: ["services-testimonials"],
  },
);
