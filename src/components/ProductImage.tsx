import Image from "next/image";

import { productPhoto } from "@/lib/media";
import type { Product } from "@/lib/products";

import { ProductArt } from "./ProductArt";

type Props = {
  product: Product;
  /** Namespaces SVG defs — pass something unique if a product repeats on a page. */
  instance?: string;
  /** Passed straight to next/image so each context can size correctly. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders a real photograph when one exists at `public/products/<slug>.*`,
 * and falls back to the generated <ProductArt> otherwise. Both fill their
 * container, so the surrounding layout does not care which it gets.
 */
export function ProductImage({
  product,
  instance,
  sizes = "(min-width: 1280px) 22rem, (min-width: 768px) 33vw, 90vw",
  priority = false,
  className = "",
}: Props) {
  const photo = productPhoto(product.slug);
  const id = instance ? `${product.slug}-${instance}` : product.slug;

  if (photo) {
    return (
      <Image
        src={photo}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <ProductArt
      art={product.art}
      id={id}
      title={product.name}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
