import Image from "next/image";

import { HeroScene } from "@/components/HeroScene";
import { PILLAR_ICONS } from "@/components/Icons";
import { Marquee } from "@/components/Marquee";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { KenBurns, Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, Eyebrow, SectionHeading } from "@/components/ui";
import { editorialPhoto } from "@/lib/media";
import { featuredProducts } from "@/lib/products";
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
      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden">
        {/* Barely any zoom — at 1.14 the scale cropped the products out of frame. */}
        <KenBurns from={1.03} className="absolute inset-0 -z-10">
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
            {/* The sentence carries the hero on its own now. It stays the
                page's single <h1> — something has to be — set in the display
                serif and wrapped early so it sits inside the cream ramp above
                rather than running onto the photograph. */}
            <Reveal direction="none" duration={1}>
              <h1 className="max-w-lg text-[1.4rem] leading-[1.35] text-espresso sm:text-[1.65rem] lg:text-[1.95rem]">
                {site.description}
              </h1>
            </Reveal>

            <Reveal delay={0.5} className="mt-9">
              <span className="block h-px w-16 bg-bark/50" aria-hidden />
            </Reveal>

            <Reveal delay={0.6} className="mt-9">
              <ButtonLink href="/collections">Explore Collections</ButtonLink>
            </Reveal>
          </div>
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
            <h2 className="mt-5 text-[1.75rem] leading-tight md:text-[2.25rem]">
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
                canvas, cotton, Sital Pati, bamboo and handmade paper to craft
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
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <Parallax distance={38} className="relative aspect-4/5 lg:aspect-square">
              <div className="relative h-full w-full overflow-hidden">
                {story ? (
                  <Image
                    src={story}
                    alt="A jute and cotton canvas caddy holding a wine bottle and preserve jars"
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
          </Reveal>
        </div>

        <div className="relative h-72 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
          {sustainability ? (
            <Image
              src={sustainability}
              alt="A natural jute shopper packed with bread, vegetables and preserves"
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
              intro="Every piece is made to order, and every piece is customisable in size, colour and branding."
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
