import { bookACallGravityForm } from "@/data/bookACall";
import { contactGravityForm } from "@/data/contact";
import { getGravityFormRecaptchaInputKeys } from "@/lib/gravity-form-captcha";
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

function appendRecaptchaTokens(
  payload: Record<string, string>,
  inputKeys: string[],
  token: string,
): void {
  for (const key of inputKeys) {
    payload[key] = token;
  }
}

async function submitGravityFormEntry(
  formId: number,
  payload: Record<string, string>,
  fallbackCaptchaKey: string,
  recaptchaToken?: string,
): Promise<GravityFormsSubmitResult> {
  if (recaptchaToken) {
    const captchaKeys = await getGravityFormRecaptchaInputKeys(formId, fallbackCaptchaKey);
    appendRecaptchaTokens(payload, captchaKeys, recaptchaToken);
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
    fieldIds.captcha,
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
    fieldIds.captcha,
    input.recaptchaToken,
  );
}
