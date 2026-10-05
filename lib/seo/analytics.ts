/**
 * Site analytics / ads IDs (public client-side tags).
 * Override with NEXT_PUBLIC_* env vars when needed.
 */
const DEFAULT_GA_MEASUREMENT_ID = "G-ZSLFPBZD33";
const DEFAULT_GOOGLE_ADS_ID = "AW-799375519";

/** Existing pixel + new pixel from marketing snippet. */
const DEFAULT_META_PIXEL_IDS = [
  "1586498862891785",
  "269049040359246",
] as const;

export function getGaMeasurementId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return fromEnv || DEFAULT_GA_MEASUREMENT_ID;
}

export function getGoogleAdsId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();
  return fromEnv || DEFAULT_GOOGLE_ADS_ID;
}

export function getMetaPixelIds(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_META_PIXEL_IDS?.trim();
  if (fromEnv) {
    return fromEnv
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return [...DEFAULT_META_PIXEL_IDS];
}

/** Custom event name to mark as a key event in GA4 Admin > Events. */
export const GA_BOOKED_CALL_EVENT = "booked_call";
