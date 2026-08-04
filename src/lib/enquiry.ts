/**
 * Shared between the client-side form and the server-rendered contact page,
 * so it deliberately lives outside the "use client" boundary — a non-component
 * export from a client module becomes an opaque reference on the server.
 */
export const INTENTS = [
  { value: "general", label: "General enquiry" },
  { value: "sample", label: "Request a sample" },
  { value: "wholesale", label: "Wholesale / bulk order" },
  { value: "private-label", label: "Private label programme" },
  { value: "custom", label: "Custom product development" },
] as const;

export type IntentValue = (typeof INTENTS)[number]["value"];

const VALID = new Set<string>(INTENTS.map((intent) => intent.value));

/** Falls back to "general" for anything unrecognised in a query string. */
export const normaliseIntent = (value: string | undefined): string =>
  value && VALID.has(value) ? value : "general";
