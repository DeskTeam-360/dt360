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
  /** When true, captcha is verified elsewhere — do not send token to GF (requires WP REST bypass filter). */
  omitRecaptcha?: boolean;
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

/**
 * GF REST API expects the v2 token on `g-recaptcha-response` (same as browser form POST).
 * Do not also verify the token with Google before this call — tokens are single-use.
 */
function appendRecaptchaToken(payload: Record<string, string>, token: string): void {
  payload["g-recaptcha-response"] = token;
}

async function submitGravityFormEntry(
  formId: number,
  payload: Record<string, string>,
  recaptchaToken?: string,
  omitRecaptcha?: boolean,
): Promise<GravityFormsSubmitResult> {
  if (recaptchaToken && !omitRecaptcha) {
    appendRecaptchaToken(payload, recaptchaToken);
  }

  const origin = getWordPressSiteOrigin();
  const url = `${origin}/wp-json/gf/v2/forms/${formId}/submissions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...getWordPressAuthHeaders(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
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

/** Submit Book a Call step 1 to Gravity Forms (form 59 on clone WP). */
export async function submitBookACallEntry(
  input: BookACallEntryInput,
): Promise<GravityFormsSubmitResult> {
  const formId =
    Number(process.env.GRAVITY_FORMS_BOOK_A_CALL_ID) || bookACallGravityForm.formId;
  const { fieldIds } = bookACallGravityForm;

  return submitGravityFormEntry(
    formId,
    {
      [fieldIds.firstName]: input.firstName.trim(),
      [fieldIds.lastName]: input.lastName.trim(),
      [fieldIds.email]: input.email.trim(),
    },
    input.recaptchaToken,
  );
}

/** Submit Contact page form to Gravity Forms (form 1 on clone WP). */
export async function submitContactEntry(
  input: ContactEntryInput,
): Promise<GravityFormsSubmitResult> {
  const formId =
    Number(process.env.GRAVITY_FORMS_CONTACT_ID) || contactGravityForm.formId;
  const { fieldIds } = contactGravityForm;

  return submitGravityFormEntry(
    formId,
    {
      [fieldIds.firstName]: input.firstName.trim(),
      [fieldIds.lastName]: input.lastName.trim(),
      [fieldIds.phone]: input.phone.trim(),
      [fieldIds.email]: input.email.trim(),
      [fieldIds.message]: input.message.trim(),
    },
    input.recaptchaToken,
    input.omitRecaptcha,
  );
}
