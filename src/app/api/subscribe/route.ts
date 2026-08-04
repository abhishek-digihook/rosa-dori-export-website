import { NextResponse } from "next/server";

/**
 * Newsletter sign-up.
 *
 * Set NEWSLETTER_WEBHOOK_URL to forward addresses to Mailchimp, Klaviyo,
 * Buttondown or a spreadsheet. Without it the address is logged and accepted,
 * so the form works in development.
 *
 * See README.md → "Wiring up the forms".
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";

  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't read that request." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const webhook = process.env.NEWSLETTER_WEBHOOK_URL;

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      console.info(`[subscribe] no delivery configured; logging instead: ${email}`);
    }
  } catch (error) {
    console.error("[subscribe] delivery failed", error);
    return NextResponse.json(
      { ok: false, message: "We couldn't sign you up just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
