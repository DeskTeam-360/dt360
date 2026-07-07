"use client";

import { CircleChevronRight } from "lucide-react";
import { useCallback, useState } from "react";
import { BookACallRecaptcha } from "@/components/pages/book-a-call/BookACallRecaptcha";
import { contactForm } from "@/data/contact";
import type { ContactFieldErrors } from "@/lib/contact-errors";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

const inputClass =
  "w-full rounded-[12px] border border-[#C5C9E0] bg-white px-4 py-3 font-[var(--font-montserrat)] text-[16px] font-medium leading-normal text-[#11104C] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#30439E] focus:ring-2 focus:ring-[#30439E]/15";

const labelClass =
  "mb-2 block font-[var(--font-montserrat)] text-[20px] font-bold leading-snug text-[#11104C]";

export function ContactForm() {
  const {
    nameLabel,
    firstNamePlaceholder,
    lastNamePlaceholder,
    phoneLabel,
    phonePlaceholder,
    emailLabel,
    emailPlaceholder,
    messageLabel,
    messagePlaceholder,
    captchaLabel,
    submitLabel,
    successMessage,
  } = contactForm;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaResetKey, setRecaptchaResetKey] = useState(0);

  const handleRecaptchaChange = useCallback((token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormMessage(null);
    setIsSuccess(false);

    const errors: ContactFieldErrors = {};
    if (!firstName.trim() || !lastName.trim()) {
      errors.name = "Please enter your first and last name.";
    }
    if (!phone.trim()) {
      errors.phone = "Please enter your phone number.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!message.trim()) {
      errors.message = "Please enter your message.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!recaptchaSiteKey) {
      setFormMessage(
        "Form is not configured: add NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY (must match reCAPTCHA in WordPress Gravity Forms settings).",
      );
      return;
    }

    if (!recaptchaToken) {
      setFieldErrors({ captcha: "Please complete the reCAPTCHA verification." });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim(),
          recaptchaToken,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: ContactFieldErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.fieldErrors && Object.keys(data.fieldErrors).length > 0) {
          setFieldErrors(data.fieldErrors);
          if (data.fieldErrors.captcha) {
            setRecaptchaToken(null);
            setRecaptchaResetKey((key) => key + 1);
          }
        }
        setFormMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
      setFormMessage(successMessage);
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setRecaptchaToken(null);
    } catch {
      setFormMessage("Unable to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="w-full max-w-[640px] space-y-6" onSubmit={handleSubmit} noValidate>
      {formMessage ? (
        <p
          className={`rounded-[12px] border px-4 py-3 font-[var(--font-montserrat)] text-[16px] font-medium ${
            isSuccess
              ? "border-[#C5C9E0] text-[#11104C]"
              : "border-[#F5C6CB] bg-[#FFF5F5] text-[#C0392B]"
          }`}
          role="status"
        >
          {formMessage}
        </p>
      ) : null}

      <div>
        <label htmlFor="contact-first-name" className={labelClass}>
          {nameLabel}
        </label>
        {fieldErrors.name ? (
          <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
            {fieldErrors.name}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder={firstNamePlaceholder}
            className={inputClass}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            placeholder={lastNamePlaceholder}
            className={inputClass}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          {phoneLabel}
        </label>
        {fieldErrors.phone ? (
          <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
            {fieldErrors.phone}
          </p>
        ) : null}
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={phonePlaceholder}
          className={inputClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {emailLabel}
        </label>
        {fieldErrors.email ? (
          <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
            {fieldErrors.email}
          </p>
        ) : null}
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={emailPlaceholder}
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {messageLabel}
        </label>
        {fieldErrors.message ? (
          <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
            {fieldErrors.message}
          </p>
        ) : null}
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={messagePlaceholder}
          className={`${inputClass} resize-y min-h-[140px]`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <p className={labelClass}>{captchaLabel}</p>
        {fieldErrors.captcha ? (
          <p className="mb-2 font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
            {fieldErrors.captcha}
          </p>
        ) : null}
        {recaptchaSiteKey ? (
          <BookACallRecaptcha
            key={recaptchaResetKey}
            siteKey={recaptchaSiteKey}
            onChange={handleRecaptchaChange}
          />
        ) : (
          <p className="font-[var(--font-montserrat)] text-[14px] font-medium text-[#C0392B]">
            reCAPTCHA site key is not set (NEXT_PUBLIC_RECAPTCHA_SITE_KEY).
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="font-button group mt-2 flex w-full max-w-[420px] cursor-pointer items-center justify-center gap-3 rounded-[12px] bg-[#F0573A] px-6 py-4 text-[20px] text-white shadow-[0_15px_30px_rgba(240,87,58,0.28)] transition duration-200 hover:bg-[#e04d32] hover:shadow-[0_18px_36px_rgba(240,87,58,0.38)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:hover:translate-y-0"
      >
        {isSubmitting ? "Sending…" : submitLabel}
        <CircleChevronRight className="size-6" strokeWidth={2.25} aria-hidden />
      </button>
    </form>
  );
}
