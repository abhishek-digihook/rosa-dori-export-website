import Link from "next/link";

import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { ProductArt } from "./ProductArt";
import { categories } from "@/lib/products";
import { materials, site } from "@/lib/site";

const storyLinks = [
  { label: "Our Journey", href: "/our-story" },
  { label: "Our Artisans", href: "/our-story#artisans" },
  { label: "How We Work", href: "/our-story#process" },
  { label: "Sustainability", href: "/sustainability" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Request a Sample", href: "/contact?intent=sample" },
  { label: "Wholesale Enquiries", href: "/contact?intent=wholesale" },
  { label: "Private Label", href: "/contact?intent=private-label" },
];

function SocialIcon({ name }: { name: "instagram" | "linkedin" | "pinterest" }) {
  const paths = {
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4" />
      </>
    ),
    pinterest: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 20c-.5-2 .3-4.2.8-6.3.2-.9-.4-1.7-.4-2.6 0-2.4 3-2.9 3-.6 0 1-.7 2.4-.7 3.4 0 2.4 3.2 2 3.9-1.5.5-2.7-1.3-4.7-3.9-4.7-2.8 0-4.4 2-4.4 4 0 .8.3 1.6.7 2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = site.contact;

  return (
    <footer className="mt-auto">
      {/* --- Newsletter band ------------------------------------------- */}
      <section className="border-t border-linen bg-shell">
        <div className="grid lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div className="relative hidden min-h-[16rem] overflow-hidden lg:block">
            <ProductArt
              art={{
                form: "pouch",
                handle: "drawstring",
                texture: "khadi",
                palette: "clay",
                accent: "botanical",
              }}
              id="footer-art"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center px-6 py-16 md:px-12 lg:py-20 xl:px-20">
            <div className="w-full">
              <h2 className="font-display text-4xl md:text-[2.75rem]">
                Stay inspired.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cocoa">
                Be the first to know about new collections, sustainable living
                ideas, and stories from our journey.
              </p>
              <div className="mt-8">
                <Newsletter />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Link columns ---------------------------------------------- */}
      <div className="border-t border-linen bg-sand">
        <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-block text-espresso">
              <Logo wordClassName="text-[1.3rem]" />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cocoa">
              Timeless designs handcrafted in India using natural fibers.
              Inspired by tradition, made for today.
            </p>

            <ul className="mt-7 flex gap-3">
              {(
                [
                  ["instagram", site.social.instagram],
                  ["linkedin", site.social.linkedin],
                  ["pinterest", site.social.pinterest],
                ] as const
              ).map(([name, href]) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`ROSA DORI on ${name}`}
                    className="flex h-9 w-9 items-center justify-center border border-linen text-cocoa transition-colors hover:border-bark hover:text-bark"
                  >
                    <SocialIcon name={name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Our Story" links={storyLinks} />

          <FooterColumn
            title="Collections"
            links={categories.map((c) => ({
              label: c.name,
              href: `/collections/${c.slug}`,
            }))}
          />

          <FooterColumn
            title="Materials"
            links={materials.slice(0, 5).map((m) => ({
              label: m.name,
              href: "/materials",
            }))}
          />

          <FooterColumn title="Support" links={supportLinks} />
        </div>

        {/* --- Contact strip ------------------------------------------- */}
        <div className="shell">
          <div className="rule" />
          <div className="grid gap-6 py-8 text-sm text-cocoa sm:grid-cols-3">
            <p>
              <span className="mb-1 block text-[0.68rem] tracking-[0.2em] text-mist uppercase">
                Email
              </span>
              <a href={`mailto:${site.contact.email}`} className="link-wipe">
                {site.contact.email}
              </a>
            </p>
            <p>
              <span className="mb-1 block text-[0.68rem] tracking-[0.2em] text-mist uppercase">
                Telephone
              </span>
              <a href={`tel:${site.contact.phoneHref}`} className="link-wipe">
                {site.contact.phone}
              </a>
            </p>
            <p>
              <span className="mb-1 block text-[0.68rem] tracking-[0.2em] text-mist uppercase">
                Studio
              </span>
              <span className="not-italic">
                {address.line2}, {address.city} {address.postcode},{" "}
                {address.country}
              </span>
            </p>
          </div>
        </div>

        {/* --- Legal ---------------------------------------------------- */}
        <div className="border-t border-linen">
          <div className="shell flex flex-col gap-2 py-5 text-[0.7rem] tracking-wide text-mist sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p>Crafted in India. Loved worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[0.66rem] tracking-[0.2em] text-espresso uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-cocoa transition-colors hover:text-bark"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
