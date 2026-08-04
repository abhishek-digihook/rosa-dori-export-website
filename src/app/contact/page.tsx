import type { Metadata } from "next";

import { EnquiryForm } from "@/components/EnquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow, PageHero } from "@/components/ui";
import { normaliseIntent } from "@/lib/enquiry";
import { productBySlug } from "@/lib/products";
import { process as workflow, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to ROSA DORI about samples, wholesale orders, private label programmes or custom product development. We reply to every enquiry within two working days.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const query = await searchParams;

  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  // Product pages deep-link here with ?product= and ?intent= prefilled.
  const intent = normaliseIntent(first(query.intent));

  const rawProduct = first(query.product) ?? "";
  const product = productBySlug(rawProduct)?.slug ?? "";

  const { address } = site.contact;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need."
        intro="Whether it is a single sample or a fifty-thousand-unit programme, the conversation starts the same way — with your brief and an honest answer about whether we are the right maker for it."
      />

      <section className="bg-cream">
        <div className="shell grid gap-16 py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-24 lg:py-28">
          {/* --- Form --- */}
          <Reveal direction="right">
            <h2 className="sr-only">Enquiry form</h2>
            <EnquiryForm defaultIntent={intent} defaultProduct={product} />
          </Reveal>

          {/* --- Details --- */}
          <Reveal direction="left" delay={0.1}>
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <Eyebrow>Direct</Eyebrow>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[0.62rem] tracking-[0.18em] text-mist uppercase">
                      General
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="link-wipe text-lg"
                      >
                        {site.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] tracking-[0.18em] text-mist uppercase">
                      Sales & wholesale
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${site.contact.sales}`}
                        className="link-wipe text-lg"
                      >
                        {site.contact.sales}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] tracking-[0.18em] text-mist uppercase">
                      Telephone & WhatsApp
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${site.contact.phoneHref}`}
                        className="link-wipe text-lg"
                      >
                        {site.contact.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-linen pt-8">
                <Eyebrow>Studio</Eyebrow>
                <address className="mt-5 text-sm leading-relaxed text-cocoa not-italic">
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.city}, {address.region} {address.postcode}
                  <br />
                  {address.country}
                </address>
                <p className="mt-5 text-sm text-mist">{site.contact.hours}</p>
              </div>

              <div className="border-t border-linen pt-8">
                <Eyebrow>What happens next</Eyebrow>
                <Stagger as="ol" gap={0.09} className="mt-6 space-y-6">
                  {workflow.map((step) => (
                    <StaggerItem as="li" key={step.step} className="flex gap-4">
                      <span className="font-display text-xl text-clay">
                        {step.step}
                      </span>
                      <span>
                        <span className="block text-sm tracking-wide">
                          {step.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-mist">
                          {step.copy}
                        </span>
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          Reassurance strip
          ============================================================ */}
      <section className="border-t border-linen bg-shell">
        <Stagger
          as="ul"
          gap={0.08}
          className="shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: "Two working days",
              copy: "Every enquiry gets a considered reply, not an autoresponder.",
            },
            {
              title: "Samples in 2–3 weeks",
              copy: "Physical samples to your dimensions and branding, with two revision rounds included.",
            },
            {
              title: "Export-ready",
              copy: "Full documentation, compliance paperwork and freight to your door.",
            },
            {
              title: "Made to order",
              copy: "Nothing here is stock — everything is specified and built for you.",
            },
          ].map((item) => (
            <StaggerItem as="li" key={item.title}>
              <h3 className="text-[0.66rem] tracking-[0.18em] uppercase">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">
                {item.copy}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
