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
  /** Pulls illustration over the arch into the form section (matches design) */
  heroImageOverlapMarginBottom: -150,
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

/** Gravity Forms — https://clone.deskteam360.com/wp-admin/admin.php?page=gf_edit_forms&id=59 */
export const bookACallGravityForm = {
  formId: 59,
  fieldIds: {
    firstName: "input_7.3",
    lastName: "input_7.6",
    email: "input_5",
    captcha: "input_8",
  },
} as const;
