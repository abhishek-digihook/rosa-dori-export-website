import type { Metadata } from "next";

import { ProductArt } from "@/components/ProductArt";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EnquireButton } from "@/components/enquiry/EnquireButton";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";
import { materials } from "@/lib/site";
import type { ArtSpec } from "@/lib/products";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "The six natural fibres ROSA DORI works in — jute, cotton canvas, Shital Pati murta reed, khadi, handmade paper and linen — where each comes from and what it is good for.",
  alternates: { canonical: "/materials" },
};

/** Artwork paired with each material in the grid. */
const MATERIAL_ART: ArtSpec[] = [
  { form: "sack", handle: "rope", texture: "jute", palette: "wheat", accent: "label" },
  { form: "tote", handle: "webbing", texture: "canvas", palette: "natural", accent: "none" },
  { form: "round-basket", handle: "twin-loop", texture: "sitalpati", palette: "indigo", accent: "none" },
  { form: "pouch", handle: "drawstring", texture: "khadi", palette: "paper", accent: "none" },
  { form: "gift-bag", handle: "rope", texture: "paper", palette: "clay", accent: "botanical" },
  { form: "purse", handle: "shoulder", texture: "lace", palette: "shimmer", accent: "none" },
];

/** How a fibre becomes a finished piece — the same for every material. */
const finishes = [
  {
    title: "Printing",
    copy: "Screen and pad printing in water-based pigment, single or multi-colour, matched to your brand guidelines.",
  },
  {
    title: "Labelling",
    copy: "Woven and embroidered labels, stitched patches, swing tags and printed care instructions.",
  },
  {
    title: "Linings",
    copy: "Organic cotton, unbleached khadi and laminated interiors — including food-contact linings where the piece needs one.",
  },
  {
    title: "Dimensions",
    copy: "Every product is cut to order, so sizes, gussets, handle drops and closures are all specified with you.",
  },
];

export default function MaterialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Materials"
        title="Six fibres we know well."
        intro="We work in a deliberately narrow set of materials, because knowing a fibre properly is what lets you push it. Each is grown or made in India unless noted."
      />

      {/* ============================================================
          The fibres
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell py-20 lg:py-28">
          <Stagger
            as="ul"
            gap={0.08}
            className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {materials.map((material, i) => (
              <StaggerItem as="li" key={material.name} className="group">
                <div className="aspect-square overflow-hidden bg-sand">
                  <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    <ProductArt
                      art={MATERIAL_ART[i]}
                      id={`material-${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-2xl">{material.name}</h2>
                  <p className="text-[0.66rem] tracking-[0.16em] text-mist uppercase">
                    {material.origin}
                  </p>
                </div>
                <p className="mt-3.5 text-sm leading-relaxed text-cocoa">
                  {material.copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          Finishing and customisation
          ============================================================ */}
      <section className="border-y border-linen bg-shell">
        <div className="shell py-20 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Finishing"
              title="What we can do to a fibre."
              intro="Material is only half of a specification. These options apply across the range, whichever collection a piece comes from."
            />
          </Reveal>

          <Stagger
            as="ul"
            gap={0.09}
            className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2"
          >
            {finishes.map((item, i) => (
              <StaggerItem as="li" key={item.title} className="flex gap-6">
                <span className="font-display text-3xl text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <h3 className="font-display text-2xl leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">
                    {item.copy}
                  </p>
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-16 flex flex-wrap items-center gap-6">
            <EnquireButton>Request a sample</EnquireButton>
            <ArrowLink href="/collections">View all collections</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
