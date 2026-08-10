# Working in this repo

Marketing site for ROSA DORI. Next.js 16 App Router, React 19, TypeScript,
Tailwind v4 (CSS-first `@theme`), Motion. See `README.md` for the full picture.

## Where things live

- `src/lib/products.ts` — the catalogue. 4 categories, 43 products. Adding a
  product here automatically produces its page, grid tile, sitemap entry and
  contact-form option. This is the single source of truth; don't duplicate
  product copy into pages.
- `src/lib/site.ts` — company details, navigation, pillars, materials, process.
- `src/components/ProductArt.tsx` — the generated product imagery. A kit of
  silhouettes, handles, textures, palettes and accents, composed per product.
- `src/components/motion/` — the only place `"use client"` motion code lives.

## Conventions

- **Server components by default.** Only reach for `"use client"` when something
  genuinely needs state, an event handler or a browser API. Product cards use
  CSS `group-hover` rather than JS precisely to stay on the server.
- **Never export non-components from a `"use client"` module and import them on
  the server** — the server receives an opaque client reference, not the value.
  Shared constants go in `src/lib/`, or in a module with no `"use client"` of
  its own (this is why the button class strings live in `src/components/ui.tsx`,
  where both server links and the client modal trigger can read them).
- **Colours and fonts come from the `@theme` block** in `src/app/globals.css`.
  Use `bg-cream`, `text-bark`, `font-display` — don't hardcode hex values in
  components.
- **Every animation needs a static resting state.** `prefers-reduced-motion`
  turns motion off entirely; nothing may become unreadable or invisible when it
  does.

## Don't invent facts

Contact details, client names and product dimensions are placeholders or
unverified — see the "Before you go live" section of `README.md`. Don't fill
gaps with plausible-sounding specifics; leave them for the client to confirm.

## Checks

```bash
npm run build   # typechecks and prerenders all 58 routes
npm run lint
```
