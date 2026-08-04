import Image from "next/image";
import Link from "next/link";

import { HeroScene } from "@/components/HeroScene";
import { PILLAR_ICONS } from "@/components/Icons";
import { Marquee } from "@/components/Marquee";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { KenBurns, Parallax } from "@/components/motion/Parallax";
import {
  Reveal,
  RevealLines,
  Stagger,
  StaggerItem,
} from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import { editorialPhoto } from "@/lib/media";
import {
  categories,
  categoryCount,
  featuredProducts,
  type ArtSpec,
} from "@/lib/products";
import { clients, pillars, site } from "@/lib/site";

/** The four supporting propositions beneath the collections list. */
const VALUES: { title: string; copy: string; art: ArtSpec }[] = [
  {
    title: "Thoughtful Design",
    copy: "Functional, elegant and made for everyday living.",
    art: {
      form: "tote",
      handle: "webbing",
      texture: "canvas",
      palette: "natural",
      accent: "none",
    },
  },
  {
    title: "Ethical Craftsmanship",
    copy: "Handcrafted by skilled artisans using time-honoured techniques.",
    art: {
      form: "round-basket",
      handle: "twin-loop",
      texture: "sitalpati",
      palette: "wheat",
      accent: "none",
    },
  },
  {
    title: "Sustainable Materials",
    copy: "Natural fibers chosen responsibly for a cleaner tomorrow.",
    art: {
      form: "bottle",
      handle: "rope",
      texture: "paper",
      palette: "forest",
      accent: "seed",
    },
  },
  {
    title: "Global Delivery",
    copy: "Tailored designs for global brands that value quality and uniqueness.",
    art: {
      form: "carrier",
      handle: "leather",
      texture: "canvas",
      palette: "clay",
      accent: "label",
    },
  },
];

export default function HomePage() {
  const hero = editorialPhoto("hero");
  const story = editorialPhoto("our-story");
  const featured = featuredProducts();

  return (
    <>
      {/* ============================================================
          Hero
          ============================================================ */}
      <section className="relative isolate flex min-h-[86svh] items-center overflow-hidden">
        <KenBurns className="absolute inset-0 -z-10">
          {hero ? (
            <Image
              src={hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <HeroScene className="h-full w-full object-cover" />
          )}
        </KenBurns>

        {/* Legibility. On desktop the type sits to the left of the subject, so
            a horizontal gradient is enough. On mobile the crop puts the subject
            directly behind the copy, so the whole frame gets a flat veil and
            the scene becomes a backdrop rather than an image. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-cream/72 md:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-cream from-10% via-cream/60 via-40% to-transparent to-80% md:via-cream/35 md:via-38% md:to-60%"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-cream to-transparent"
        />

        <div className="shell relative w-full py-24 md:py-32">
          <div className="max-w-2xl">
            <Reveal direction="none" duration={1}>
              <Eyebrow>Crafted by Nature</Eyebrow>
            </Reveal>

            <h1 className="mt-6 text-[2.9rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              <RevealLines
                lines={[
                  "Timeless Designs.",
                  "Natural Fibers.",
                  "Made for the World.",
                ]}
                delay={0.12}
              />
            </h1>

            <Reveal delay={0.5} className="mt-9">
              <span className="block h-px w-16 bg-bark/50" aria-hidden />
            </Reveal>

            <Reveal delay={0.58}>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-cocoa">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={0.7} className="mt-10">
              <ButtonLink href="/collections">Explore Collections</ButtonLink>
            </Reveal>
          </div>
        </div>

        {/* Scroll cue, pinned to the left gutter so it reads as part of the
            type column rather than as a stray mark in the middle of the image. */}
        <div
          aria-hidden
          className="shell absolute inset-x-0 bottom-8 hidden md:block"
        >
          <span className="flex items-center gap-3 text-[0.6rem] tracking-[0.2em] text-bark/60 uppercase">
            Scroll
            <span className="block h-px w-10 overflow-hidden bg-bark/25">
              <span className="motion-safe:animate-drift block h-px w-4 bg-bark/70" />
            </span>
          </span>
        </div>
      </section>

      {/* ============================================================
          Pillars
          ============================================================ */}
      <section className="border-y border-linen bg-shell">
        <Stagger
          as="ul"
          gap={0.06}
          className="shell grid grid-cols-2 divide-linen md:grid-cols-3 lg:grid-cols-6 lg:divide-x"
        >
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i];
            return (
              <StaggerItem
                as="li"
                key={pillar.title}
                className="group flex flex-col items-center px-4 py-9 text-center"
              >
                <Icon className="h-7 w-7 text-bark transition-transform duration-500 group-hover:-translate-y-1" />
                <p className="mt-4 text-[0.62rem] tracking-[0.18em] uppercase">
                  {pillar.title}
                </p>
                <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-mist">
                  {pillar.copy}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ============================================================
          Our story
          ============================================================ */}
      <section className="relative overflow-hidden bg-cream">
        <div className="shell grid items-center gap-14 py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
          <Reveal direction="right">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] leading-tight md:text-[3rem]">
              Rooted in Nature.
              <br />
              Inspired by Purpose.
            </h2>
            <p className="mt-8 max-w-xl leading-relaxed text-cocoa">
              ROSA DORI was founded by three women with a vision to bring the
              elegance of Indian craftsmanship to the global stage. We create
              timeless lifestyle products from natural fibers that combine
              thoughtful design, lasting quality and conscious craftsmanship.
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-cocoa">
              Rooted in sustainability and driven by purpose, we proudly
              collaborate with skilled women artisans, preserving traditional
              techniques while creating products for modern living.
            </p>
            <div className="mt-10">
              <ArrowLink href="/our-story">Know our journey</ArrowLink>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <Parallax distance={38} className="relative aspect-4/5 lg:aspect-square">
              <div className="relative h-full w-full overflow-hidden">
                {story ? (
                  <Image
                    src={story}
                    alt="Rosa Dori artisans at work"
                    fill
                    sizes="(min-width: 1024px) 40rem, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <ProductArt
                    art={{
                      form: "pouch",
                      handle: "drawstring",
                      texture: "khadi",
                      palette: "paper",
                      accent: "botanical",
                    }}
                    id="home-story"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          Collections
          ============================================================ */}
      <section className="border-t border-linen bg-shell">
        <div className="shell py-24 lg:py-32">
          <Reveal>
            <Eyebrow>Our Collections</Eyebrow>
          </Reveal>

          {/* Oversized list rows — panel, name and arrow all animate on hover. */}
          <Stagger as="ul" className="mt-12 border-t border-espresso/15">
            {categories.map((category) => (
              <StaggerItem as="li" key={category.slug}>
                <Link
                  href={`/collections/${category.slug}`}
                  className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-espresso/15 py-7 md:py-9"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-sand transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                  />

                  <span className="relative flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                    <span className="font-display text-2xl tracking-wide transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 md:text-[2rem]">
                      {category.name}
                    </span>
                    <span className="text-xs tracking-[0.14em] text-mist uppercase transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                      {categoryCount(category.slug)} products
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="relative text-xl text-bark transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger
            as="ul"
            gap={0.1}
            delay={0.15}
            className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {VALUES.map((item, i) => (
              <StaggerItem as="li" key={item.title} className="group">
                <p className="text-[0.66rem] tracking-[0.18em] uppercase">
                  {item.title}
                </p>
                <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-cocoa">
                  {item.copy}
                </p>
                <div className="mt-6 aspect-square overflow-hidden">
                  <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    <ProductArt
                      art={item.art}
                      id={`home-value-${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          Featured products
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell py-24 lg:py-32">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Selected Pieces"
              title="A closer look at the range."
              intro="Forty-three products across four collections — every one made to order, and every one customisable in size, colour and branding."
            />
            <ArrowLink href="/collections" className="pb-2">
              View all collections
            </ArrowLink>
          </Reveal>

          <Stagger
            gap={0.07}
            className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featured.map((product, i) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} instance="home" priority={i < 4} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          Trust
          ============================================================ */}
      <section className="border-t border-linen bg-shell py-20">
        <Reveal className="shell text-center">
          <h2 className="font-display text-[2rem] md:text-[2.5rem]">
            Made with care. Trusted worldwide.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-cocoa">
            Partner with us for beautifully crafted products that your customers
            will love.
          </p>
        </Reveal>

        <div className="mt-12">
          <Marquee items={clients} />
        </div>

        <Reveal className="shell mt-14 flex justify-center">
          <ButtonLink href="/contact">Start an enquiry</ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
