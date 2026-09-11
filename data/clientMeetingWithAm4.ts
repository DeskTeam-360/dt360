/** Client Meeting with AM4 — booking widget + hero (same layout as Book a Call) */

import { bookACallForm, bookACallHero } from "@/data/bookACall";

export const clientMeetingWithAm4Booking = {
  bookingIframeSrc: "https://api.leadconnectorhq.com/widget/booking/UYM15i3CqFIlHHAf4mb4",
  bookingIframeId: "hqt3YHetHLT8vGsaRtrl_1789089303616",
  bookingEmbedScriptSrc: bookACallForm.bookingEmbedScriptSrc,
  iframeTitle: "Schedule your client meeting with Lex",
} as const;

export const clientMeetingWithAm4Hero = {
  ...bookACallHero,
  title: "Client Meeting with Lex",
} as const;

export const clientMeetingWithAm4Calendar = {
  formBubbleSrc: bookACallForm.formBubbleSrc,
  formBubbleAlt: bookACallForm.formBubbleAlt,
  womanImageSrc: bookACallForm.womanImageSrc,
  womanImageAlt: bookACallForm.womanImageAlt,
} as const;
