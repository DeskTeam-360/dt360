import type { GravityFormsSubmitResult } from "@/lib/gravity-forms";

export type ContactFieldErrors = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  captcha?: string;
  other?: string[];
};

function assignFieldError(errors: ContactFieldErrors, fieldId: string, text: string): void {
  if (fieldId === "4") {
    errors.phone = text;
    return;
  }
  if (fieldId === "5") {
    errors.email = text;
    return;
  }
  if (fieldId === "6") {
    errors.message = text;
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

export function extractContactFieldErrors(result: GravityFormsSubmitResult): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (result.validation_messages) {
    for (const [fieldId, text] of Object.entries(result.validation_messages)) {
      if (text) assignFieldError(errors, fieldId, text);
    }
  }

  const formFields = result.form?.fields;
  if (formFields) {
    for (const field of formFields) {
      if (field.failed_validation && field.validation_message && field.id != null) {
        assignFieldError(errors, String(field.id), field.validation_message);
      }
    }
  }

  return errors;
}

export function hasContactFieldErrors(errors: ContactFieldErrors): boolean {
  return Boolean(
    errors.name || errors.phone || errors.email || errors.message || errors.captcha || errors.other?.length,
  );
}

export function listContactFieldErrorMessages(errors: ContactFieldErrors): string[] {
  const list: string[] = [];
  if (errors.name) list.push(errors.name);
  if (errors.phone) list.push(errors.phone);
  if (errors.email) list.push(errors.email);
  if (errors.message) list.push(errors.message);
  if (errors.captcha) list.push(errors.captcha);
  if (errors.other?.length) list.push(...errors.other);
  return list;
}
