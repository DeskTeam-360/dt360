import { NextResponse } from "next/server";
import {
  extractContactFieldErrors,
  hasContactFieldErrors,
  listContactFieldErrorMessages,
  type ContactFieldErrors,
} from "@/lib/contact-errors";
import { submitContactEntry } from "@/lib/gravity-forms";
import {
  gravityFormsRecaptchaMismatchMessage,
  recaptchaVerifyErrorMessage,
  verifyRecaptchaToken,
} from "@/lib/recaptcha";

export type ContactApiBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
  recaptchaToken?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Headless GF: verify captcha on Next.js, skip token on GF REST (needs WP filter in export/wordpress-gf-rest-recaptcha-bypass.php). */
function isContactRecaptchaServerVerifyEnabled(): boolean {
  return process.env.CONTACT_RECAPTCHA_SERVER_VERIFY === "true";
}

function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || undefined;
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

function buildValidationErrorResponse(fieldErrors: ContactFieldErrors) {
  let message = "Please fix the errors below and try again.";
  const listed = listContactFieldErrorMessages(fieldErrors);
  if (listed.length > 0) {
    message = listed.length === 1 ? listed[0] : message;
  }

  return NextResponse.json(
    {
      ok: false,
      message,
      fieldErrors,
    },
    { status: 422 },
  );
}

export async function POST(request: Request) {
  let body: ContactApiBody;

  try {
    body = (await request.json()) as ContactApiBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const recaptchaToken = body.recaptchaToken?.trim();

  if (!firstName || !lastName || !phone || !email || !message) {
    return NextResponse.json(
      { ok: false, message: "All fields are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!recaptchaToken) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please complete the reCAPTCHA verification.",
        fieldErrors: { captcha: "Please complete the reCAPTCHA verification." },
      },
      { status: 400 },
    );
  }

  try {
    const serverVerify = isContactRecaptchaServerVerifyEnabled();
    let omitRecaptcha = false;

    if (serverVerify) {
      const recaptchaCheck = await verifyRecaptchaToken(recaptchaToken, getClientIp(request));

      if (recaptchaCheck.skipped) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "CONTACT_RECAPTCHA_SERVER_VERIFY is enabled but RECAPTCHA_SECRET_KEY is missing. Add the secret key to .env.local or Vercel.",
            fieldErrors: { captcha: "Server reCAPTCHA is not configured." },
          },
          { status: 503 },
        );
      }

      if (!recaptchaCheck.success) {
        const captchaMessage = recaptchaVerifyErrorMessage(recaptchaCheck.errorCodes);
        return NextResponse.json(
          {
            ok: false,
            message: captchaMessage,
            fieldErrors: { captcha: captchaMessage },
          },
          { status: 422 },
        );
      }

      // Token consumed by Google siteverify — do not forward to GF.
      omitRecaptcha = true;
    }

    const result = await submitContactEntry({
      firstName,
      lastName,
      phone,
      email,
      message,
      recaptchaToken: omitRecaptcha ? undefined : recaptchaToken,
      omitRecaptcha,
    });

    if (!result.is_valid) {
      const fieldErrors = extractContactFieldErrors(result);

      if (!hasContactFieldErrors(fieldErrors)) {
        return NextResponse.json(
          {
            ok: false,
            message: "Submission was rejected by Gravity Forms. Please try again.",
            fieldErrors: {},
          },
          { status: 422 },
        );
      }

      if (fieldErrors.captcha) {
        const captchaMessage = serverVerify
          ? "Gravity Forms still rejected captcha. Add export/wordpress-gf-rest-recaptcha-bypass.php to WordPress (see file comments)."
          : gravityFormsRecaptchaMismatchMessage();
        return NextResponse.json(
          {
            ok: false,
            message: captchaMessage,
            fieldErrors: { captcha: captchaMessage },
          },
          { status: 422 },
        );
      }

      return buildValidationErrorResponse(fieldErrors);
    }

    return NextResponse.json({
      ok: true,
      entryId: result.entry_id,
      confirmationMessage: result.confirmation_message ?? null,
      confirmationType: result.confirmation_type ?? null,
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Submission failed.";
    console.error("[contact]", errMessage);
    return NextResponse.json({ ok: false, message: errMessage }, { status: 502 });
  }
}
