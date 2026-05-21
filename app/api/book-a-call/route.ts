import { NextResponse } from "next/server";
import { bookACallSkipRecaptcha } from "@/lib/book-a-call-config";
import {
  extractBookACallFieldErrors,
  hasBookACallFieldErrors,
  listBookACallFieldErrorMessages,
  type BookACallFieldErrors,
} from "@/lib/book-a-call-errors";
import { submitBookACallEntry } from "@/lib/gravity-forms";

export type BookACallApiBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  recaptchaToken?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildValidationErrorResponse(fieldErrors: BookACallFieldErrors) {
  let message = "Please fix the errors below and try again.";

  if (bookACallSkipRecaptcha && fieldErrors.captcha) {
    const onlyCaptcha =
      fieldErrors.captcha &&
      !fieldErrors.name &&
      !fieldErrors.email &&
      !fieldErrors.other?.length;

    if (onlyCaptcha) {
      message =
        "Gravity Forms still requires CAPTCHA. In WordPress, open Form #59 (Book A Call) and remove or disable the CAPTCHA field—or set NEXT_PUBLIC_BOOK_A_CALL_SKIP_RECAPTCHA=false and complete reCAPTCHA on this page.";
    }
  }

  const listed = listBookACallFieldErrorMessages(fieldErrors);
  if (listed.length > 0 && !message.includes(listed[0])) {
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
  let body: BookACallApiBody;

  try {
    body = (await request.json()) as BookACallApiBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const recaptchaToken = body.recaptchaToken?.trim();

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { ok: false, message: "First name, last name, and email are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!bookACallSkipRecaptcha && !recaptchaToken) {
    return NextResponse.json(
      { ok: false, message: "Please complete the reCAPTCHA verification." },
      { status: 400 },
    );
  }

  try {
    const result = await submitBookACallEntry({
      firstName,
      lastName,
      email,
      recaptchaToken: bookACallSkipRecaptcha ? undefined : recaptchaToken,
    });

    if (!result.is_valid) {
      const fieldErrors = extractBookACallFieldErrors(result);

      if (!hasBookACallFieldErrors(fieldErrors)) {
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
      redirectUrl: result.confirmation_redirect ?? null,
      confirmationType: result.confirmation_type ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Submission failed.";
    console.error("[book-a-call]", message);
    return NextResponse.json({ ok: false, message }, { status: 502 });
  }
}
