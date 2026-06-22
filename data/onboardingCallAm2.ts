/** Onboarding Call AM2 — booking widget + hero (same layout as Book a Call) */

import { bookACallForm, bookACallHero } from "@/data/bookACall";

export const onboardingCallAm2Booking = {
  bookingIframeSrc: "https://api.leadconnectorhq.com/widget/booking/bztEIkNFOMtIEho6VkVx",
  bookingIframeId: "Ko1nsW2cmgiBMQwJRPv3_1782160535776",
  bookingEmbedScriptSrc: bookACallForm.bookingEmbedScriptSrc,
  iframeTitle: "Schedule your onboarding call",
} as const;

export const onboardingCallAm2Hero = {
  ...bookACallHero,
  title: "Book A Call",
} as const;

export const onboardingCallAm2Calendar = {
  formBubbleSrc: bookACallForm.formBubbleSrc,
  formBubbleAlt: bookACallForm.formBubbleAlt,
  womanImageSrc: bookACallForm.womanImageSrc,
  womanImageAlt: bookACallForm.womanImageAlt,
} as const;
