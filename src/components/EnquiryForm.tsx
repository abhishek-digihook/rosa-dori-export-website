"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { INTENTS } from "@/lib/enquiry";
import { categories, products } from "@/lib/products";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-espresso/20 bg-transparent py-3 text-sm text-espresso placeholder:text-mist transition-colors focus:border-bark focus:outline-none";

const labelClass =
  "block text-[0.68rem] tracking-[0.18em] text-mist uppercase";

export function EnquiryForm({
  defaultIntent = "general",
  defaultProduct = "",
}: {
  defaultIntent?: string;
  defaultProduct?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "We couldn't reach the server. Please email us directly and we will pick it up from there.",
      );
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-linen bg-sand/60 p-10 text-center"
        >
          <h3 className="font-display text-3xl">Thank you.</h3>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-cocoa">
            Your enquiry has reached us. Someone from the team will reply within
            two working days — usually sooner, and always with a real answer
            rather than an acknowledgement.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 text-[0.66rem] tracking-[0.18em] text-bark uppercase underline underline-offset-4"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
          noValidate={false}
        >
          {/* Honeypot — bots fill this, people never see it. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company-website">Do not fill this in</label>
            <input
              id="company-website"
              name="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Jane Fernandes"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="intent" className={labelClass}>
                Type of message *
              </label>
              <select
                id="intent"
                name="intent"
                required
                defaultValue={defaultIntent}
                className={`${fieldClass} cursor-pointer`}
              >
                {INTENTS.map((intent) => (
                  <option key={intent.value} value={intent.value}>
                    {intent.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="product" className={labelClass}>
                Product of interest
              </label>
              <select
                id="product"
                name="product"
                defaultValue={defaultProduct}
                className={`${fieldClass} cursor-pointer`}
              >
                <option value="">Not specific / several</option>
                {categories.map((category) => (
                  <optgroup key={category.slug} label={category.name}>
                    {products
                      .filter((p) => p.category === category.slug)
                      .map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about sizes, materials, branding, quantities or timelines — or paste a reference. The more detail, the more useful our first reply."
              className={`${fieldClass} resize-y`}
            />
            <p className="mt-3 text-xs leading-relaxed text-mist">
              Everything is made to order. Tell us the quantity you have in mind
              and we will confirm minimum order quantities, lead times and
              pricing with your quotation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative inline-flex items-center justify-center overflow-hidden bg-bark px-9 py-4 text-[0.7rem] tracking-[0.18em] text-cream uppercase transition-opacity disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </span>
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-bark-deep transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
            </button>

            <p className="max-w-sm text-xs leading-relaxed text-mist">
              We use your details only to answer this enquiry. They are never
              shared with third parties and never added to a marketing list.
            </p>
          </div>

          {status === "error" && (
            <p role="alert" className="text-sm text-wine">
              {error}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
