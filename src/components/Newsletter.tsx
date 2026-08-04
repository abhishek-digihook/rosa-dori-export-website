"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type State = "idle" | "sending" | "done" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setState("done");
      setEmail("");
    } catch {
      setState("error");
      setMessage("We couldn't reach the server. Please try again.");
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-bark/40 pb-3 text-sm text-bark"
          >
            Thank you — you&apos;re on the list. We write rarely, and only when
            there is something worth sharing.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex max-w-md items-stretch gap-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-1 border-b border-espresso/25 bg-transparent px-1 py-3 text-sm placeholder:text-mist focus:border-bark focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="shrink-0 bg-bark px-6 py-3 text-[0.66rem] tracking-[0.18em] text-cream uppercase transition-colors hover:bg-bark-deep disabled:opacity-60"
            >
              {state === "sending" ? "…" : "Subscribe"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {state === "error" && (
        <p role="alert" className="mt-2 text-xs text-wine">
          {message}
        </p>
      )}
    </div>
  );
}
