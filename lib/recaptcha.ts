export type RecaptchaVerifyResult = {
  success: boolean;
  errorCodes: string[];
  skipped: boolean;
};

/** Verify a reCAPTCHA v2 token with Google (server-side). */
export async function verifyRecaptchaToken(
  token: string,
  remoteIp?: string,
): Promise<RecaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    return { success: true, errorCodes: [], skipped: true };
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    cache: "no-store",
  });

  const data = (await response.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };

  return {
    success: Boolean(data.success),
    errorCodes: data["error-codes"] ?? [],
    skipped: false,
  };
}

export function recaptchaVerifyErrorMessage(errorCodes: string[]): string {
  if (errorCodes.includes("invalid-input-secret")) {
    return "reCAPTCHA secret key is invalid. Set RECAPTCHA_SECRET_KEY to match Gravity Forms settings.";
  }
  if (errorCodes.includes("missing-input-secret")) {
    return "reCAPTCHA secret key is missing on the server (RECAPTCHA_SECRET_KEY).";
  }
  if (errorCodes.includes("timeout-or-duplicate")) {
    return "reCAPTCHA expired or was already used. Please complete the checkbox again.";
  }
  if (errorCodes.includes("invalid-input-response")) {
    return "reCAPTCHA verification failed. Check that the site key domain matches this site.";
  }
  if (errorCodes.includes("bad-request")) {
    return "reCAPTCHA request was invalid. Please try again.";
  }
  return "reCAPTCHA verification failed. Please complete the checkbox and try again.";
}

export function gravityFormsRecaptchaMismatchMessage(): string {
  return "reCAPTCHA passed on this site but Gravity Forms rejected it. Ensure WordPress → Forms → Settings → reCAPTCHA uses the same secret key as RECAPTCHA_SECRET_KEY, and the form captcha field is reCAPTCHA v2 (checkbox).";
}
