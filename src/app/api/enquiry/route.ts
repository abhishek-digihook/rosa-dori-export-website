import { NextResponse } from "next/server";

import { productBySlug } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Enquiry endpoint.
 *
 * Delivery is provider-agnostic and opt-in:
 *
 *   • Set RESEND_API_KEY + ENQUIRY_TO_EMAIL and enquiries are emailed via
 *     Resend (https://resend.com). No SDK needed — it is a plain REST call.
 *   • Set ENQUIRY_WEBHOOK_URL to POST the payload somewhere else instead
 *     (Zapier, Make, a Google Sheet, your CRM).
 *   • With neither configured the enquiry is logged to the server console and
 *     still returns success, so the form is testable out of the box.
 *
 * See README.md → "Wiring up the forms".
 */

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  intent?: string;
  product?: string;
  message?: string;
  /** Honeypot — a real person never fills this. */
  companyWebsite?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value: unknown, max = 2000): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

function fail(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return fail("We couldn't read that request.");
  }

  // Silently accept and discard bot submissions — never tell them why.
  if (clean(body.companyWebsite)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name) return fail("Please tell us your name.");
  if (!EMAIL_RE.test(email)) return fail("Please enter a valid email address.");
  if (message.length < 10) {
    return fail("Please add a little more detail to your message.");
  }

  const product = clean(body.product, 120);
  const enquiry = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    intent: clean(body.intent, 60) || "general",
    product: product ? (productBySlug(product)?.name ?? product) : "—",
    message,
  };

  const lines = [
    `Name:    ${enquiry.name}`,
    `Email:   ${enquiry.email}`,
    `Type:    ${enquiry.intent}`,
    `Product: ${enquiry.product}`,
    "",
    enquiry.message,
  ].join("\n");

  try {
    const webhook = process.env.ENQUIRY_WEBHOOK_URL;
    const resendKey = process.env.RESEND_API_KEY;
    const to = process.env.ENQUIRY_TO_EMAIL ?? site.contact.email;
    const from = process.env.ENQUIRY_FROM_EMAIL ?? "website@rosadori.com";

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${site.name} Website <${from}>`,
          to: [to],
          reply_to: enquiry.email,
          subject: `Website enquiry — ${enquiry.name} (${enquiry.intent})`,
          text: lines,
        }),
      });
      if (!res.ok) {
        throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
      }
    } else {
      // Nothing configured yet — keep the form usable and leave a trail.
      console.info(`[enquiry] no delivery configured; logging instead\n${lines}`);
    }
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return fail(
      `We couldn't send that just now. Please email us directly at ${site.contact.email}.`,
      502,
    );
  }

  return NextResponse.json({ ok: true });
}
