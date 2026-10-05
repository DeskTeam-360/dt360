/** Schema.org Organization fields (JSON-LD) — homepage. NAP from F14 in companyContact. */

export { companyContact } from "@/data/companyContact";

export const organizationSlogan = "Your Digital Team, All in One Place.";

export const organizationDescription =
  "DeskTeam360 provides flat-rate digital marketing and technical services, including web design and development, graphic design, video editing, email marketing and sales funnels, CRM and automation, social media content, website maintenance, AI automation, white label digital services, insourcing, and outsourcing.";

export const organizationFounderName = "Jeremy Kenerson";
export const organizationFoundingDate = "2018";

export const organizationSameAs = [
  "https://www.linkedin.com/company/deskteam360/",
  "https://www.facebook.com/deskteam360",
  "https://www.instagram.com/deskteam360/",
  "https://www.trustpilot.com/review/deskteam360.com",
  "https://www.crunchbase.com/organization/deskteam360",
] as const;

export const organizationKnowsAbout = [
  "Web Design",
  "Web Development",
  "Graphic Design",
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
] as const;

/** Site plan countries (F9) — not US-only. */
export const organizationAreaServed = ["US", "AU", "NZ", "GB"] as const;
