import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, PageHero } from "@/components/ui";
import {
  categories,
  categoryBySlug,
  productsByCategory,
  type CategorySlug,
} from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);

  if (!category) return {};

  return {
    title: category.name,
    description: category.intro,
    alternates: { canonical: `/collections/${category.slug}` },
    openGraph: {
      title: `${category.name} — ${site.name}`,
      description: category.intro,
      url: `/collections/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/collections/[category]">) {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);

  if (!category) notFound();

  const items = productsByCategory(category.slug as CategorySlug);
  const others = categories.filter((c) => c.slug !== category.slug);

  // Breadcrumbs help search engines understand the collection hierarchy.
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collections",
        item: `${site.url}/collections`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${site.url}/collections/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <PageHero
        eyebrow={`Collection — ${items.length} products`}
        title={category.name}
        intro={category.intro}
      >
        <p className="mt-6 max-w-2xl text-sm text-mist">{category.note}</p>

        <nav aria-label="Breadcrumb" className="mt-10">
          <ol className="flex flex-wrap items-center gap-2 text-[0.66rem] tracking-[0.14em] text-mist uppercase">
            <li>
              <Link href="/" className="transition-colors hover:text-bark">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/collections"
                className="transition-colors hover:text-bark"
              >
                Collections
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-bark">{category.name}</li>
          </ol>
        </nav>
      </PageHero>

      {/* ============================================================
          Product grid
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell py-20 lg:py-28">
          <Stagger
            gap={0.06}
            className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {items.map((product, i) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} priority={i < 4} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============================================================
          Customisation note
          ============================================================ */}
      <section className="border-y border-linen bg-shell">
        <div className="shell grid gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal>
            <h2 className="text-[1.75rem] leading-tight md:text-[2.25rem]">
              Every piece here is a starting point.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-cocoa">
              Dimensions, colours, materials, linings, handles and branding are
              all specified to order. If you have a reference or a sketch, send
              it over — sampling takes two to three weeks.
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="md:justify-self-end">
            <ButtonLink href="/contact?intent=sample">
              Request a sample
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          Other collections
          ============================================================ */}
      <section className="bg-cream">
        <div className="shell py-20">
          <p className="eyebrow">Continue browsing</p>
          <Stagger as="ul" className="mt-8 border-t border-espresso/15">
            {others.map((other) => (
              <StaggerItem as="li" key={other.slug}>
                <Link
                  href={`/collections/${other.slug}`}
                  className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-espresso/15 py-6"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-sand transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                  />
                  <span className="relative font-display text-xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 md:text-2xl">
                    {other.name}
                  </span>
                  <span
                    aria-hidden
                    className="relative text-bark transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2"
                  >
                    →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10">
            <ArrowLink href="/collections">All collections</ArrowLink>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
