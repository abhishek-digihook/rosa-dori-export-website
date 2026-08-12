"use client";

import { BUTTON_WIPE, buttonGhost, buttonSolid } from "@/components/ui";

import { useEnquiry } from "./EnquiryProvider";

/**
 * Opens the enquiry modal. Styled to match <ButtonLink> and <GhostLink> so it
 * can stand in for either wherever a CTA used to navigate to /contact.
 *
 * Pass `product` from a product page and the enquiry records which piece it is
 * about.
 */
export function EnquireButton({
  children,
  product,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  product?: string;
  /** "link" renders as plain text, for use inside a list of links. */
  variant?: "solid" | "ghost" | "link";
  className?: string;
}) {
  const openEnquiry = useEnquiry();

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={() => openEnquiry(product)}
        className={`text-left text-sm text-cocoa transition-colors hover:text-bark ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openEnquiry(product)}
      className={`${variant === "solid" ? buttonSolid : buttonGhost} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span
        aria-hidden
        className={`${BUTTON_WIPE} ${
          variant === "solid" ? "bg-bark-deep" : "bg-bark"
        }`}
      />
    </button>
  );
}
