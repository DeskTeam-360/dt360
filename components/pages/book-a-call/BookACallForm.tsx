"use client";

import { CircleChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { BookACallBookingEmbed } from "@/components/pages/book-a-call/BookACallBookingEmbed";
import { BookACallRecaptcha } from "@/components/pages/book-a-call/BookACallRecaptcha";
import { Container } from "@/components/shared/Container";
import { SafeImage } from "@/components/shared/SafeImage";
import { BOOK_A_CALL_FORM_BG, bookACallForm, bookACallHero } from "@/data/bookACall";
import { bookACallSkipRecaptcha } from "@/lib/book-a-call-config";
import { listBookACallFieldErrorMessages, type BookACallFieldErrors } from "@/lib/book-a-call-errors";

const heroOverlapHeight = Math.abs(bookACallHero.heroImageOverlapMarginBottom);

const recaptchaSiteKey = bookACallSkipRecaptcha
  ? ""
  : (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "");

const inputClass =
  "w-full rounded-[12px] border border-[#C5C9E0] bg-white px-4 py-3 font-[var(--font-montserrat)] text-[16px] font-medium leading-normal text-[#11104C] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#30439E] focus:ring-2 focus:ring-[#30439E]/15";

const labelClass =
  "mb-2 block font-[var(--font-montserrat)] text-[20px] font-bold leading-snug text-[#11104C]";

function FormFieldErrorsAlert({ errors }: { errors: BookACallFieldErrors }) {
  const messages = listBookACallFieldErrorMessages(errors);
  if (messages.length === 0) return null;

  return (
    <div
      role="alert"
      className="rounded-[12px] border border-[#E57373] bg-[#FFF5F5] px-4 py-3"
    >
      <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-bold text-[#C0392B]">
        Please correct the following:
      </p>
      <ul className="list-disc space-y-1 pl-5 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
        {messages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export function BookACallForm() {
  const {
    stepLabel,
    stepBgClipSrc,
    heading,
    womanImageSrc,
    womanImageAlt,
    formBubbleSrc,
    formBubbleAlt,
    fields,
    submitLabel,
  } = bookACallForm;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<BookACallFieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormMessage(null);
    setFieldErrors({});

    if (!bookACallSkipRecaptcha && !recaptchaSiteKey) {
      setFormMessage(
        "Form is not configured: add NEXT_PUBLIC_RECAPTCHA_SITE_KEY (must match reCAPTCHA in WordPress Gravity Forms settings).",
      );
      return;
    }

    if (!bookACallSkipRecaptcha && !recaptchaToken) {
      setFieldErrors({ captcha: "Please complete the reCAPTCHA verification." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book-a-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          ...(bookACallSkipRecaptcha ? {} : { recaptchaToken }),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: BookACallFieldErrors;
        redirectUrl?: string | null;
      };

      if (!response.ok || !data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setFormMessage(data.message ?? "Submission failed. Please try again.");
        return;
      }

      setShowBooking(true);
      setFormMessage(null);
      setFieldErrors({});
    } catch {
      setFormMessage("Connection failed. Check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={`relative z-10 w-full overflow-x-hidden ${showBooking ? "overflow-y-hidden" : "overflow-y-hidden"}`}
      style={{ marginTop: -heroOverlapHeight }}
      aria-labelledby={showBooking ? "book-a-call-booking-heading" : "book-a-call-form-heading"}
    >
      <div
        className="pointer-events-none absolute left-[-10%] top-[50%] z-[1] sm:left-[-10%] lg:left-[-10%] lg:top-50"
        aria-hidden
      >
        <SafeImage
          src={formBubbleSrc}
          alt={formBubbleAlt}
          width={368}
          height={368}
          className="h-auto w-[min(220px,42vw)] max-w-[368px] mix-blend-screen opacity-95 sm:w-[280px] lg:w-[368px]"
          sizes="(max-width: 1024px) 42vw, 368px"
        />
      </div>

      <div
        className="pointer-events-none w-full shrink-0"
        style={{ height: heroOverlapHeight }}
        aria-hidden
      />

      <div
        className="relative w-full overflow-x-clip overflow-y-hidden pb-20 pt-[120px] md:pt-28 lg:pt-8 sm:pb-24 lg:pb-28"
        style={{ backgroundColor: BOOK_A_CALL_FORM_BG }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute bottom-[-45%] left-[-20%] h-[min(1500px,90vw)] w-[min(1500px,90vw)] bg-[radial-gradient(circle_at_center,rgba(0,200,244,0.35)_0%,transparent_40%)] blur-3xl lg:left-[-25%]" />
          <div className="absolute top-0 right-[-35%] h-[min(1200px,90vw)] w-[min(1200px,90vw)] bg-[radial-gradient(circle_at_center,rgba(227,5,141,0.4)_0%,transparent_40%)] blur-3xl lg:top-[-20%]" />
        </div>

        <Container className="relative z-10 max-w-[1440px] px-6 lg:px-20">
          {showBooking ? (
            <div className="mx-auto w-full max-w-[1100px]">
              <h2
                id="book-a-call-booking-heading"
                className="sr-only"
              >
                Schedule your call
              </h2>
              <BookACallBookingEmbed />
            </div>
          ) : (
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
              <div className="relative order-2 mx-auto w-full max-w-[520px] lg:order-1 lg:mx-0 lg:max-w-none">
                <SafeImage
                  src={womanImageSrc}
                  alt={womanImageAlt}
                  width={560}
                  height={620}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 1024px) 88vw, 42vw"
                />
              </div>

              <div className="order-1 w-full max-w-[640px] justify-self-center lg:order-2 lg:max-w-none lg:justify-self-stretch">
                <div className="relative mb-6">
                  <span
                    className="inline-flex w-fit items-center px-10 py-5 font-[var(--font-poppins)] text-[28px] font-semibold leading-none text-white sm:text-[32px] lg:text-[36px]"
                    style={{
                      backgroundImage: `url('${stepBgClipSrc}')`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                    role="status"
                  >
                    {stepLabel}
                  </span>
                </div>

                <h2
                  id="book-a-call-form-heading"
                  className="max-w-[580px] font-[var(--font-poppins)] text-[28px] font-semibold leading-[1.2] text-balance text-[#11104C] sm:text-[32px] lg:text-[36px]"
                >
                  {heading}
                </h2>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                  <FormFieldErrorsAlert errors={fieldErrors} />

                  {formMessage ? (
                    <p
                      className="rounded-[12px] border border-[#C5C9E0] bg-white px-4 py-3 font-[var(--font-montserrat)] text-[16px] font-medium text-[#11104C]"
                      role="status"
                    >
                      {formMessage}
                    </p>
                  ) : null}

                  <div>
                    <label htmlFor="book-a-call-first-name" className={labelClass}>
                      {fields.nameLabel}
                    </label>
                    {fieldErrors.name ? (
                      <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
                        {fieldErrors.name}
                      </p>
                    ) : null}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        id="book-a-call-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder={fields.firstNamePlaceholder}
                        className={inputClass}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                      <input
                        id="book-a-call-last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder={fields.lastNamePlaceholder}
                        className={inputClass}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="book-a-call-email" className={labelClass}>
                      {fields.emailLabel}
                    </label>
                    {fieldErrors.email ? (
                      <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                    <input
                      id="book-a-call-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={fields.emailPlaceholder}
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {!bookACallSkipRecaptcha ? (
                    <div>
                      <span id="book-a-call-captcha-label" className={labelClass}>
                        {fields.captchaLabel}
                      </span>
                      {fieldErrors.captcha ? (
                        <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
                          {fieldErrors.captcha}
                        </p>
                      ) : null}
                      {recaptchaSiteKey ? (
                        <BookACallRecaptcha siteKey={recaptchaSiteKey} onChange={handleRecaptchaChange} />
                      ) : (
                        <p className="font-[var(--font-montserrat)] text-[14px] font-medium text-[#555]">
                          reCAPTCHA site key is not set (NEXT_PUBLIC_RECAPTCHA_SITE_KEY).
                        </p>
                      )}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-button group mt-2 flex w-full max-w-[420px] cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-[#F0573A] px-6 py-4 text-[20px] text-white shadow-[0_15px_30px_rgba(240,87,58,0.28)] transition duration-200 hover:bg-[#e04d32] hover:shadow-[0_18px_36px_rgba(240,87,58,0.38)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:hover:translate-y-0"
                  >
                    {isSubmitting ? "Submitting…" : submitLabel}
                    
                      <CircleChevronRight className="size-6" strokeWidth={2.25} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
