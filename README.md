# ROSA DORI — business website

Marketing site for ROSA DORI: handcrafted natural-fibre lifestyle products and
packaging, made in India for global brands.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**,
**Tailwind CSS v4** and **Motion**. 43 products across 4 collections, all
statically generated.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

---

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, pillars, story teaser, collections list, featured products, client marquee |
| `/our-story` | Founding story, artisans, materials, sustainability, how we work |
| `/collections` | All four collections with previews |
| `/collections/[category]` | One collection, full product grid (4 pages) |
| `/collections/[category]/[product]` | Product detail with full specification (43 pages) |
| `/contact` | Enquiry form, direct contact details, process |
| `/sitemap.xml`, `/robots.txt` | Generated from the catalogue automatically |

Navigation is Home · Our Story · Collections (dropdown, category-wise) ·
Contact, plus an **Enquire Now** button. The dropdown works on hover, click and
keyboard; on mobile the whole menu becomes a full-screen overlay with the
collections nested underneath.

---

## ⚠️ Before you go live

Five things in this build are placeholders or unverified. Fix them first.

### 0. The enquiry form throws every submission away

Until `NEXT_PUBLIC_WEB3FORMS_KEY` (or `NEXT_PUBLIC_ENQUIRY_EMAIL`) is set, the
modal accepts an enquiry, shows the visitor **"Thank you — someone from the team
will reply within two working days"**, and then discards it. Nothing is sent and
nothing is stored. Each discarded submission is logged to the browser console as
`[enquiry] DISCARDED`.

This is deliberate, so the flow can be demonstrated before an account exists —
but it means the site is currently *promising replies it cannot deliver*. **This
is the one item on this list that costs real business if it ships.** See "Wiring
up the form" below; it takes about two minutes.

### 1. Contact details are invented

`src/lib/site.ts` → `site.contact` and `site.social` contain made-up values
(`hello@rosadori.com`, `+91 98300 00000`, a Salt Lake address). They appear in
the footer, the contact page and the Organization structured data. **Replace all
of them.** Also set `site.url` to the real domain — canonical URLs, the sitemap
and Open Graph tags all derive from it.

### 2. The client marquee names real retailers

`src/lib/site.ts` → `clients` lists ZARA HOME, WEST ELM, CRATE & BARREL,
ANTHROPOLOGIE and TESCO. These were carried over from the reference design and
**have not been verified**. Naming a retailer implies a supply relationship, so
keep only the ones ROSA DORI has genuinely supplied. If none can be named
publicly, swap the marquee for capability claims instead — "Export-ready",
"Private label", "OEKO-TEX available", "Low MOQ sampling".

### 3. Product dimensions say "Custom sizes on request"

The source catalogue listed every size as "TBC", so no measurements were
invented. Each product's `sizes: []` renders as *"Custom sizes on request"*. As
real specifications are confirmed, fill the array:

```ts
sizes: ["W 12 × H 34 × D 9 cm", "W 15 × H 38 × D 10 cm"],
```

The Canvas 6 Bottle Carrier shows the intended pattern — it had real data.

### 4. There is no photography yet

Every product image is generated artwork (see below). Replace it as the shoot
lands.

---

## Images

The site ships complete with no photography. Each product is drawn by
`src/components/ProductArt.tsx`, which composes a body silhouette, a handle
treatment, a woven texture and a decorative accent from one shared palette — so
43 different products still read as a single coherent set.

### Swapping in real photographs

Drop a file into `public/` named after the product slug. **No code change.**

```
public/products/jute-single-bottle-wine-bag.jpg
public/products/canvas-six-bottle-carrier.jpg
public/editorial/hero.jpg          ← replaces the illustrated home page hero
public/editorial/our-story.jpg     ← replaces the home page story image
```

`.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work. `src/lib/media.ts` checks
the filesystem at build time, so there is no runtime cost and no flash of
placeholder art. Anything without a photo keeps its generated artwork, so you
can migrate a few products at a time.

Product slugs are the `slug` field in `src/lib/products.ts` and the last segment
of each product URL.

**Recommended:** portrait 4:5, at least 1200 × 1500px. Hero: landscape 16:9, at
least 2400px wide.

### Editing the generated artwork

Each product's `art` block picks from the kit:

```ts
art: {
  form: "bottle",      // silhouette — see ArtForm
  handle: "braided",   // see ArtHandle
  texture: "jute",     // weave overlay — see ArtTexture
  palette: "natural",  // colourway — see ArtPalette
  accent: "label",     // decoration — see ArtAccent
}
```

All five unions are defined at the top of `src/lib/products.ts` with the
available values.

---

## Wiring up the form

There is one form: a modal that opens from every "Enquire" button on the site,
asking for **full name**, **email** and an optional **phone**. Open it from a
product page and the product's name travels with the enquiry.

Submissions go straight from the browser to a free form-to-email service, so
there is no route, no mail server and no database of our own. Set **one** of
these in `.env.local`, and in your host's dashboard for production.

### Option A — Web3Forms (recommended)

Keeps your address out of the page source. Free for 250 submissions/month.

1. Enter your delivery address at [web3forms.com](https://web3forms.com) and
   confirm it. An access key comes back.
2. Paste it in:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

The key is public by design — it only permits sending to the address you
verified, so shipping it in the client bundle is expected.

### Option B — FormSubmit (no signup)

```bash
NEXT_PUBLIC_ENQUIRY_EMAIL=sales@rosadori.com
```

No account needed. The **first** submission triggers a one-time activation email
to that address; click the link in it and the form is live. The trade-off is
that the address sits in the client bundle where scrapers can read it.

Web3Forms wins if both are set.

### Notes

`NEXT_PUBLIC_*` values are baked in at build time, so **restart the dev server
or rebuild** after changing them — a running server will not pick them up.

**With neither set** the modal shows the studio's email and phone instead of a
form, and logs a warning to the browser console. It never accepts an enquiry it
cannot deliver.

To test: open any Enquire button, submit once, and check the inbox. Provider
errors are logged to the browser console; visitors only ever see "please email
us at …" so no third-party diagnostics leak into the UI.

---

## Editing content

Almost everything lives in two files.

**`src/lib/products.ts`** — the catalogue. Categories, all 43 products, their
copy, materials, colours, customisation options and artwork specs. Add a product
by appending to the `products` array; its page, its place in the grid, its
sitemap entry and its entry in the contact form's product dropdown all appear
automatically.

**`src/lib/site.ts`** — company details, navigation, the six home page pillars,
the materials list, the client marquee and the three-step process.

Page-specific prose (the founding story, the sustainability commitments) sits
directly in the relevant `page.tsx`.

---

## Design system

Brand tokens are defined once in `src/app/globals.css` under `@theme`, which is
what generates the Tailwind utilities (`bg-cream`, `text-bark`, `font-display`).

| Token | Value | Use |
| --- | --- | --- |
| `cream` | `#FAF5EE` | page background |
| `shell` | `#F5EDE2` | alternating sections |
| `sand` | `#F0E5D6` | cards, wells |
| `linen` | `#E7D9C5` | borders, dividers |
| `clay` | `#D9BFAE` | brand accent (the logo circle) |
| `espresso` | `#2B2018` | primary text |
| `bark` | `#6E4423` | buttons, announcement bar |
| `cocoa` / `mist` | | secondary / tertiary text |

Type is **Cormorant Garamond** for display and **Jost** for everything else,
both self-hosted via `next/font` (no external requests, no layout shift).

---

## Motion

Scroll reveals, staggered grids, parallax, the hero line-mask, the nav dropdown
and hover choreography are all built from `src/components/motion/`.

Product cards use CSS `group-hover` rather than JavaScript, so a grid of forty
tiles ships no client-side motion code.

Everything respects `prefers-reduced-motion`: the CSS media query collapses
animation durations and every Motion component checks `useReducedMotion()`.
Content never depends on an animation having run — with motion off, the site is
simply static.

---

## Accessibility

- Skip-to-content link, one `<h1>` per page, semantic landmarks throughout
- Dropdown exposes `aria-expanded` / `aria-haspopup`, closes on `Escape` and on
  click-away, and is reachable by keyboard
- Mobile overlay locks page scroll and restores it on close
- Focus rings appear on keyboard focus only (`:focus-visible`)
- Decorative artwork is `aria-hidden`; product artwork carries the product name
  as its label

---

## SEO

- Per-page titles, descriptions and canonicals; a shared title template
- Open Graph and Twitter card metadata
- JSON-LD: `Organization` sitewide, `BreadcrumbList` per collection, `Product`
  per product page
- `sitemap.xml` and `robots.txt` generated from the catalogue

---

## Deploying

Static apart from the two form routes, so it runs anywhere that supports
Next.js.

**Vercel** — import the repo, add the environment variables above, deploy.

**Any Node host** — `npm run build` then `npm run start` behind a reverse proxy.

**Static hosting** — the site now has no API routes of its own and the enquiry
form posts directly to Web3Forms, so every page can be prerendered. Add
`output: "export"` to `next.config.ts` and `images: { unoptimized: true }`, then
serve `out/` from anywhere.
