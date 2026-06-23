/** Client Meeting with AM2 — booking widget + hero (same layout as Book a Call) */

import { bookACallForm, bookACallHero } from "@/data/bookACall";

export const clientMeetingWithAm2Booking = {
  bookingIframeSrc: "https://api.leadconnectorhq.com/widget/booking/5SB7SXYXIcxd0P6PSNhK",
  bookingIframeId: "5SB7SXYXIcxd0P6PSNhK_1782230486340",
  bookingEmbedScriptSrc: bookACallForm.bookingEmbedScriptSrc,
  iframeTitle: "Schedule your client meeting with JD",
} as const;

export const clientMeetingWithAm2Hero = {
  ...bookACallHero,
  title: "Client Meeting with JD",
} as const;

export const clientMeetingWithAm2Calendar = {
  formBubbleSrc: bookACallForm.formBubbleSrc,
  formBubbleAlt: bookACallForm.formBubbleAlt,
  womanImageSrc: bookACallForm.womanImageSrc,
  womanImageAlt: bookACallForm.womanImageAlt,
} as const;
