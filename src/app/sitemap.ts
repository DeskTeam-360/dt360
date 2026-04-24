import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    {
      url: base.endsWith("/") ? base.slice(0, -1) : base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
