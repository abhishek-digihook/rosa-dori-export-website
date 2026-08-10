"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { site } from "@/lib/site";

/**
 * The enquiry modal.
 *
 * Submissions go straight from the browser to a free form-to-email service, so
 * there is no route, no mail server and no database of our own. Two providers
 * are supported — set whichever you prefer in `.env.local`:
 *
 *   NEXT_PUBLIC_ENQUIRY_EMAIL   FormSubmit (https://formsubmit.co) — no signup.
 *                               Enquiries are emailed to this address. The very
 *                               first submission triggers a one-time activation
 *                               email; click the link in it and the form is on.
 *
 *   NEXT_PUBLIC_WEB3FORMS_KEY   Web3Forms (https://web3forms.com) — needs a key
 *                               from their site, but keeps the address out of
 *                               the page source. Wins if both are set.
 *
 * ⚠️  With neither set the form still accepts a submission and still shows the
 * thank-you screen, but the enquiry is DISCARDED — it goes nowhere. That is a
 * deliberate pre-launch state so the flow can be demonstrated before a key
 * exists. Every discarded submission is logged to the browser console. Set a
 * key before this site takes real traffic; see README.md → "Before you go
 * live".
 */

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENQUIRY_EMAIL = process.env.NEXT_PUBLIC_ENQUIRY_EMAIL;

const delivery = WEB3FORMS_KEY
  ? { via: "web3forms" as const, url: "https://api.web3forms.com/submit" }
  : ENQUIRY_EMAIL
    ? {
        via: "formsubmit" as const,
        url: `https://formsubmit.co/ajax/${encodeURIComponent(ENQUIRY_EMAIL)}`,
      }
    : null;

/** Pass a product name to record what the enquiry is about. */
type OpenEnquiry = (product?: string) => void;

const EnquiryContext = createContext<OpenEnquiry | null>(null);

export function useEnquiry(): OpenEnquiry {
  const open = useContext(EnquiryContext);
  if (!open) {
    throw new Error("useEnquiry must be called inside <EnquiryProvider>");
  }
  return open;
}

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-espresso/20 bg-transparent py-3 text-sm text-espresso transition-colors focus:border-bark focus:outline-none";

const labelClass = "block text-[0.68rem] tracking-[0.18em] text-mist uppercase";

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<string | null>(null);

  const openEnquiry = useCallback<OpenEnquiry>((forProduct) => {
    setProduct(forProduct ?? null);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <EnquiryContext.Provider value={openEnquiry}>
      {children}
      {/* Mounted only while open, so every visit starts on a blank form
          rather than on the last one's success screen. */}
      <AnimatePresence>
        {open && <EnquiryModal product={product} onClose={close} />}
      </AnimatePresence>
    </EnquiryContext.Provider>
  );
}

function EnquiryModal({
  product,
  onClose,
}: {
  product: string | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<Element | null>(null);

  useEffect(() => {
    if (!delivery) {
      console.warn(
        "[enquiry] NO DELIVERY CONFIGURED — this form shows the thank-you " +
          "screen but discards every enquiry. Set NEXT_PUBLIC_WEB3FORMS_KEY " +
          "(or NEXT_PUBLIC_ENQUIRY_EMAIL) and rebuild before taking real " +
          "traffic. See README.md → Wiring up the form.",
      );
    }
  }, []);

  // Escape to close, and the page behind must not scroll under the dialog.
  useEffect(() => {
    returnFocusTo.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    firstFieldRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      // Send focus back to whichever button opened the dialog.
      if (returnFocusTo.current instanceof HTMLElement) {
        returnFocusTo.current.focus();
      }
    };
  }, [onClose]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const honeypot = String(data.get("botcheck") ?? "");

    // Pre-launch, with no provider configured: walk through the states so the
    // flow can be demonstrated, but say plainly in the console that the
    // enquiry has been thrown away.
    if (!delivery) {
      setStatus("sending");
      console.warn(
        "[enquiry] DISCARDED — no delivery configured. This enquiry was not " +
          "sent anywhere:",
        { name, email, phone: phone || "—", product: product ?? "—" },
      );
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("sent");
      form.reset();
      return;
    }

    const subject = product
      ? `Product enquiry — ${product}`
      : `Website enquiry — ${name}`;

    const shared = {
      name,
      email,
      phone: phone || "—",
      product: product ?? "—",
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(delivery.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          delivery.via === "web3forms"
            ? {
                ...shared,
                access_key: WEB3FORMS_KEY,
                from_name: `${site.name} website`,
                subject,
                // Web3Forms drops anything with this filled in.
                botcheck: honeypot,
              }
            : {
                ...shared,
                _subject: subject,
                _template: "table",
                _captcha: "false",
                // FormSubmit's equivalent honeypot.
                _honey: honeypot,
              },
        ),
      });

      // Web3Forms returns a boolean, FormSubmit the string "true".
      const body = (await res.json()) as {
        success?: boolean | string;
        message?: string;
      };
      const delivered = body.success === true || body.success === "true";

      if (!res.ok || !delivered) {
        // The provider's own message is a diagnostic for us, not something a
        // visitor should read — "Use our API in client side", and so on.
        console.error(
          `[enquiry] ${delivery.via} rejected the submission (${res.status}): ${body.message ?? "no message"}`,
        );
        setStatus("error");
        setError(
          `We couldn't send that just now. Please email us at ${site.contact.email} and we will pick it up from there.`,
        );
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        `We couldn't reach the server. Please email us at ${site.contact.email} and we will pick it up from there.`,
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-4 sm:items-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close enquiry form"
        onClick={onClose}
        className="fixed inset-0 -z-10 cursor-default bg-espresso/45 backdrop-blur-[2px]"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg border border-linen bg-cream p-7 shadow-[0_40px_90px_-40px_rgba(43,32,24,0.55)] sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center text-mist transition-colors hover:text-bark"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path
              d="M5 5l14 14M19 5L5 19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="py-4 text-center">
            <h2 id="enquiry-title" className="font-display text-3xl">
              Thank you.
            </h2>
            <p className="mx-auto mt-4 max-w-sm leading-relaxed text-cocoa">
              Your enquiry has reached us. Someone from the team will reply
              within two working days.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 text-[0.68rem] tracking-[0.18em] text-bark uppercase underline underline-offset-4"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Enquiry</p>
            <h2
              id="enquiry-title"
              className="mt-3 font-display text-[1.75rem] leading-snug md:text-[2rem]"
            >
              Tell us what you need.
            </h2>

            {product && (
              <p className="mt-4 border border-linen bg-sand/70 px-4 py-3 text-sm text-cocoa">
                <span className="text-[0.68rem] tracking-[0.16em] text-mist uppercase">
                  About
                </span>
                <span className="mt-1 block text-espresso">{product}</span>
              </p>
            )}

            <form onSubmit={onSubmit} className="mt-7 space-y-6">
              {/* Honeypot — people never see it, bots fill it in. */}
              <div
                aria-hidden
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="enquiry-botcheck">Leave this empty</label>
                <input
                  id="enquiry-botcheck"
                  name="botcheck"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="enquiry-name" className={labelClass}>
                  Full name *
                </label>
                <input
                  ref={firstFieldRef}
                  id="enquiry-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="enquiry-email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="enquiry-phone" className={labelClass}>
                  Phone / WhatsApp{" "}
                  <span className="tracking-normal normal-case">
                    (optional)
                  </span>
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1">
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
              </div>

              <p className="text-xs leading-relaxed text-mist">
                We use your details only to answer this enquiry. They are never
                shared with third parties and never added to a marketing list.
              </p>

              {status === "error" && (
                <p role="alert" className="text-sm text-wine">
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
