"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "./Logo";
import { useEnquiry } from "./enquiry/EnquiryProvider";
import { navigation, site } from "@/lib/site";

/* ------------------------------------------------------------------ */

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/* ------------------------------------------------------------------ */
/* Desktop dropdown                                                    */
/* ------------------------------------------------------------------ */

function CollectionsMenu({
  item,
  active,
}: {
  item: (typeof navigation)[number];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // A short close delay keeps the menu from vanishing as the pointer crosses
  // the gap between the trigger and the panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickAway = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        data-active={active}
        className="link-wipe inline-flex items-center gap-1.5 py-2 text-[0.72rem] tracking-[0.16em] uppercase transition-colors hover:text-bark"
      >
        {item.label}
        <motion.svg
          viewBox="0 0 12 8"
          className="h-2 w-3"
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </motion.svg>
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            // Left edge aligned to the trigger, not centred on it — centred
            // put a 24rem panel halfway under its neighbours either side.
            className="absolute top-full left-0 z-50 w-[24rem] pt-4"
          >
            <div className="overflow-hidden border border-linen bg-cream shadow-[0_24px_60px_-28px_rgba(43,32,24,0.45)]">
              <ul className="p-2">
                {item.children?.map((child, i) => (
                  <motion.li
                    key={child.href}
                    initial={reduced ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.35 }}
                  >
                    <Link
                      href={child.href}
                      className="group flex items-baseline justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-sand"
                    >
                      <span className="font-display text-lg leading-snug">
                        {child.label}
                      </span>
                      <span
                        aria-hidden
                        className="translate-x-0 text-bark opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/collections"
                className="block border-t border-linen bg-sand/60 px-6 py-3 text-[0.68rem] tracking-[0.18em] uppercase text-bark transition-colors hover:bg-sand"
              >
                View all collections →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile menu                                                         */
/* ------------------------------------------------------------------ */

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const openEnquiry = useEnquiry();

  // Lock the page behind the overlay while it is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 overflow-y-auto bg-cream lg:hidden"
        >
          <div className="shell flex min-h-full flex-col pt-28 pb-16">
            <nav>
              <ul className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                    className="border-b border-linen py-4"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline justify-between font-display text-3xl"
                    >
                      {item.label}
                      {pathname === item.href && (
                        <span className="text-xs tracking-[0.2em] text-bark uppercase">
                          Current
                        </span>
                      )}
                    </Link>

                    {item.children && (
                      <ul className="mt-3 space-y-2 pl-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="flex items-center gap-2 py-1 text-sm text-cocoa transition-colors hover:text-bark"
                            >
                              <span className="h-px w-4 bg-linen" aria-hidden />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.5 }}
              className="mt-10"
            >
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openEnquiry();
                }}
                className="inline-flex w-full items-center justify-center bg-bark px-8 py-4 text-[0.72rem] tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bark-deep"
              >
                Enquire Now
              </button>
              <p className="mt-6 text-sm text-cocoa">
                <a href={`mailto:${site.contact.email}`} className="link-wipe">
                  {site.contact.email}
                </a>
              </p>
              <p className="mt-1 text-sm text-cocoa">
                <a href={`tel:${site.contact.phoneHref}`} className="link-wipe">
                  {site.contact.phone}
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const openEnquiry = useEnquiry();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);

  // Close the overlay whenever the route changes — including on browser
  // back/forward, which never fires the links' own onClick. Adjusting state
  // during render (rather than in an effect) avoids a flash of the old state.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) => {
    // Section links ("/#our-story") are positions on a page, not pages. There
    // is no scroll spy, so none of them claims the active underline.
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <>
      {/* Announcement bar — scrolls away with the page. */}
      <div className="bg-bark text-cream">
        {/* min-height rather than a fixed height: the strapline wraps to two
            lines on narrow screens and must not be clipped. */}
        <div className="shell flex min-h-9 items-center justify-center py-2">
          <p className="text-center text-[0.66rem] tracking-[0.2em] uppercase opacity-90 sm:text-[0.68rem] sm:tracking-[0.24em]">
            {site.strapline}
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-linen bg-cream/92 backdrop-blur-md"
            : "border-b border-transparent bg-cream/0"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6 py-4">
          <Link href="/" className="shrink-0 text-espresso">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navigation.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <CollectionsMenu item={item} active={isActive(item.href)} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-active={isActive(item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="link-wipe py-2 text-[0.72rem] tracking-[0.16em] uppercase transition-colors hover:text-bark"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="group relative hidden overflow-hidden border border-bark px-6 py-3 text-[0.68rem] tracking-[0.18em] text-bark uppercase transition-colors duration-500 hover:text-cream sm:inline-block"
            >
              <span className="relative z-10">Enquire Now</span>
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-bark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-espresso transition-transform duration-300 ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-espresso transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-espresso transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
