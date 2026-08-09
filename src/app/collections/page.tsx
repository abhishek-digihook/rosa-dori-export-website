import type { Metadata } from "next";
import Link from "next/link";

import { ProductImage } from "@/components/ProductImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, Eyebrow, PageHero } from "@/components/ui";
import { categories, products, productsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Four collections of handcrafted natural-fibre products: drinks and drawstrings, food and deli bags, shoppers and carry bags, and lifestyle products. All made to order in India.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Collections"
        title="Four collections. Forty-three products."
        intro="Every piece is made to order, in your dimensions, colours and branding. Browse a collection below, or tell us what you need and we will build it."
      >
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="link-wipe text-[0.68rem] tracking-[0.16em] text-bark uppercase"
            >
              {category.name}
            </a>
          ))}
        </div>
      </PageHero>

      {categories.map((category, index) => {
        const items = productsByCategory(category.slug);
        const preview = items.slice(0, 3);
        const reversed = index % 2 === 1;

        return (
          <section
            key={category.slug}
            id={category.slug}
            className={`scroll-mt-24 border-b border-linen ${
              reversed ? "bg-shell" : "bg-cream"
            }`}
          >
            <div className="shell grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
              {/* --- Copy --- */}
              <Reveal
                direction={reversed ? "left" : "right"}
                className={reversed ? "lg:order-2" : ""}
              >
                <Eyebrow>
                  {String(index + 1).padStart(2, "0")} — {items.length} products
                </Eyebrow>
                <h2 className="mt-5 text-[2.1rem] leading-tight md:text-[2.9rem]">
                  {category.name}
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-cocoa">
                  {category.intro}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist">
                  {category.note}
                </p>

                <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
                  {items.slice(0, 5).map((item) => (
                    <li
                      key={item.slug}
                      className="border border-linen px-3 py-1.5 text-[0.68rem] tracking-[0.12em] text-cocoa uppercase"
                    >
                      {item.name}
                    </li>
                  ))}
                  {items.length > 5 && (
                    <li className="px-3 py-1.5 text-[0.68rem] tracking-[0.12em] text-mist uppercase">
                      +{items.length - 5} more
                    </li>
                  )}
                </ul>

                <div className="mt-10">
                  <ArrowLink href={`/collections/${category.slug}`}>
                    View the collection
                  </ArrowLink>
                </div>
              </Reveal>

              {/* --- Preview trio --- */}
              <Reveal
                direction={reversed ? "right" : "left"}
                delay={0.1}
                className={reversed ? "lg:order-1" : ""}
              >
                {/* All three tiles share the artwork's native 4:5 so nothing
                    is cropped — a wide feature tile cut the tops off bottles. */}
                <Parallax distance={34}>
                  <Stagger as="ul" gap={0.09} className="grid grid-cols-3 gap-4">
                    {preview.map((item, i) => (
                      <StaggerItem as="li" key={item.slug}>
                        <Link
                          href={`/collections/${category.slug}/${item.slug}`}
                          className="group block"
                        >
                          <div className="relative aspect-4/5 overflow-hidden bg-sand">
                            <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                              <ProductImage
                                product={item}
                                instance={`index-${i}`}
                                sizes="(min-width: 1024px) 14rem, 30vw"
                              />
                            </div>
                          </div>
                          <p className="mt-3 text-[0.7rem] leading-snug tracking-wide text-cocoa transition-colors group-hover:text-bark">
                            {item.name}
                          </p>
                        </Link>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </Parallax>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ============================================================
          Closing CTA
          ============================================================ */}
      <section className="bg-sand">
        <Reveal className="shell max-w-3xl py-24 text-center">
          <h2 className="text-[2rem] leading-tight md:text-[2.75rem]">
            Not seeing quite what you need?
          </h2>
          <p className="mt-6 leading-relaxed text-cocoa">
            The {products.length} products here are a starting point, not a
            catalogue limit. Send us a sketch, a reference photograph or a
            written specification and we will come back with material options
            and indicative pricing.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact">Talk to us</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
