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
  themeColor: "#0b0d2a",
  manifestBackgroundColor: "#0b0d2a",
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
