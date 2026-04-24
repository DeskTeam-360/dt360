import type { MetadataRoute } from "next";
import { getSiteUrl, siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const base = getSiteUrl();
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: siteConfig.manifestBackgroundColor,
    theme_color: siteConfig.themeColor,
    lang: siteConfig.language,
    id: base,
    icons: [
      {
        src: "/favicon.png",
        type: "image/png",
        sizes: "48x48",
        purpose: "any",
      },
    ],
  };
}
