/** Book a Call page copy and asset paths */

export const BOOK_A_CALL_FORM_BG = "#F5F8FF";

/** When true, skips reCAPTCHA UI and Gravity Forms (local testing only). */
export const bookACallRecaptchaDisabled = false;

export const bookACallHero = {
  title: "Book A Call",
  heroImageSrc: "/images/book-a-call/book-a-call-hero.png",
  heroImageAlt:
    "Isometric illustration of a smartphone with calendar, clock, and messaging icons for scheduling a call",
  /** Desktop xl+ full size; smaller below lg (1024px) */
  heroImageMaxWidth: 430,
  heroImageMaxWidthSm: 260,
  heroImageMaxWidthLg: 360,
  /**
   * Illustration overlap into the form section (px). Smaller on mobile to avoid excess whitespace.
   */
  heroOverlapPx: {
    mobile: 72,
    sm: 96,
    lg: 150,
  },
} as const;

/** Tailwind classes shared by hero image + form overlap (keep in sync with heroOverlapPx). */
export const bookACallHeroOverlapClasses = {
  imageMargin: "-mb-18 sm:-mb-24 lg:-mb-[150px]",
  formPull: "-mt-18 sm:-mt-24 lg:-mt-[150px]",
  formSpacer: "h-18 sm:h-24 lg:h-[150px]",
  formContentPt: "pt-16 sm:pt-20 md:pt-28 lg:pt-8",
} as const;

export const bookACallForm = {
  stepLabel: "STEP 1:",
  stepBgClipSrc: "/images/book-a-call/step-bg-clip.png",
  heading: "Enter Your Name and Best Email Address",
  womanImageSrc: "/images/book-a-call/book-a-call-form-woman.png",
  womanImageAlt:
    "Professional woman holding a laptop with register form and email icons",
  formBubbleSrc: "/images/book-a-call/book-a-call-form-bubble.png",
  formBubbleAlt: "",
  fields: {
    nameLabel: "Name",
    firstNamePlaceholder: "First Name",
    lastNamePlaceholder: "Last Name",
    emailLabel: "Email Address",
    emailPlaceholder: "Email",
    captchaLabel: "Captcha",
  },
  submitLabel: "Go to Step 2",
  successTitle: "Thank you for submitting",
  successMessage: "We will contact you soon",
  /** Lead Connector booking widget (shown after step 1 submits successfully) */
  bookingIframeSrc: "https://api.leadconnectorhq.com/widget/booking/BvMnlvEIoMKwnPB3eQjZ",
  bookingIframeId: "Ko1nsW2cmgiBMQwJRPv3_1772435790587",
  bookingEmbedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",
} as const;

/** Gravity Forms — https://portal.deskteam360.com/wp-admin/admin.php?page=gf_edit_forms&id=59 */
export const bookACallGravityForm = {
  formId: 59,
  fieldIds: {
    firstName: "input_7.3",
    lastName: "input_7.6",
    email: "input_5",
    captcha: "input_8",
  },
} as const;
