import type { Metadata } from "next";

import { EnquireButton } from "@/components/enquiry/EnquireButton";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Eyebrow, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to ROSA DORI about samples, wholesale orders, private label programmes or custom product development. We reply to every enquiry within two working days.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need."
        intro="Whether it is a single sample or a fifty-thousand-unit programme, the conversation starts the same way — with your brief and an honest answer about whether we are the right maker for it."
      />

      <section className="bg-cream">
        <div className="shell grid gap-16 py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-24 lg:py-28">
          {/* --- Start an enquiry --- */}
          <Reveal direction="right">
            <Eyebrow>Send us a note</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-tight md:text-[2.5rem]">
              A short form, and we take it from there.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-cocoa">
              Your name and email are all we need. Add a number if you would
              rather we called, and a message if you already know what you are
              after. We reply to every enquiry within two working days, with a
              real answer rather than an acknowledgement.
            </p>
            <div className="mt-10">
              <EnquireButton>Start an enquiry</EnquireButton>
            </div>
            <p className="mt-6 max-w-lg text-xs leading-relaxed text-mist">
              We use your details only to answer your enquiry. They are never
              shared with third parties and never added to a marketing list.
            </p>
          </Reveal>

          {/* --- Details --- */}
          <Reveal direction="left" delay={0.1}>
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <Eyebrow>Direct</Eyebrow>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[0.68rem] tracking-[0.18em] text-mist uppercase">
                      Email
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
                    <dt className="text-[0.68rem] tracking-[0.18em] text-mist uppercase">
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
                <Eyebrow>Offices</Eyebrow>
                <div className="mt-5 space-y-6">
                  {site.contact.offices.map((office) => (
                    <div key={office.label}>
                      <p className="text-[0.68rem] tracking-[0.18em] text-mist uppercase">
                        {office.label}
                      </p>
                      <address className="mt-2 text-sm leading-relaxed text-cocoa not-italic">
                        {office.line1}
                        <br />
                        {office.line2}
                        <br />
                        {office.city}, {office.region} {office.postcode}
                        <br />
                        {office.country}
                      </address>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-mist">{site.contact.hours}</p>
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
