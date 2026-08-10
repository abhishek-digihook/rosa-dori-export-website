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
} from "@/lib/products";
import { clients, pillars, site } from "@/lib/site";

export default function HomePage() {
  const hero = editorialPhoto("hero");
  const story = editorialPhoto("our-story");
  const sustainability = editorialPhoto("sustainability");
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
            the scene becomes a backdrop rather than an image.

            The desktop ramp holds full cream across the type column and only
            starts falling away past it — body copy at 0.95rem needs a solid
            ground, not a wash. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-cream/72 md:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-r from-cream from-10% via-cream/60 via-40% to-transparent to-80% md:from-30% md:via-cream/60 md:via-46% md:to-68%"
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
                  "Ethically Crafted.",
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
              {/* Sits over the hero photograph, so it takes the primary ink
                  rather than the secondary tone used on flat backgrounds, and
                  wraps early enough to stay inside the cream ramp above. */}
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-espresso">
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
          <span className="flex items-center gap-3 text-[0.66rem] tracking-[0.2em] text-bark/60 uppercase">
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
                <p className="mt-4 text-[0.68rem] tracking-[0.18em] uppercase">
                  {pillar.title}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ============================================================
          Our story
          ============================================================ */}
      <section
        id="our-story"
        className="relative scroll-mt-24 overflow-hidden bg-cream"
      >
        <div className="shell grid items-center gap-14 py-24 lg:grid-cols-2 lg:gap-24 lg:py-32">
          <Reveal direction="right">
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] leading-tight md:text-[3rem]">
              Rooted in Nature.
              <br />
              Inspired by Purpose.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-cocoa">
              <p>
                Rosa Dori was founded by three women with a shared vision of
                creating premium, sustainable products that celebrate India&rsquo;s
                rich craftsmanship while making a positive impact on the planet.
              </p>
              <p>
                Guided by a commitment to conscious design and environmental
                responsibility, we work with natural materials such as jute,
                canvas, cotton, Shital Patti, bamboo and handmade paper to craft
                elegant lifestyle, gifting and packaging solutions.
              </p>
              <p>
                We believe in empowering women artisan communities, supporting
                ethical craftsmanship, and bringing timeless, responsibly made
                products from India to the global marketplace.
              </p>
              <p>
                At Rosa Dori, every creation reflects our belief that
                sustainability, quality and beautiful design can go hand in
                hand.
              </p>
            </div>
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
                    alt="A jute picnic basket packed with wine, grapes and bread"
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
        </div>
      </section>

      {/* ============================================================
          Sustainability

          The photograph sits in normal flow on small screens and becomes the
          right half of the band from `lg` up, so the copy keeps the site's
          left gutter instead of being pushed toward the middle.
          ============================================================ */}
      <section
        id="sustainability"
        className="relative scroll-mt-24 overflow-hidden border-y border-linen bg-sand"
      >
        <div className="shell relative py-20 lg:py-28">
          <Reveal direction="right" className="lg:max-w-[40%]">
            <h2 className="font-display text-[2.25rem] leading-tight md:text-[3rem]">
              Sustainability
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cocoa">
              We choose natural, renewable fibers and eco-friendly processes to
              create products that are kind to the earth, loved worldwide.
            </p>
            <div className="mt-10">
              <ButtonLink href="/sustainability">Read more</ButtonLink>
            </div>
          </Reveal>
        </div>

        <div className="relative h-72 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          {sustainability ? (
            <Image
              src={sustainability}
              alt="A plantable seed paper wine bag, printed to grow tulsi"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ProductArt
              art={{
                form: "bottle",
                handle: "rope",
                texture: "paper",
                palette: "forest",
                accent: "seed",
              }}
              id="home-sustainability"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </section>

      {/* ============================================================
          Featured products
          ============================================================ */}
      <section className="border-t border-linen bg-cream">
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
      {/* <section className="border-t border-linen bg-shell py-20">
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
      </section> */}
    </>
  );
}
