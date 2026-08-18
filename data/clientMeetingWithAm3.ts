/** Client Meeting with AM3 — booking widget + hero (same layout as Book a Call) */

import { bookACallForm, bookACallHero } from "@/data/bookACall";

export const clientMeetingWithAm3Booking = {
  bookingIframeSrc: "https://api.leadconnectorhq.com/widget/booking/FqQA7NZ4TYHX58vzfqXP",
  bookingIframeId: "FqQA7NZ4TYHX58vzfqXP_1786983625116",
  bookingEmbedScriptSrc: bookACallForm.bookingEmbedScriptSrc,
  iframeTitle: "Schedule your client meeting with Rozita",
} as const;

export const clientMeetingWithAm3Hero = {
  ...bookACallHero,
  title: "Client Meeting with Rozita",
} as const;

export const clientMeetingWithAm3Calendar = {
  formBubbleSrc: bookACallForm.formBubbleSrc,
  formBubbleAlt: bookACallForm.formBubbleAlt,
  womanImageSrc: bookACallForm.womanImageSrc,
  womanImageAlt: bookACallForm.womanImageAlt,
} as const;
