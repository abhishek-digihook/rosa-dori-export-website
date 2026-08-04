import Link from "next/link";

import { ButtonLink, Eyebrow, GhostLink } from "@/components/ui";
import { categories } from "@/lib/products";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-shell">
      <div
        aria-hidden
        className="motion-safe:animate-drift-slow pointer-events-none absolute -top-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-clay/35 blur-3xl"
      />

      <div className="shell relative flex min-h-[70svh] flex-col justify-center py-24">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-[2.5rem] leading-tight md:text-6xl">
          This thread leads nowhere.
        </h1>
        <p className="mt-6 max-w-lg leading-relaxed text-cocoa">
          The page you were looking for has moved or never existed. The
          collections below are a good place to pick the trail back up.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <GhostLink href="/contact">Contact us</GhostLink>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-3 border-t border-linen pt-8 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/collections/${category.slug}`}
                className="group flex items-baseline justify-between gap-4 py-2"
              >
                <span className="font-display text-xl transition-colors group-hover:text-bark">
                  {category.name}
                </span>
                <span
                  aria-hidden
                  className="text-bark transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
