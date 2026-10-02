/**
 * F4 — GA4 measurement ID for the deskteam360.com web data stream.
 * Override with NEXT_PUBLIC_GA_MEASUREMENT_ID if the stream ID changes.
 */
const DEFAULT_GA_MEASUREMENT_ID = "G-ZSLFPBZD33";

export function getGaMeasurementId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return fromEnv || DEFAULT_GA_MEASUREMENT_ID;
}

/** Custom event name to mark as a key event in GA4 Admin > Events. */
export const GA_BOOKED_CALL_EVENT = "booked_call";
