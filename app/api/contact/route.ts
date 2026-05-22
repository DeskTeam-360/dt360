import { NextResponse } from "next/server";
import {
  extractContactFieldErrors,
  hasContactFieldErrors,
  listContactFieldErrorMessages,
  type ContactFieldErrors,
} from "@/lib/contact-errors";
import { submitContactEntry } from "@/lib/gravity-forms";

export type ContactApiBody = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
  recaptchaToken?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      { ok: false, message: "Please complete the reCAPTCHA verification.", fieldErrors: { captcha: "Please complete the reCAPTCHA verification." } },
      { status: 400 },
    );
  }

  try {
    const result = await submitContactEntry({
      firstName,
      lastName,
      phone,
      email,
      message,
      recaptchaToken,
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
