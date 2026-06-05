import type { GravityFormsSubmitResult } from "@/lib/gravity-forms";

export type BookACallFieldErrors = {
  name?: string;
  email?: string;
  captcha?: string;
  /** Errors that do not map to a visible field */
  other?: string[];
};

type GfFieldNode = {
  id?: number | string;
  failed_validation?: boolean;
  validation_message?: string;
};

function assignFieldError(
  errors: BookACallFieldErrors,
  fieldId: string,
  text: string,
): void {
  if (fieldId === "5") {
    errors.email = text;
    return;
  }
  if (fieldId === "7") {
    errors.name = text;
    return;
  }
  if (fieldId === "8") {
    errors.captcha = text;
    return;
  }

  errors.other = errors.other ?? [];
  if (!errors.other.includes(text)) {
    errors.other.push(text);
  }
}

/** Map Gravity Forms validation to UI field keys. */
export function extractBookACallFieldErrors(
  result: GravityFormsSubmitResult,
): BookACallFieldErrors {
  const errors: BookACallFieldErrors = {};

  if (result.validation_messages) {
    for (const [fieldId, text] of Object.entries(result.validation_messages)) {
      if (text) assignFieldError(errors, fieldId, text);
    }
  }

  const formFields = (result as GravityFormsSubmitResult & { form?: { fields?: GfFieldNode[] } })
    .form?.fields;

  if (formFields) {
    for (const field of formFields) {
      if (field.failed_validation && field.validation_message && field.id != null) {
        assignFieldError(errors, String(field.id), field.validation_message);
      }
    }
  }

  return errors;
}

export function hasBookACallFieldErrors(errors: BookACallFieldErrors): boolean {
  return Boolean(errors.name || errors.email || errors.captcha || errors.other?.length);
}

/** True when GF rejected submission only because of reCAPTCHA (used while captcha is disabled). */
export function isBookACallCaptchaOnlyError(errors: BookACallFieldErrors): boolean {
  return Boolean(
    errors.captcha && !errors.name && !errors.email && !(errors.other?.length),
  );
}

export function listBookACallFieldErrorMessages(errors: BookACallFieldErrors): string[] {
  const list: string[] = [];
  if (errors.name) list.push(errors.name);
  if (errors.email) list.push(errors.email);
  if (errors.captcha) list.push(errors.captcha);
  if (errors.other?.length) list.push(...errors.other);
  return list;
}
