/**
 * Site-wide config: SEO, brand, canonical URL.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://deskteam360.com).
 */
export const siteConfig = {
  name: "DeskTeam360",
  shortName: "DeskTeam360",
  defaultTitle: "DeskTeam360 — Stop Outsourcing, Start Insourcing",
  description:
    "Stop uncontrolled outsourcing. Build a dedicated insourcing team—developers, designers, and AI specialists—with clear process, fast SLA, and direct communication.",
  keywords: [
    "DeskTeam360",
    "insourcing",
    "dedicated team",
    "remote developers",
    "designers",
    "AI specialists",
    "creative team",
    "outsourcing alternative",
  ],
  locale: "en_US",
  language: "en",
  themeColor: "#11104C",
  manifestBackgroundColor: "#11104C",
  twitterCreator: "" as string,
} as const;

export function getSiteUrl(): string {
  let value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return "http://localhost:3000";
  value = value.replace(/\/$/, "");
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }
  return value;
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL("http://localhost:3000");
  }
}

/**
 * Whether search engines may index this deployment.
 * Staging/dev hosts (e.g. *.youare.ninja) are blocked by default.
 * Override with NEXT_PUBLIC_ROBOTS_INDEX=true|false.
 */
export function isSearchEngineIndexable(): boolean {
  const flag = process.env.NEXT_PUBLIC_ROBOTS_INDEX?.trim().toLowerCase();
  if (flag === "false" || flag === "0" || flag === "no") return false;
  if (flag === "true" || flag === "1" || flag === "yes") return true;

  try {
    const host = new URL(getSiteUrl()).hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return false;
    if (host.endsWith(".youare.ninja")) return false;
    if (host.includes("staging") || host.startsWith("dev.")) return false;
  } catch {
    return false;
  }

  return true;
}
