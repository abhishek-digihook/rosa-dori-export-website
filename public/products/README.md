# Product photography

Drop a photo here named after the product slug and it replaces the generated
artwork on every page automatically — no code change.

```
jute-single-bottle-wine-bag.jpg
canvas-six-bottle-carrier.jpg
sitalpati-lunch-bag-black.jpg
```

`.jpg` `.jpeg` `.png` `.webp` `.avif` all work. Portrait 4:5, 1200 × 1500px or
larger. Slugs are the last segment of each product URL, or the `slug` field in
`src/lib/products.ts`.

Products without a photo keep their generated artwork, so you can migrate a few
at a time.
