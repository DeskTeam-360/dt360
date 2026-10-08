/** Schema.org Organization fields (JSON-LD) — homepage. NAP from F14 in companyContact. */

export { companyContact } from "@/data/companyContact";

export const organizationSlogan = "Your Digital Team, All in One Place.";

/** Gate 5 (2026-10-06) — Organization description for JSON-LD. */
export const organizationDescription =
  "DeskTeam360 runs the Office-Based Insourcing Model. Clients get the same team in one office and a North American account manager. The team does websites, development, automation, AI workflows, video, tech support, and design. It is built for small agencies and service businesses. Clients pay one flat monthly rate. Tasks are unlimited. There are no contracts.";

/** Gate 5 — for DefinedTerm on /blog/what-is-insourcing when that post ships (S8). */
export const organizationInsourcingDefinedTermDescription =
  "The Office-Based Insourcing Model is how DeskTeam360 works: dedicated teams in physical offices, North American account managers, a flat monthly rate, unlimited tasks, and no contracts.";

export const organizationFounderName = "Jeremy Kenerson";
export const organizationFoundingDate = "2018";

export const organizationSameAs = [
  "https://www.linkedin.com/company/deskteam360/",
  "https://www.facebook.com/deskteam360",
  "https://www.instagram.com/deskteam360/",
  "https://www.trustpilot.com/review/deskteam360.com",
  "https://www.crunchbase.com/organization/deskteam360",
] as const;

/** Gate 5 open item: Graphic Design last (design last rule). */
export const organizationKnowsAbout = [
  "Web Design",
  "Web Development",
  "Video Editing",
  "Email Marketing",
  "Sales Funnels",
  "CRM",
  "Marketing Automation",
  "Social Media Content",
  "Website Maintenance",
  "AI Automation",
  "White Label Digital Services",
  "Insourcing",
  "Outsourcing",
  "Graphic Design",
] as const;

/** Gate 5: any US state, Canada, Australia, New Zealand, UK. */
export const organizationAreaServed = ["US", "CA", "AU", "NZ", "GB"] as const;
