import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EnquireButton } from "@/components/enquiry/EnquireButton";
import { ArrowLink, Eyebrow, GhostLink } from "@/components/ui";
import {
  categoryBySlug,
  productBySlug,
  products,
  productsByCategory,
} from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    product: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[category]/[product]">): Promise<Metadata> {
  const { product: slug } = await params;
  const product = productBySlug(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.summary,
    alternates: {
      canonical: `/collections/${product.category}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — ${site.name}`,
      description: product.summary,
      url: `/collections/${product.category}/${product.slug}`,
    },
  };
}

/** A labelled block in the specification column. */
function Spec({
  label,
  items,
  fallback,
}: {
  label: string;
  items: string[];
  fallback?: string;
}) {
  const values = items.length > 0 ? items : fallback ? [fallback] : [];
  if (values.length === 0) return null;

  return (
    <div className="border-t border-linen py-5">
      <dt className="text-[0.68rem] tracking-[0.18em] text-mist uppercase">
        {label}
      </dt>
      <dd className="mt-2.5 flex flex-wrap gap-x-2 gap-y-2">
        {values.map((value) => (
          <span
            key={value}
            className="border border-linen bg-cream px-3 py-1.5 text-xs text-cocoa"
          >
            {value}
          </span>
        ))}
      </dd>
    </div>
  );
}

export default async function ProductPage({
  params,
}: PageProps<"/collections/[category]/[product]">) {
  const { category: categorySlug, product: productSlug } = await params;

  const product = productBySlug(productSlug);
  const category = categoryBySlug(categorySlug);

  // Guard against a valid product reached through the wrong collection path.
  if (!product || !category || product.category !== category.slug) notFound();

  const related = productsByCategory(category.slug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: category.name,
    material: product.materials.join(", "),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.legalName },
    url: `${site.url}/collections/${product.category}/${product.slug}`,
  };

  return (
    <>
      <article className="bg-cream">
        <div className="shell py-10 lg:py-16">
          {/* --- Breadcrumb --- */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] tracking-[0.14em] text-mist uppercase">
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
              <li>
                <Link
                  href={`/collections/${category.slug}`}
                  className="transition-colors hover:text-bark"
                >
                  {category.name}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-bark">{product.name}</li>
            </ol>
          </nav>

          {/* --- Main --- */}
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="right">
              {/* Sticks alongside the specification column on wide screens. */}
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-4/5 overflow-hidden bg-sand">
                  <ProductImage
                    product={product}
                    priority
                    sizes="(min-width: 1024px) 40rem, 92vw"
                  />
                </div>
                {product.status && (
                  <p className="mt-4 text-[0.66rem] tracking-[0.14em] text-mist uppercase">
                    {product.status === "sample-pending"
                      ? "Sample in production — photography to follow"
                      : "Photography in progress"}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <Eyebrow>{category.name}</Eyebrow>
              <h1 className="mt-4 text-[2.25rem] leading-[1.08] md:text-[3rem]">
                {product.name}
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-cocoa">
                {product.summary}
              </p>

              <div className="mt-7 max-w-xl leading-relaxed text-cocoa">
                <p>{product.description}</p>
              </div>

              <Eyebrow className="mt-12">Specification</Eyebrow>
              <dl className="mt-6">
                <Spec label="Materials" items={product.materials} />
                <Spec
                  label="Sizes"
                  items={product.sizes}
                  fallback="Custom sizes on request"
                />
                <Spec label="Colours" items={product.colours} />
                <Spec label="Customisation" items={product.customisation} />
                <Spec label="Applications" items={product.applications} />
              </dl>

              <div className="mt-10 flex flex-wrap gap-4 border-t border-linen pt-10">
                <EnquireButton product={product.name}>
                  Enquire about this product
                </EnquireButton>
                <GhostLink href={`/collections/${category.slug}`}>
                  Back to collection
                </GhostLink>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-mist">
                Made to order. Minimum order quantities, lead times and pricing
                depend on specification — we will confirm all three with your
                quotation.
              </p>
            </Reveal>
          </div>
        </div>
      </article>

      {/* ============================================================
          Related
          ============================================================ */}
      {related.length > 0 && (
        <section className="border-t border-linen bg-shell">
          <div className="shell py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>More from this collection</Eyebrow>
                <h2 className="mt-4 text-[1.75rem] md:text-[2.25rem]">
                  {category.name}
                </h2>
              </div>
              <ArrowLink href={`/collections/${category.slug}`}>
                View all {productsByCategory(category.slug).length} products
              </ArrowLink>
            </div>

            <Stagger
              gap={0.07}
              className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
            >
              {related.map((item) => (
                <StaggerItem key={item.slug}>
                  <ProductCard product={item} instance="related" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
