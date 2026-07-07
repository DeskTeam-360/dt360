import { getWordPressAuthHeaders, getWordPressSiteOrigin } from "@/lib/wp-auth";

type GfCaptchaField = {
  id?: number | string;
  type?: string;
  inputName?: string;
  captchaType?: string;
  inputs?: Array<{ id?: string; name?: string }>;
};

const cache = new Map<number, { expires: number; keys: string[] }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

/** Resolve all input names GF may expect for the form's captcha field. */
export async function getGravityFormRecaptchaInputKeys(
  formId: number,
  fallbackInputKey: string,
): Promise<string[]> {
  const hit = cache.get(formId);
  if (hit && hit.expires > Date.now()) {
    return hit.keys;
  }

  const keys = new Set<string>(["g-recaptcha-response", fallbackInputKey]);

  try {
    const origin = getWordPressSiteOrigin();
    const response = await fetch(`${origin}/wp-json/gf/v2/forms/${formId}`, {
      headers: {
        ...getWordPressAuthHeaders(),
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      const form = (await response.json()) as { fields?: GfCaptchaField[] };
      for (const field of form.fields ?? []) {
        if (field.type !== "captcha") continue;
        if (field.id != null) {
          keys.add(`input_${field.id}`);
        }
        if (field.inputName) {
          keys.add(field.inputName);
        }
        for (const input of field.inputs ?? []) {
          if (input.name) {
            keys.add(input.name);
          }
        }
      }
    }
  } catch (error) {
    console.warn("[gravity-form-captcha] Could not fetch form metadata:", error);
  }

  const keyList = [...keys];
  cache.set(formId, { keys: keyList, expires: Date.now() + CACHE_TTL_MS });
  return keyList;
}
