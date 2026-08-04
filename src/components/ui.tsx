import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const buttonBase =
  "group relative inline-flex items-center justify-center overflow-hidden px-8 py-4 text-[0.7rem] tracking-[0.18em] uppercase transition-colors duration-500";

/** Solid brown button — the primary call to action. */
export function ButtonLink({
  href,
  children,
  className = "",
  ...rest
}: { href: string; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "children" | "className"
>) {
  return (
    <Link
      href={href}
      className={`${buttonBase} bg-bark text-cream hover:text-cream ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      {/* A darker panel wipes up from the bottom on hover. */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-bark-deep transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
    </Link>
  );
}

/** Outlined button that fills on hover. */
export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${buttonBase} border border-bark text-bark hover:text-cream ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-bark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
    </Link>
  );
}

/** Text link with a sliding arrow — used for tertiary navigation. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[0.72rem] tracking-[0.18em] text-bark uppercase ${className}`}
    >
      <span className="link-wipe">{children}</span>
      <span className="relative block h-px w-8 overflow-hidden bg-bark/40">
        <span className="absolute inset-0 -translate-x-full bg-bark transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
      </span>
      <span
        aria-hidden
        className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Section furniture                                                   */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/**
 * Standard page banner. Every route except the home page opens with one, so
 * the site keeps a consistent entry rhythm.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-linen bg-shell">
      {/* Two soft washes of colour, drifting at different speeds. */}
      <div
        aria-hidden
        className="motion-safe:animate-drift-slow pointer-events-none absolute -top-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-clay/35 blur-3xl"
      />
      <div
        aria-hidden
        className="motion-safe:animate-drift pointer-events-none absolute -bottom-40 -left-20 h-[22rem] w-[22rem] rounded-full bg-linen/60 blur-3xl"
      />

      <div className="shell relative py-20 md:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-[2.75rem] leading-[1.05] md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-cocoa md:text-[1.05rem]">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

/** Heading block used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[2rem] leading-tight md:text-[2.75rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-cocoa">{intro}</p>
      )}
    </div>
  );
}

/** Thin capitalised metadata row, e.g. "Jute · Reusable · Custom sizes". */
export function MetaList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] tracking-[0.16em] text-mist uppercase">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="text-linen">/</span>}
          {item}
        </li>
      ))}
    </ul>
  );
}
