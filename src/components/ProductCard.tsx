import Link from "next/link";

import { ProductImage } from "./ProductImage";
import type { Product } from "@/lib/products";

/**
 * Product tile used on the home page, collection index and category pages.
 *
 * All of the hover choreography is CSS driven off `group`, so a grid of forty
 * cards still ships zero client JavaScript.
 */
export function ProductCard({
  product,
  instance,
  priority = false,
  className = "",
}: {
  product: Product;
  instance?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={className}>
      <Link
        href={`/collections/${product.category}/${product.slug}`}
        className="group block"
      >
        <div className="relative aspect-4/5 overflow-hidden bg-sand">
          <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
            <ProductImage
              product={product}
              instance={instance}
              priority={priority}
            />
          </div>

          {/* Warm veil that lifts on hover. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/10"
          />

          {/* "View" tab slides up from the bottom edge. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-cream/95 py-3 text-center text-[0.68rem] tracking-[0.2em] text-bark uppercase backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
          >
            View details
          </div>
        </div>

        <div className="pt-5">
          <h3 className="font-display text-xl leading-snug transition-colors duration-300 group-hover:text-bark">
            {product.name}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-cocoa">
            {product.summary}
          </p>
          <p className="mt-3 text-[0.68rem] tracking-[0.16em] text-mist uppercase">
            {product.materials[0]}
          </p>
        </div>
      </Link>
    </article>
  );
}
