/** Temporary: set NEXT_PUBLIC_BOOK_A_CALL_SKIP_RECAPTCHA=true to bypass reCAPTCHA in Next.js. */
export const bookACallSkipRecaptcha =
  process.env.NEXT_PUBLIC_BOOK_A_CALL_SKIP_RECAPTCHA === "true";
