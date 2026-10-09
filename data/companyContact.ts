/**
 * F14 — official company name, address, and email (Jeremy, 2026-10).
 * Phone removed from public site per Jeremy (2026-10-10).
 * Full postal address is for schema / legal use; public UI shows city + state.
 */
export const companyContact = {
  legalName: "DeskTeam360",
  name: "DeskTeam360",
  streetAddress: "2114 W Grant Rd",
  addressLocality: "Tucson",
  addressRegion: "AZ",
  postalCode: "85745",
  addressCountry: "US",
  /** Public-facing location line (report: city + state for online-only business). */
  publicLocation: "Tucson, AZ",
  emailDisplay: "Jeremy@DeskTeam360.com",
  emailHref: "mailto:Jeremy@DeskTeam360.com",
} as const;
