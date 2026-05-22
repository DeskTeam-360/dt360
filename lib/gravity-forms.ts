import { bookACallGravityForm } from "@/data/bookACall";
import { contactGravityForm } from "@/data/contact";
import { getWordPressAuthHeaders, getWordPressSiteOrigin } from "@/lib/wp-auth";

export type BookACallEntryInput = {
  firstName: string;
  lastName: string;
  email: string;
  recaptchaToken?: string;
};

export type ContactEntryInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  recaptchaToken?: string;
};

export type GravityFormsSubmitResult = {
  is_valid: boolean;
  entry_id?: number;
  confirmation_type?: string;
  confirmation_redirect?: string;
  confirmation_message?: string;
  validation_messages?: Record<string, string>;
  form?: {
    fields?: Array<{
      id?: number | string;
      failed_validation?: boolean;
      validation_message?: string;
    }>;
  };
};

function buildSubmissionPayload(input: BookACallEntryInput): Record<string, string> {
  const { fieldIds } = bookACallGravityForm;
  const payload: Record<string, string> = {
    [fieldIds.firstName]: input.firstName.trim(),
    [fieldIds.lastName]: input.lastName.trim(),
    [fieldIds.email]: input.email.trim(),
  };

  if (input.recaptchaToken) {
    appendRecaptchaToken(payload, fieldIds.captcha, input.recaptchaToken);
  }

  return payload;
}

/** GF validates Google tokens via input_* and often expects `g-recaptcha-response` as well. */
function appendRecaptchaToken(
  payload: Record<string, string>,
  captchaInputKey: string,
  token: string,
): void {
  payload[captchaInputKey] = token;
  payload["g-recaptcha-response"] = token;
}

/** Submit Book a Call step 1 to Gravity Forms (form 59 on clone WP). */
export async function submitBookACallEntry(
  input: BookACallEntryInput,
): Promise<GravityFormsSubmitResult> {
  const formId =
    Number(process.env.GRAVITY_FORMS_BOOK_A_CALL_ID) || bookACallGravityForm.formId;
  const origin = getWordPressSiteOrigin();
  const url = `${origin}/wp-json/gf/v2/forms/${formId}/submissions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...getWordPressAuthHeaders(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildSubmissionPayload(input)),
    cache: "no-store",
  });

  const data = (await response.json()) as GravityFormsSubmitResult & {
    code?: string;
    message?: string;
  };

  if (!response.ok && !data.validation_messages) {
    throw new Error(data.message || `Gravity Forms request failed (${response.status})`);
  }

  return data;
}

function buildContactSubmissionPayload(input: ContactEntryInput): Record<string, string> {
  const { fieldIds } = contactGravityForm;
  const payload: Record<string, string> = {
    [fieldIds.firstName]: input.firstName.trim(),
    [fieldIds.lastName]: input.lastName.trim(),
    [fieldIds.phone]: input.phone.trim(),
    [fieldIds.email]: input.email.trim(),
    [fieldIds.message]: input.message.trim(),
  };

  if (input.recaptchaToken) {
    appendRecaptchaToken(payload, fieldIds.captcha, input.recaptchaToken);
  }

  return payload;
}

/** Submit Contact page form to Gravity Forms (form 1 on clone WP). */
export async function submitContactEntry(
  input: ContactEntryInput,
): Promise<GravityFormsSubmitResult> {
  const formId =
    Number(process.env.GRAVITY_FORMS_CONTACT_ID) || contactGravityForm.formId;
  const origin = getWordPressSiteOrigin();
  const url = `${origin}/wp-json/gf/v2/forms/${formId}/submissions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...getWordPressAuthHeaders(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildContactSubmissionPayload(input)),
    cache: "no-store",
  });

  const data = (await response.json()) as GravityFormsSubmitResult & {
    code?: string;
    message?: string;
  };

  if (!response.ok && !data.validation_messages) {
    throw new Error(data.message || `Gravity Forms request failed (${response.status})`);
  }

  return data;
}
