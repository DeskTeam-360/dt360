/** Book a Call page copy and asset paths */

export const BOOK_A_CALL_FORM_BG = "#F5F8FF";

/** When true, skips reCAPTCHA UI and Gravity Forms (local testing only). */
export const bookACallRecaptchaDisabled = false;

export const bookACallHero = {
  title: "Book A Call",
  heroImageSrc: "/images/book-a-call/book-a-call-hero.png",
  heroImageAlt:
    "Isometric illustration of a smartphone with calendar, clock, and messaging icons for scheduling a call",
  /** Native asset size — display at 429×429 on desktop (no upscale). */
  heroImageMaxWidth: 429,
  heroImageMaxWidthSm: 260,
  heroImageMaxWidthLg: 360,
  heroImageIntrinsicSize: 429,
  /**
   * Illustration overlap into the form section (px). Smaller on mobile to avoid excess whitespace.
   */
  heroOverlapPx: {
    mobile: 64,
    sm: 88,
    lg: 140,
  },
} as const;

/** Tailwind classes shared by hero image + form overlap (keep in sync with heroOverlapPx). */
export const bookACallHeroOverlapClasses = {
  imageMargin: "-mb-16 sm:-mb-[88px] lg:-mb-[140px]",
  formPull: "-mt-16 sm:-mt-[88px] lg:-mt-[140px]",
  formSpacer: "h-16 sm:h-[88px] lg:h-[140px]",
  formContentPt: "pt-16 sm:pt-20 md:pt-28 lg:pt-8",
} as const;

/** Hero layout tokens — Book A Call reference (title 76px, phone 429×429). */
export const bookACallHeroLayout = {
  contentMinHeight: "min-h-[280px] sm:min-h-[320px] lg:min-h-[400px]",
  gridClassName:
    "grid min-w-0 items-end gap-6 sm:gap-8 md:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-10 xl:gap-12",
  titleClassName:
    "font-[var(--font-poppins)] text-[44px] font-bold leading-[1.1] text-balance text-white max-md:text-center md:text-left sm:text-[56px] lg:text-[76px]",
  titleColumnClassName: "relative z-20 flex min-w-0 items-end max-md:justify-center md:pb-4 lg:pb-6 lg:pt-10 xl:pt-12",
  imageColumnClassName:
    "relative isolate z-40 flex flex-col items-center justify-end md:mx-0 md:ml-auto md:translate-y-4 lg:translate-y-6",
  imageWrapperClassName: "relative z-40 size-[min(72vw,300px)] sm:size-[360px] lg:size-[429px]",
  imageClassName:
    "size-full object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]",
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
  bookingIframeId: "Ko1nsW2cmgiBMQwJRPv3_1782152989179",
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
