import type { Metadata } from "next";

import { ProductArt } from "@/components/ProductArt";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
  ArrowLink,
  ButtonLink,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/ui";
import { materials, process, site } from "@/lib/site";
import type { ArtSpec } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "ROSA DORI was founded by three women to bring the elegance of Indian craftsmanship to the global stage. Meet our artisans, our materials and the way we work.",
  alternates: { canonical: "/our-story" },
};

/** Artwork paired with each material in the materials grid. */
const MATERIAL_ART: ArtSpec[] = [
  { form: "sack", handle: "rope", texture: "jute", palette: "wheat", accent: "label" },
  { form: "tote", handle: "webbing", texture: "canvas", palette: "natural", accent: "none" },
  { form: "round-basket", handle: "twin-loop", texture: "sitalpati", palette: "indigo", accent: "none" },
  { form: "pouch", handle: "drawstring", texture: "khadi", palette: "paper", accent: "none" },
  { form: "gift-bag", handle: "rope", texture: "paper", palette: "clay", accent: "botanical" },
  { form: "purse", handle: "shoulder", texture: "lace", palette: "shimmer", accent: "none" },
];

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
    copy: "Chikankari, Shital Patti weaving and hand paper-making survive by being commissioned. Every order keeps a technique in daily use.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Rooted in nature. Inspired by purpose."
        intro="ROSA DORI was founded by three women with a vision to bring the elegance of Indian craftsmanship to the global stage — and a conviction that beautiful things need not cost the earth."
      />

      {/* ============================================================
          The founding
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell grid items-center gap-16 py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-24 lg:py-32">
          <Reveal direction="right">
            <Eyebrow>The beginning</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-tight md:text-[2.75rem]">
              Three women, one conviction.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-cocoa">
              <p>
                We started ROSA DORI because we kept seeing the same gap. Indian
                craft was admired everywhere and understood almost nowhere —
                sold as souvenir rather than design, priced as commodity rather
                than skill.
              </p>
              <p>
                So we built a company around the opposite premise: that a jute
                bottle bag or a hand-woven reed basket can hold its own beside
                anything on an international shelf, provided the design is
                considered and the making is honest.
              </p>
              <p>
                Everything we make is produced to order for brands who care
                about where their packaging comes from. We are a manufacturing
                partner, not a marketplace — which means the work is specified
                with you, sampled for you, and made by people we know.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-linen pt-8">
              {[
                "Founded by three women",
                "Made across Bengal & Uttar Pradesh",
                "Exported worldwide",
              ].map((fact) => (
                <p
                  key={fact}
                  className="text-[0.66rem] tracking-[0.16em] text-bark uppercase"
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
                  form: "round-basket",
                  handle: "twin-loop",
                  texture: "sitalpati",
                  palette: "clay",
                  accent: "botanical",
                }}
                id="story-founding"
                className="h-full w-full object-cover"
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          Artisans
          ============================================================ */}
      <section id="artisans" className="scroll-mt-24 border-y border-linen bg-shell">
        <div className="shell grid items-center gap-16 py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-24 lg:py-32">
          <Reveal direction="right" className="order-2 lg:order-1">
            <Parallax distance={42} className="relative aspect-4/5">
              <ProductArt
                art={{
                  form: "bottle",
                  handle: "twin-loop",
                  texture: "khadi",
                  palette: "paper",
                  accent: "chikankari",
                }}
                id="story-artisans"
                className="h-full w-full object-cover"
              />
            </Parallax>
          </Reveal>

          <Reveal direction="left" className="order-1 lg:order-2">
            <Eyebrow>Our Artisans</Eyebrow>
            <h2 className="mt-5 text-[2rem] leading-tight md:text-[2.75rem]">
              The hands behind every piece.
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-cocoa">
              <p>
                We work with clusters of skilled women artisans across West
                Bengal and Uttar Pradesh — jute weavers, Chikankari
                embroiderers, Shital Patti mat-makers and hand paper-makers.
                Many learned their craft from a previous generation and are
                teaching it to the next.
              </p>
              <p>
                These are long relationships rather than transactions. Artisans
                are paid per piece at rates agreed before a run begins, work
                from their own homes or shared workshops, and set their own
                hours around the rest of their lives.
              </p>
              <p>
                It also explains the variation you will find in a delivered
                order. A hand-embroidered panel is not a printed one; a woven
                mat carries the tension of the person who wove it. We treat that
                as the value, not the defect.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          Materials
          ============================================================ */}
      <section id="materials" className="scroll-mt-24 bg-cream">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <SectionHeading
              eyebrow="Materials"
              title="Six fibres we know well."
              intro="We work in a deliberately narrow set of materials, because knowing a fibre properly is what lets you push it. Each is grown or made in India unless noted."
            />
          </Reveal>

          <Stagger
            as="ul"
            gap={0.08}
            className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
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
                  <h3 className="font-display text-2xl">{material.name}</h3>
                  <p className="text-[0.62rem] tracking-[0.16em] text-mist uppercase">
                    {material.origin}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cocoa">
                  {material.copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          Sustainability
          ============================================================ */}
      <section
        id="sustainability"
        className="scroll-mt-24 border-y border-linen bg-shell"
      >
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <SectionHeading
              eyebrow="Sustainability"
              title="Four commitments, plainly stated."
              intro="We would rather describe what we actually do than claim a certification we have not earned."
            />
          </Reveal>

          <Stagger
            as="ul"
            gap={0.09}
            className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2"
          >
            {commitments.map((item, i) => (
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
        </div>
      </section>

      {/* ============================================================
          Process
          ============================================================ */}
      <section id="process" className="scroll-mt-24 bg-cream">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <SectionHeading
              eyebrow="How We Work"
              title="From brief to freight."
              intro="A straightforward three-stage process, whether you are ordering five hundred pieces or fifty thousand."
            />
          </Reveal>

          <Stagger as="ol" gap={0.12} className="mt-16 grid gap-12 md:grid-cols-3">
            {process.map((step) => (
              <StaggerItem as="li" key={step.step} className="relative">
                <span className="font-display text-5xl text-linen">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cocoa">
                  {step.copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-16 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact">Start an enquiry</ButtonLink>
            <ArrowLink href="/collections">Browse the collections</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          Closing note
          ============================================================ */}
      <section className="border-t border-linen bg-sand">
        <Reveal className="shell max-w-3xl py-20 text-center">
          <p className="font-display text-[1.75rem] leading-snug md:text-[2.25rem]">
            &ldquo;{site.strapline}&rdquo;
          </p>
          <p className="mt-6 text-[0.66rem] tracking-[0.2em] text-mist uppercase">
            {site.name}
          </p>
        </Reveal>
      </section>
    </>
  );
}
