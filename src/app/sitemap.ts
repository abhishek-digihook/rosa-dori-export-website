import type { MetadataRoute } from "next";

import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: url("/collections"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/our-story"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: url("/sustainability"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: url("/materials"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: url("/contact"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...categories.map((category) => ({
      url: url(`/collections/${category.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: url(`/collections/${product.category}/${product.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
