import type { Metadata } from "next";

import { ProductArt } from "@/components/ProductArt";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EnquireButton } from "@/components/enquiry/EnquireButton";
import {
  ArrowLink,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Sustainable by nature, crafted in India. How ROSA DORI works — biodegradable natural fibres, products built for reuse, and fair, ethical manufacturing described plainly rather than certified.",
  alternates: { canonical: "/sustainability" },
};

const commitments = [
  {
    title: "Materials that return to the earth",
    copy: "Jute, cotton, khadi, murta reed and cotton-rag paper are all biodegradable. Nothing we make is designed to outlive its usefulness in a landfill.",
  },
  {
    title: "Made to be used again",
    copy: "Almost every piece in the range is built for reuse rather than a single journey. Reinforced seams, washable linings and honest construction are the point, not an upgrade.",
  },
  {
    title: "Work that stays in the village",
    copy: "We produce close to where the fibre is grown and where the craft is held, so income reaches the artisan rather than a chain of intermediaries.",
  },
  {
    title: "Craft preserved by practice",
    copy: "Chikankari, Shital Pati weaving and hand paper-making survive by being commissioned. Every order keeps a technique in daily use.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Sustainable by nature. Crafted in India."
        intro="We would rather describe what we actually do than claim a certification we have not earned. Here is the whole of it, in plain language."
      />

      {/* ============================================================
          Commitments
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell py-20 lg:py-28">
          <Stagger
            as="ul"
            gap={0.09}
            className="grid gap-x-10 gap-y-12 md:grid-cols-2"
          >
            {commitments.map((item, i) => (
              <StaggerItem as="li" key={item.title} className="flex gap-6">
                <span className="font-display text-3xl text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <h2 className="font-display text-2xl leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-3.5 text-sm leading-relaxed text-cocoa">
                    {item.copy}
                  </p>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          Ethical manufacturing
          ============================================================ */}
      <section className="border-y border-linen bg-shell">
        <div className="shell grid items-center gap-16 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:py-28">
          <Reveal direction="right">
            <Eyebrow>Ethical Manufacturing</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-tight md:text-[2.75rem]">
              Fair work, described rather than certified.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-cocoa">
              <p>
                We do not hold a fair trade certificate, and we will not imply
                one. What we can tell you is how the work is arranged: artisans
                are paid per piece at rates agreed before a run begins, work
                from their own homes or shared workshops, and set their own
                hours around the rest of their lives.
              </p>
              <p>
                Production sits close to where the fibre is grown and where the
                craft is held — jute weaving and Shital Pati in West Bengal,
                Chikankari embroidery in Uttar Pradesh — so the money reaches
                the maker instead of a chain of intermediaries.
              </p>
              <p>
                If you need documentation for your own supply chain reporting,
                ask. We would rather show you the arrangement than summarise it
                in a logo.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-linen pt-8">
              {[
                "Ethically sourced",
                "Consciously crafted",
                "Made in India",
              ].map((fact) => (
                <p
                  key={fact}
                  className="text-[0.7rem] tracking-[0.16em] text-bark uppercase"
                >
                  {fact}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <Parallax distance={42} className="relative aspect-4/5">
              <ProductArt
                art={{
                  form: "bottle",
                  handle: "rope",
                  texture: "paper",
                  palette: "forest",
                  accent: "seed",
                }}
                id="sustainability-ethics"
                className="h-full w-full object-cover"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          End of life
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="End of life"
              title="Where a ROSA DORI piece goes next."
              intro="Reuse first, then recycling, then the compost heap. Only one product in the range is designed to be used once — and that one grows into something."
            />
          </Reveal>

          <Stagger
            as="ul"
            gap={0.08}
            className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Reused",
                copy: "Jute, canvas and reed pieces are built to be carried for years. Washable linings and reinforced seams are standard, not an upgrade.",
              },
              {
                title: "Recycled",
                copy: "Handmade paper bags are cotton rag, unlaminated and free of plastic film, so they go into paper recycling intact.",
              },
              {
                title: "Planted",
                copy: "Our seed paper bottle bags are embedded with basil, marigold or tomato seed. Plant the bag after use and it becomes the herb.",
              },
            ].map((item) => (
              <StaggerItem as="li" key={item.title}>
                <h3 className="text-[0.7rem] tracking-[0.18em] uppercase">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-cocoa">
                  {item.copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-16 flex flex-wrap items-center gap-6">
            <EnquireButton>Start an enquiry</EnquireButton>
            <ArrowLink href="/collections">View all collections</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
