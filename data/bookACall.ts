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

/** Matches Navbar `Container` — hero title left edge aligns with logo. */
export const bookACallShellContainerClassName = "max-w-7xl";

/** Hero layout tokens — Elementor / Figma reference (title 76px, phone 429×429). */
export const bookACallHeroLayout = {
  contentPaddingClassName: "pb-[80px]",
  gridClassName:
    "grid min-w-0 items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-12",
  titleClassName:
    "w-full font-[var(--font-poppins)] text-[56px] font-bold leading-[1.1] text-balance text-white max-md:text-center md:text-left lg:text-[76px]",
  titleColumnClassName:
    "relative z-20 min-w-0 justify-self-start max-md:justify-self-center md:translate-y-4 lg:translate-y-6 xl:translate-y-7",
  imageColumnClassName:
    "relative isolate z-40 flex w-full justify-center md:justify-end md:justify-self-end md:-translate-x-10",
  imageWrapperClassName:
    "relative z-40 size-[min(72vw,300px)] shrink-0 sm:size-[360px] lg:size-[429px]",
  imageClassName:
    "size-full object-contain object-center drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]",
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
