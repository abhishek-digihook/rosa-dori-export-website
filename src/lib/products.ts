/**
 * ROSA DORI — product catalogue.
 *
 * This file is the single source of truth for every collection page, product
 * page, sitemap entry and enquiry form on the site. Edit here and the whole
 * site follows.
 *
 * NOTE ON DIMENSIONS: the source catalogue listed sizes as "TBC". Products
 * below therefore advertise "Custom sizes on request" rather than invented
 * measurements. Fill in the `sizes` array as real specifications are confirmed.
 */

export type ArtForm =
  | "bottle" // tall tapered single-bottle bag
  | "bottle-drawstring" // bottle bag closed with a drawstring
  | "purse" // short wine purse with a shoulder strap
  | "pouch" // soft gathered drawstring pouch
  | "carrier" // structured multi-bottle carrier with dividers
  | "basket" // open rectangular basket
  | "hamper" // wide lidded hamper
  | "gift-bag" // classic flat-bottom gift bag
  | "mini-bag" // small gusseted jute bag
  | "baguette" // tall narrow bread sleeve
  | "jar-bag" // short wide jar carrier
  | "tote" // shopper with long handles
  | "sack" // grain sack with rolled top
  | "handbag" // structured reversible handbag
  | "picnic" // wide picnic bag with lid flap
  | "laundry" // tall cylindrical basket
  | "yoga" // long cylindrical mat bag
  | "lunch" // compact top-handle lunch bag
  | "round-basket"; // woven round-bodied basket

export type ArtHandle =
  | "rope" // twisted jute rope
  | "braided" // bamboo + braided jute
  | "leather" // vegan leather strap
  | "webbing" // cotton webbing handle
  | "drawstring" // gathered cord closure
  | "cut-out" // die-cut handle opening
  | "shoulder" // single long shoulder strap
  | "twin-loop" // two short loop handles
  | "none";

export type ArtTexture =
  | "jute" // open hessian weave
  | "canvas" // fine cotton twill
  | "paper" // deckle-edged handmade paper
  | "sitalpati" // Shital Pati mat weave
  | "khadi" // slubby handloom cotton
  | "newsprint" // printed newspaper pattern
  | "stripe" // woven stripe
  | "shimmer" // metallic-flecked jute
  | "lace"; // openwork lace panel

export type ArtPalette =
  | "natural"
  | "wheat"
  | "clay"
  | "wine"
  | "forest"
  | "charcoal"
  | "indigo"
  | "lemon"
  | "paper"
  | "shimmer";

export type ArtAccent =
  | "bow"
  | "botanical"
  | "chikankari"
  | "stone"
  | "twine"
  | "seed"
  | "label"
  | "none";

export type ArtSpec = {
  form: ArtForm;
  handle: ArtHandle;
  texture: ArtTexture;
  palette: ArtPalette;
  accent: ArtAccent;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** One-line hook used on cards and in listings. */
  summary: string;
  /** Full marketing copy used on the product page. */
  description: string;
  materials: string[];
  /**
   * Primary fabric, the only material shown on the product page. Left unset it
   * is derived from `materials[0]` by `productFabric` — set it here to override.
   */
  fabric?: string;
  /** Kept for reference; not rendered. */
  sizes: string[];
  colours: string[];
  customisation: string[];
  applications: string[];
  art: ArtSpec;
  /** Internal readiness flag — surfaced subtly on the product page only. */
  status?: "sample-pending" | "photography-pending";
};

export type CategorySlug =
  | "drinks-and-drawstrings"
  | "food-and-deli"
  | "shoppers-and-groceries"
  | "lifestyle-and-promotions";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Short summary line. Currently unrendered — kept for reuse. */
  tagline: string;
  /** Two-sentence introduction. Renders on the collections index, and is the
   *  meta and Open Graph description for the category page. */
  intro: string;
  /** Signature material story. Renders on the collections index only. */
  note: string;
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    slug: "drinks-and-drawstrings",
    name: "Drinks & Drawstrings",
    tagline: "Bottle bags, wine purses & pouches",
    intro:
      "Packaging built around the bottle — jute, canvas, handmade paper and seed paper carriers that make a single bottle feel like a gift. Every piece is reusable, recyclable and made to carry a brand as carefully as it carries a bottle.",
    note: "Single, double, triple and six-bottle formats, with removable dividers where the carrier needs them.",
  },
  {
    slug: "food-and-deli",
    name: "Food & Deli Bags",
    tagline: "Baskets, hampers & bread bags",
    intro:
      "Serviceware and takeaway packaging for bakeries, delicatessens and food halls. Breathable natural fibres keep bread crisp and produce fresh, while striped jute and organic cotton give a counter or hamper an unmistakably handmade character.",
    note: "Food-contact linings available in organic cotton and unbleached khadi.",
  },
  {
    slug: "shoppers-and-groceries",
    name: "Shoppers & Market Bags",
    tagline: "Totes, shoppers & grain sacks",
    intro:
      "The everyday carry — reinforced jute and cotton canvas shoppers built for weekly grocery runs, retail checkouts and market stalls. Generous gussets, stitched-through handles and honest materials that survive years of use.",
    note: "Reinforced base seams and stress-point bartacking as standard.",
  },
  {
    slug: "lifestyle-and-promotions",
    name: "Lifestyle & Promotional Products",
    tagline: "Baskets, handbags, yoga & picnic",
    intro:
      "Pieces for the home and the day out — laundry baskets, picnic sets, yoga carriers, reversible handbags and our hand-woven Shital Pati range. Designed as objects people keep, not packaging people discard.",
    note: "Includes our Shital Pati collection, hand-woven in West Bengal from murta reed.",
  },
];

export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

/* ------------------------------------------------------------------ */
/* Shared copy fragments                                               */
/* ------------------------------------------------------------------ */

const BRANDING = [
  "Screen printing",
  "Pad printing",
  "Woven or embroidered labels",
  "Custom dimensions",
  "Colour matching to brand guidelines",
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ---------------- Drinks & Drawstrings ---------------- */
  {
    slug: "jute-single-bottle-wine-bag",
    name: "Jute Single Bottle Wine Bag",
    category: "drinks-and-drawstrings",
    summary:
      "Natural jute bottle bag with bamboo and braided rope handles.",
    description:
      "A sustainable and stylish bottle bag crafted from natural jute with bamboo and jute rope braided handles. An eco-conscious packaging solution that combines rustic elegance with everyday functionality — sturdy enough to carry a full bottle home, handsome enough to hand over as the gift itself.",
    materials: ["Natural jute hessian", "Bamboo handle bar", "Braided jute rope"],
    sizes: [],
    colours: ["Natural", "Red", "Forest green", "Black", "Custom dyed"],
    customisation: [...BRANDING, "Alternative handle materials"],
    applications: ["Wineries", "Gift retail", "Corporate gifting", "Duty free"],
    art: {
      form: "bottle",
      handle: "braided",
      texture: "jute",
      palette: "natural",
      accent: "label",
    },
  },
  {
    slug: "jute-drawstring-bottle-bag",
    name: "Jute Drawstring Bottle Bag",
    category: "drinks-and-drawstrings",
    summary: "Reusable drawstring carrier for wine, spirits and oils.",
    description:
      "Elevate your gifting with our jute drawstring bottle bag. It offers a sustainable and reusable packaging solution for wine, spirits, olive oil and speciality beverages — the drawstring cinches around the neck of the bottle so the piece presents beautifully and reseals for a second life. Ideal for brands, wineries, retailers and promotional gifting.",
    materials: ["Natural jute hessian", "Cotton drawcord"],
    sizes: [],
    colours: ["Natural", "Wine", "Olive", "Charcoal", "Custom dyed"],
    customisation: [...BRANDING, "Contrast drawcord colours"],
    applications: ["Wineries", "Distilleries", "Olive oil producers", "Promotional gifting"],
    art: {
      form: "bottle-drawstring",
      handle: "drawstring",
      texture: "jute",
      palette: "wheat",
      accent: "none",
    },
  },
  {
    slug: "cotton-canvas-newspaper-print-bottle-bag",
    name: "Cotton Canvas Newspaper Print Bottle Bag",
    category: "drinks-and-drawstrings",
    summary: "Cotton canvas bottle bag in a contemporary newsprint pattern.",
    description:
      "Featuring a contemporary newspaper-inspired print, this cotton canvas bottle bag combines functionality with eye-catching design. The print can be reworked around your own copy, masthead or story, making it a perfect choice for luxury gifting, retail display and eco-conscious packaging that earns a second look.",
    materials: ["Cotton canvas", "Water-based pigment print"],
    sizes: [],
    colours: ["Natural ground", "Ecru ground", "Custom ink colour"],
    customisation: [
      "Bespoke newsprint artwork",
      "Screen printing",
  "Pad printing",
      "Custom dimensions",
      "Colour matching to brand guidelines",
    ],
    applications: ["Luxury gifting", "Retail display", "Editorial launches", "Hospitality"],
    art: {
      form: "bottle",
      handle: "rope",
      texture: "newsprint",
      palette: "paper",
      accent: "none",
    },
  },
  {
    slug: "shimmer-jute-wine-purse-maroon-bow",
    name: "Shimmer Jute Wine Purse with Maroon Bow",
    category: "drinks-and-drawstrings",
    summary: "Metallic-flecked jute purse finished with a cotton-rich bow.",
    description:
      "A beautiful blend of natural jute texture and subtle shimmer, this wine purse is accented with a cotton-rich maroon bow for a premium finish. Designed to elevate wine gifting while promoting sustainable, reusable packaging — the shimmer is woven through the fibre rather than coated on, so the surface keeps its natural hand.",
    materials: ["Shimmer jute", "Cotton-rich ribbon", "Jute shoulder cord"],
    sizes: [],
    colours: ["Champagne shimmer", "Rose shimmer", "Custom trim colours"],
    customisation: [...BRANDING, "Alternative bow and trim colours"],
    applications: ["Festive gifting", "Wedding favours", "Luxury retail", "Hospitality"],
    art: {
      form: "purse",
      handle: "shoulder",
      texture: "shimmer",
      palette: "shimmer",
      accent: "bow",
    },
  },
  {
    slug: "black-canvas-wine-purse-jute-strap",
    name: "Black Canvas Wine Purse with Jute Strap",
    category: "drinks-and-drawstrings",
    summary: "Sleek black canvas purse with a rustic jute shoulder strap.",
    description:
      "A sleek black canvas bottle bag with a rustic jute strap creates a timeless packaging solution for premium wine bottles. The contrast of matte canvas against raw fibre reads as considered rather than decorative — designed for stylish gifting while supporting sustainable and reusable packaging.",
    materials: ["Cotton canvas", "Natural jute strap"],
    sizes: [],
    colours: ["Black", "Charcoal", "Ink", "Custom dyed"],
    customisation: [...BRANDING, "Metallic and tonal print options"],
    applications: ["Premium wine", "Spirits", "Corporate gifting", "Retail"],
    art: {
      form: "purse",
      handle: "shoulder",
      texture: "canvas",
      palette: "charcoal",
      accent: "none",
    },
    status: "sample-pending",
  },
  {
    slug: "jute-drawstring-pouch",
    name: "Jute Drawstring Pouch",
    category: "drinks-and-drawstrings",
    summary: "Versatile drawstring pouches in small, medium and large.",
    description:
      "Made from premium natural jute, our drawstring pouches offer a versatile and eco-friendly packaging solution for coffee beans, gourmet teas, gifts, jewellery, cosmetics, dry goods, promotional items and retail products. Available in multiple sizes, these reusable pouches can be customised with your brand logo and your choice of material.",
    materials: ["Natural jute", "Cotton drawcord", "Optional cotton lining"],
    sizes: ["Small", "Medium", "Large"],
    colours: ["Natural", "Wine", "Forest", "Charcoal", "Custom dyed"],
    customisation: [...BRANDING, "Cotton, khadi or canvas body", "Lined or unlined"],
    applications: ["Coffee & tea", "Jewellery", "Cosmetics", "Promotional gifting"],
    art: {
      form: "pouch",
      handle: "drawstring",
      texture: "jute",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "seed-paper-bottle-bag",
    name: "Seed Paper Bottle Bag",
    category: "drinks-and-drawstrings",
    summary: "Plantable bottle bag that grows basil, marigold or tomato.",
    description:
      "More than just packaging, our biodegradable, plantable seed paper bottle bag gives back to nature. Simply plant it after use to grow basil, marigolds or tomatoes, creating a meaningful and lasting impression while reducing waste. Perfect for wineries, corporate gifting, hospitality and promotional campaigns, with options for custom printing and branding.",
    materials: ["Handmade seed paper", "Embedded basil / marigold / tomato seed", "Cotton cord"],
    sizes: [],
    colours: ["Natural pulp", "Tinted pulp on request"],
    customisation: [
      "Seed variety selection",
      "Screen printing",
      "Pad printing",
      "Foil blocking",
      "Custom dimensions",
      "Printed planting instructions",
    ],
    applications: ["Sustainability campaigns", "Corporate gifting", "Wineries", "Events"],
    art: {
      form: "bottle",
      handle: "rope",
      texture: "paper",
      palette: "forest",
      accent: "seed",
    },
  },
  {
    slug: "cotton-chikankari-single-bottle-bag",
    name: "Cotton Chikankari Single Bottle Bag",
    category: "drinks-and-drawstrings",
    summary: "Hand-embroidered Chikankari on soft cotton.",
    description:
      "Designed for brands seeking premium handcrafted packaging, our cotton Chikankari bottle bags combine artisanal detailing with eco-conscious materials. Each panel is hand-embroidered using the traditional white-on-white Chikankari technique of Lucknow, so no two bags are identical. Ideal for wineries, luxury gifting, hospitality and retail.",
    materials: ["Cotton voile", "Hand-worked Chikankari embroidery"],
    sizes: [],
    colours: ["Ivory", "Ecru", "Powder", "Custom dyed"],
    customisation: [
      "Bespoke embroidery motifs",
      "Woven or embroidered labels",
      "Custom dimensions",
      "Colour matching to brand guidelines",
    ],
    applications: ["Luxury gifting", "Hospitality", "Wedding favours", "Premium retail"],
    art: {
      form: "bottle",
      handle: "twin-loop",
      texture: "khadi",
      palette: "paper",
      accent: "chikankari",
    },
    status: "sample-pending",
  },
  {
    slug: "handmade-paper-bottle-bag-dried-flower",
    name: "Handmade Paper Bottle Bag with Dried Flower",
    category: "drinks-and-drawstrings",
    summary: "Deckle-edged handmade paper set with real dried botanicals.",
    description:
      "Made from high-quality handmade paper and embellished with real botanical dried flower accents, this premium bottle bag celebrates natural beauty and artisanal craftsmanship. The petals are pressed into the sheet while the pulp is still wet, so the decoration is part of the paper rather than applied to it. Designed for luxury gifting, hospitality, wineries and retail packaging.",
    materials: ["Cotton-rag handmade paper", "Pressed dried flowers", "Cotton cord"],
    sizes: [],
    colours: ["Natural", "Blush", "Sage", "Custom tinted pulp"],
    customisation: [...BRANDING, "Choice of botanical inclusions"],
    applications: ["Luxury gifting", "Wineries", "Hospitality", "Retail packaging"],
    art: {
      form: "bottle",
      handle: "rope",
      texture: "paper",
      palette: "paper",
      accent: "botanical",
    },
  },
  {
    slug: "handmade-paper-bottle-bag-pressed-botanicals",
    name: "Handmade Paper Bottle Bag — Pressed Botanicals",
    category: "drinks-and-drawstrings",
    summary: "A second botanical colourway with a wider petal spread.",
    description:
      "A companion to our dried flower bottle bag, this variation spreads pressed botanicals across the full face of the sheet for a softer, more painterly effect. Handmade paper gives every bag a slightly different deckle edge and tone, which is exactly the point — packaging that reads as made rather than manufactured.",
    materials: ["Cotton-rag handmade paper", "Pressed dried flowers", "Cotton cord"],
    sizes: [],
    colours: ["Natural", "Ivory", "Custom tinted pulp"],
    customisation: [...BRANDING, "Choice of botanical inclusions"],
    applications: ["Luxury gifting", "Wineries", "Boutique retail", "Events"],
    art: {
      form: "bottle",
      handle: "rope",
      texture: "paper",
      palette: "clay",
      accent: "botanical",
    },
  },
  {
    slug: "handmade-paper-bottle-bag-embroidery-stone",
    name: "Handmade Paper Bottle Bag with Embroidery & Stone Work",
    category: "drinks-and-drawstrings",
    summary: "Handmade paper with hand-set stone work and thread detail.",
    description:
      "Our most decorative bottle bag: handmade cotton-rag paper hand-worked with fine thread embroidery and individually set stones. The technique borrows from Indian bridal craft and translates it onto a recyclable paper body, giving festive and ceremonial gifting a genuinely handmade finish. Motif density, thread colour and stone placement are all specified to order.",
    materials: ["Cotton-rag handmade paper", "Hand embroidery thread", "Hand-set stones"],
    sizes: [],
    colours: ["Natural", "Gold-flecked", "Custom tinted pulp"],
    customisation: [
      "Bespoke motif development",
      "Thread and stone colourways",
      "Custom dimensions",
      "Foil and screen printing",
    ],
    applications: ["Festive gifting", "Wedding favours", "Luxury retail", "Ceremonial gifting"],
    art: {
      form: "bottle",
      handle: "rope",
      texture: "paper",
      palette: "wine",
      accent: "stone",
    },
  },
  {
    slug: "canvas-six-bottle-carrier",
    name: "Canvas 6 Bottle Carrier",
    category: "drinks-and-drawstrings",
    summary: "Heavyweight organic canvas carrier with bottle dividers.",
    description:
      "An elegant and premium reusable wine carrier crafted from heavyweight organic cotton canvas with reinforced stitched handles and internal bottle dividers. The dividers are removable, so the same carrier works for a six-bottle case run or a market shop. Ideal for wineries, gifting brands and premium retailers.",
    materials: ["Heavyweight organic cotton canvas", "Vegan leather handles", "Removable dividers"],
    sizes: ["Single bottle", "Double bottle", "Triple bottle", "Six bottle"],
    colours: ["Natural", "Black", "Olive", "Colour matched to brand"],
    customisation: [
      "Logo printing",
      "Custom dimensions",
      "Embroidery",
      "Colour matching to brand guidelines",
    ],
    applications: ["Wineries", "Premium retail", "Subscription cases", "Corporate gifting"],
    art: {
      form: "carrier",
      handle: "leather",
      texture: "canvas",
      palette: "natural",
      accent: "label",
    },
  },
  {
    slug: "canvas-newspaper-print-six-bottle-carrier",
    name: "Canvas Newspaper Print 6 Bottle Carrier",
    category: "drinks-and-drawstrings",
    summary: "The six-bottle carrier in our newsprint canvas.",
    description:
      "Our six-bottle carrier rendered in the newspaper-inspired canvas print — the same reinforced construction and removable dividers, with a graphic face that turns a case of wine into a talking point. Print artwork can be rewritten around your own vintage notes, tasting copy or founding story.",
    materials: ["Cotton canvas", "Water-based pigment print", "Vegan leather handles"],
    sizes: ["Single bottle", "Double bottle", "Triple bottle", "Six bottle"],
    colours: ["Natural ground", "Ecru ground", "Custom ink colour"],
    customisation: [
      "Bespoke newsprint artwork",
      "Logo printing",
      "Custom dimensions",
      "Embroidery",
    ],
    applications: ["Wineries", "Speciality retail", "Editorial launches", "Gifting"],
    art: {
      form: "carrier",
      handle: "leather",
      texture: "newsprint",
      palette: "paper",
      accent: "none",
    },
  },
  {
    slug: "cotton-lace-wine-bag",
    name: "Cotton Fabric & Lace Wine Bag",
    category: "drinks-and-drawstrings",
    summary: "Soft cotton body with an openwork lace panel.",
    description:
      "A softly structured cotton wine bag with an openwork lace panel that lets the bottle read through. The lace is stitched as an inset rather than an overlay, keeping the silhouette clean while adding the kind of detail that makes a bag worth keeping. Suited to wedding favours, boutique retail and seasonal gifting.",
    materials: ["Cotton fabric", "Cotton lace panel", "Fabric tie"],
    sizes: [],
    colours: ["Ivory", "Blush", "Sage", "Custom dyed"],
    customisation: [...BRANDING, "Lace pattern selection"],
    applications: ["Wedding favours", "Boutique retail", "Seasonal gifting", "Hospitality"],
    art: {
      form: "bottle",
      handle: "twin-loop",
      texture: "lace",
      palette: "paper",
      accent: "none",
    },
    status: "sample-pending",
  },
  {
    slug: "cotton-jute-twine-wine-bag",
    name: "Cotton Fabric & Jute Twine Wine Bag",
    category: "drinks-and-drawstrings",
    summary: "Cotton body finished with a wrapped jute twine collar.",
    description:
      "Plain-woven cotton paired with a hand-wrapped jute twine collar — a quiet, textural piece that lets the fibre do the decorating. The twine doubles as the closure, cinching the neck of the bag around the bottle. A natural fit for olive oil, artisan spirits and farm-shop retail.",
    materials: ["Cotton fabric", "Natural jute twine"],
    sizes: [],
    colours: ["Natural", "Ecru", "Stone", "Custom dyed"],
    customisation: [...BRANDING, "Twine colour and wrap style"],
    applications: ["Olive oil", "Artisan spirits", "Farm shops", "Gifting"],
    art: {
      form: "bottle",
      handle: "drawstring",
      texture: "khadi",
      palette: "wheat",
      accent: "twine",
    },
    status: "sample-pending",
  },
  {
    slug: "cotton-fabric-drawstring-pouch",
    name: "Cotton Fabric Drawstring Pouch",
    category: "drinks-and-drawstrings",
    summary: "Lightweight cotton pouch for dry goods and small retail.",
    description:
      "A lightweight, fully washable cotton drawstring pouch for dry goods, cosmetics, jewellery, hardware kits and retail sets. Soft enough to fold flat for shipping, strong enough to be reused indefinitely — a straightforward replacement for single-use poly bags across a product range.",
    materials: ["Cotton fabric", "Cotton drawcord"],
    sizes: ["Small", "Medium", "Large"],
    colours: ["Natural", "Bleached white", "Custom dyed"],
    customisation: [...BRANDING, "Single or double drawcord"],
    applications: ["Retail packaging", "Cosmetics", "Jewellery", "Subscription boxes"],
    art: {
      form: "pouch",
      handle: "drawstring",
      texture: "khadi",
      palette: "paper",
      accent: "none",
    },
  },

  /* ---------------- Food & Deli ---------------- */
  {
    slug: "jute-bread-basket",
    name: "Jute Bread Basket",
    category: "food-and-deli",
    summary: "Striped jute body lined in organic cotton.",
    description:
      "A striped jute bread basket lined in organic cotton — breathable enough to keep a crust crisp, structured enough to hold its shape on a counter or table. The cotton lining lifts out for washing, which makes it as practical for a bakery service as it is for a dining table.",
    materials: ["Striped jute", "Organic cotton lining", "Reinforced base"],
    sizes: [],
    colours: ["Natural / red stripe", "Natural / charcoal stripe", "Custom stripe"],
    customisation: [...BRANDING, "Custom stripe colourways", "Removable or fixed lining"],
    applications: ["Bakeries", "Restaurants", "Hotels", "Retail homeware"],
    art: {
      form: "basket",
      handle: "none",
      texture: "stripe",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "deli-hamper",
    name: "Deli Hamper",
    category: "food-and-deli",
    summary: "Wide jute hamper for curated food selections.",
    description:
      "A wide, flat-based hamper built to be filled — cheeses, preserves, charcuterie, a bottle laid on its side. The rigid frame keeps its shape fully loaded and the natural fibre body photographs beautifully, which matters when a hamper is the hero of a seasonal campaign.",
    materials: ["Natural jute", "Rigid board frame", "Cotton lining"],
    sizes: [],
    colours: ["Natural", "Charcoal", "Wine", "Custom dyed"],
    customisation: [...BRANDING, "Lining fabric selection", "Compartment dividers"],
    applications: ["Delicatessens", "Seasonal hampers", "Corporate gifting", "Hotels"],
    art: {
      form: "hamper",
      handle: "twin-loop",
      texture: "jute",
      palette: "wheat",
      accent: "label",
    },
  },
  {
    slug: "victoria-gift-bag",
    name: "Victoria Gift Bag",
    category: "food-and-deli",
    summary: "Classic flat-bottom jute gift bag in four colourways.",
    description:
      "Our workhorse gift bag: a clean flat-bottomed jute body with rope handles, sized to take a boxed selection, a bottle and glasses, or a deli order. Available in red, green, natural and black as standard, and colour matched to brand guidelines for larger programmes.",
    materials: ["Natural jute", "Rope handles", "Laminated interior"],
    sizes: [],
    colours: ["Red", "Green", "Natural", "Black", "Colour matched to brand"],
    customisation: [...BRANDING, "Laminated or unlaminated interior"],
    applications: ["Delicatessens", "Retail checkout", "Corporate gifting", "Events"],
    art: {
      form: "gift-bag",
      handle: "rope",
      texture: "jute",
      palette: "wine",
      accent: "none",
    },
  },
  {
    slug: "mini-jute-bag",
    name: "Mini Jute Bag",
    category: "food-and-deli",
    summary: "Small gusseted jute bag for favours and samples.",
    description:
      "A scaled-down jute bag for favours, samples, spice sets and small deli items. The gusseted base means it stands unsupported on a counter or place setting, and the short handles keep the silhouette neat. Available in red, natural, green and black.",
    materials: ["Natural jute", "Cotton webbing handles"],
    sizes: [],
    colours: ["Red", "Natural", "Green", "Black", "Colour matched to brand"],
    customisation: [...BRANDING, "Handle material and length"],
    applications: ["Wedding favours", "Sampling", "Spice & condiment sets", "Events"],
    art: {
      form: "mini-bag",
      handle: "webbing",
      texture: "jute",
      palette: "forest",
      accent: "none",
    },
  },
  {
    slug: "organic-cotton-baguette-bag",
    name: "Organic Cotton Baguette Bag",
    category: "food-and-deli",
    summary: "Breathable organic cotton sleeve for artisan loaves.",
    description:
      "A tall, narrow sleeve in unbleached organic cotton, cut for a baguette or a batard. Cotton breathes where paper and plastic do not, so the crust stays crisp for hours rather than minutes — a small detail that artisan bakeries notice immediately. Washable and reusable indefinitely.",
    materials: ["Unbleached organic cotton", "Cotton drawcord"],
    sizes: [],
    colours: ["Natural", "Bleached white", "Custom dyed"],
    customisation: [...BRANDING, "Drawcord or open-top construction"],
    applications: ["Artisan bakeries", "Farmers markets", "Restaurants", "Retail homeware"],
    art: {
      form: "baguette",
      handle: "drawstring",
      texture: "khadi",
      palette: "paper",
      accent: "none",
    },
  },
  {
    slug: "jar-bag",
    name: "Jar Bag",
    category: "food-and-deli",
    summary: "Padded carrier for single, double or triple jars.",
    description:
      "A short, wide carrier built around the jar — internal dividers hold preserves, honey, pickles or candles apart in transit, and the padded base absorbs the knocks that break glass. Available as a single, double or triple format so a producer can use one system across a full range.",
    materials: ["Natural jute", "Padded base", "Internal dividers"],
    sizes: ["Single jar", "Double jar", "Triple jar"],
    colours: ["Natural", "Charcoal", "Wine", "Custom dyed"],
    customisation: [...BRANDING, "Divider configuration", "Padding thickness"],
    applications: ["Preserves & honey", "Candles", "Farm shops", "Gifting"],
    art: {
      form: "jar-bag",
      handle: "webbing",
      texture: "jute",
      palette: "wheat",
      accent: "none",
    },
  },
  {
    slug: "jute-baguette-bag",
    name: "Jute Baguette Bag",
    category: "food-and-deli",
    summary: "Open-weave jute sleeve with a cotton-lined interior.",
    description:
      "The baguette sleeve in natural jute, lined with cotton where it meets the bread. Open hessian weave on the outside gives it the market-stall character that bakeries want on display, while the lining keeps the food contact surface soft and washable.",
    materials: ["Natural jute", "Cotton lining", "Cotton drawcord"],
    sizes: [],
    colours: ["Natural", "Natural / red stripe", "Custom dyed"],
    customisation: [...BRANDING, "Lining fabric selection"],
    applications: ["Artisan bakeries", "Delicatessens", "Farmers markets", "Hotels"],
    art: {
      form: "baguette",
      handle: "drawstring",
      texture: "jute",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "handmade-paper-bread-bag",
    name: "Handmade Paper Bread Bag",
    category: "food-and-deli",
    summary: "Food-safe handmade paper bag with a deckle edge.",
    description:
      "A handmade paper bread bag with an untrimmed deckle top, made with food-safe pulp and finished without plastic lamination. Fully recyclable and compostable at end of life — the practical, single-use option in a range otherwise built around reuse, for counters that need one.",
    materials: ["Food-safe handmade paper", "Deckle edge finish"],
    sizes: [],
    colours: ["Natural", "Kraft", "Custom tinted pulp"],
    customisation: [
      "Screen printing",
      "Custom dimensions",
      "Embossing",
      "Window cut-outs",
    ],
    applications: ["Artisan bakeries", "Cafés", "Delicatessens", "Farmers markets"],
    art: {
      form: "gift-bag",
      handle: "cut-out",
      texture: "paper",
      palette: "paper",
      accent: "none",
    },
    status: "photography-pending",
  },

  /* ---------------- Shoppers & Groceries ---------------- */
  {
    slug: "cotton-grocery-bag",
    name: "Cotton Grocery Bag",
    category: "shoppers-and-groceries",
    summary: "Foldable cotton shopper for the weekly shop.",
    description:
      "A light, foldable cotton shopper that lives in a coat pocket until it is needed and then carries a full grocery run. Stitched-through handles and a reinforced base take the load; the plain cotton face takes a print beautifully, which makes it one of the most cost-effective branded pieces we make.",
    materials: ["Cotton", "Reinforced base seam", "Stitched-through handles"],
    sizes: [],
    colours: ["Natural", "Bleached white", "Custom dyed"],
    customisation: [...BRANDING, "Handle length", "Fold-away pocket"],
    applications: ["Supermarkets", "Retail checkout", "Promotional campaigns", "Events"],
    art: {
      form: "tote",
      handle: "twin-loop",
      texture: "khadi",
      palette: "paper",
      accent: "none",
    },
    status: "sample-pending",
  },
  {
    slug: "jute-shopper",
    name: "Jute Shopper",
    category: "shoppers-and-groceries",
    summary: "Reinforced jute shopper in red and natural.",
    description:
      "A generously gusseted jute shopper built for real weight — reinforced base seams, bartacked stress points and cotton webbing handles set through the full depth of the body. This is the piece retailers reorder, because customers keep using it long after the first shop.",
    materials: ["Natural jute", "Cotton webbing handles", "Laminated interior"],
    sizes: [],
    colours: ["Red", "Natural", "Colour matched to brand"],
    customisation: [...BRANDING, "Handle material and length", "Laminated or unlaminated"],
    applications: ["Supermarkets", "Retail checkout", "Farmers markets", "Promotions"],
    art: {
      form: "tote",
      handle: "webbing",
      texture: "jute",
      palette: "wine",
      accent: "label",
    },
  },
  {
    slug: "jute-reversible-green-shopper",
    name: "Jute Reversible Green Shopper",
    category: "shoppers-and-groceries",
    summary: "Two bags in one — reversible jute and cotton shopper.",
    description:
      "A reversible shopper with a jute face on one side and printed cotton on the other, so a single piece serves two looks — plain for the weekly shop, patterned for everything else. Both faces are finished to the same standard, with no exposed seams on either side.",
    materials: ["Natural jute", "Printed cotton reverse", "Cotton webbing handles"],
    sizes: [],
    colours: ["Forest green / natural", "Custom pairings"],
    customisation: [...BRANDING, "Reverse print artwork", "Handle material"],
    applications: ["Retail", "Lifestyle brands", "Promotions", "Gifting"],
    art: {
      form: "tote",
      handle: "webbing",
      texture: "jute",
      palette: "forest",
      accent: "none",
    },
  },
  {
    slug: "canvas-shopper",
    name: "Canvas Shopper",
    category: "shoppers-and-groceries",
    summary: "Heavyweight cotton canvas tote built to last years.",
    description:
      "Heavyweight cotton canvas, cut clean and stitched hard. No lamination, no lining, nothing to delaminate or fray — just a dense canvas body and handles anchored with box stitching. It softens with use rather than wearing out, which is the whole point of buying one instead of ten.",
    materials: ["Heavyweight cotton canvas", "Box-stitched handles"],
    sizes: [],
    colours: ["Natural", "Black", "Olive", "Colour matched to brand"],
    customisation: [...BRANDING, "Canvas weight selection", "Inner pocket"],
    applications: ["Retail", "Bookshops & galleries", "Corporate merchandise", "Events"],
    art: {
      form: "tote",
      handle: "webbing",
      texture: "canvas",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "jute-grain-sack-bag",
    name: "Jute Grain Sack Bag",
    category: "shoppers-and-groceries",
    summary: "Rolled-top sack in heavy hessian with a market character.",
    description:
      "Modelled on the working grain sack — heavy hessian, a rolled and stitched top edge, and rope handles set wide for shoulder carrying. Deliberately utilitarian, and all the better for it: this is the piece that reads as authentic on a farm shop floor or a market stall.",
    materials: ["Heavy jute hessian", "Rolled top edge", "Rope handles"],
    sizes: [],
    colours: ["Natural", "Stencil-printed", "Custom dyed"],
    customisation: [
      "Stencil-style printing",
      "Woven or embroidered labels",
      "Custom dimensions",
      "Handle configuration",
    ],
    applications: ["Farm shops", "Markets", "Garden centres", "Retail homeware"],
    art: {
      form: "sack",
      handle: "rope",
      texture: "jute",
      palette: "wheat",
      accent: "label",
    },
    status: "sample-pending",
  },

  /* ---------------- Lifestyle & Promotions ---------------- */
  {
    slug: "handmade-paper-gift-bag",
    name: "Handmade Paper Gift Bag",
    category: "lifestyle-and-promotions",
    summary: "Cotton-rag paper gift bag with a soft cord handle.",
    description:
      "A gift bag in cotton-rag handmade paper — thicker and softer than machine paper, with a faint texture that takes foil and letterpress unusually well. Cord handles are knotted through reinforced eyelets so the bag survives being carried, kept and used again.",
    materials: ["Cotton-rag handmade paper", "Cotton cord handles", "Reinforced eyelets"],
    sizes: [],
    colours: ["Natural", "Ivory", "Blush", "Custom tinted pulp"],
    customisation: [
      "Foil blocking & letterpress",
      "Screen printing",
      "Custom dimensions",
      "Colour matching to brand guidelines",
    ],
    applications: ["Boutique retail", "Luxury gifting", "Events", "Hospitality"],
    art: {
      form: "gift-bag",
      handle: "rope",
      texture: "paper",
      palette: "clay",
      accent: "none",
    },
  },
  {
    slug: "reversible-handbag-red",
    name: "Reversible Handbag — Red",
    category: "lifestyle-and-promotions",
    summary: "Structured handbag that turns to reveal a second face.",
    description:
      "A structured everyday handbag that reverses to a second colourway — one bag, two looks, no compromise on finish. Firm sidewalls hold the shape whichever way round it is worn, and the handles are set to sit comfortably on the shoulder either side out.",
    materials: ["Jute exterior", "Cotton reverse", "Structured sidewalls"],
    sizes: [],
    colours: ["Red / natural", "Custom pairings"],
    customisation: [...BRANDING, "Reverse fabric selection", "Magnetic or zip closure"],
    applications: ["Lifestyle retail", "Boutiques", "Gifting", "Brand merchandise"],
    art: {
      form: "handbag",
      handle: "twin-loop",
      texture: "jute",
      palette: "wine",
      accent: "none",
    },
  },
  {
    slug: "reversible-handbag-black",
    name: "Reversible Handbag — Black",
    category: "lifestyle-and-promotions",
    summary: "The reversible handbag in a charcoal colourway.",
    description:
      "The same reversible construction in a quieter register — black jute outside, natural cotton within, so it moves between a work day and a weekend without looking like either. Structured sidewalls, shoulder-set handles, and a clean finish on both faces.",
    materials: ["Jute exterior", "Cotton reverse", "Structured sidewalls"],
    sizes: [],
    colours: ["Black / natural", "Custom pairings"],
    customisation: [...BRANDING, "Reverse fabric selection", "Magnetic or zip closure"],
    applications: ["Lifestyle retail", "Boutiques", "Gifting", "Brand merchandise"],
    art: {
      form: "handbag",
      handle: "twin-loop",
      texture: "jute",
      palette: "charcoal",
      accent: "none",
    },
  },
  {
    slug: "jute-picnic-bag-natural",
    name: "Jute Picnic Bag — Natural",
    category: "lifestyle-and-promotions",
    summary: "Wide-mouthed picnic carrier with a fold-over lid.",
    description:
      "A wide-mouthed picnic bag with a fold-over lid, cut deep enough for plates, a bottle and a blanket. The lid buttons down for the walk out and folds flat once you have arrived — a small piece of design that makes the difference between a bag you use and one you mean to.",
    materials: ["Natural jute", "Cotton lining", "Fold-over lid"],
    sizes: [],
    colours: ["Natural", "Natural / stripe", "Custom dyed"],
    customisation: [...BRANDING, "Lining fabric selection", "Insulated lining option"],
    applications: ["Lifestyle retail", "Hospitality", "Corporate gifting", "Hampers"],
    art: {
      form: "picnic",
      handle: "webbing",
      texture: "jute",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "jute-picnic-bag-black",
    name: "Jute Picnic Bag — Black",
    category: "lifestyle-and-promotions",
    summary: "The picnic carrier in a black colourway.",
    description:
      "The picnic bag in black jute — the same fold-over lid and lined interior, in a colourway that suits hotel and restaurant programmes where natural fibre would read too rustic. Insulated linings are available for food service use.",
    materials: ["Black jute", "Cotton lining", "Fold-over lid"],
    sizes: [],
    colours: ["Black", "Charcoal", "Custom dyed"],
    customisation: [...BRANDING, "Lining fabric selection", "Insulated lining option"],
    applications: ["Hotels & restaurants", "Lifestyle retail", "Corporate gifting", "Events"],
    art: {
      form: "picnic",
      handle: "webbing",
      texture: "jute",
      palette: "charcoal",
      accent: "none",
    },
  },
  {
    slug: "jute-laundry-bag",
    name: "Jute Laundry Basket",
    category: "lifestyle-and-promotions",
    summary: "Tall jute basket for laundry, blankets and storage.",
    description:
      "Designed with natural elegance and everyday functionality, our jute laundry basket brings warmth and texture to any space. Perfect for storing laundry, blankets, toys or household items, it combines practicality with timeless style. A stiffened rim holds the mouth open so it stays usable when half full.",
    materials: ["Natural jute", "Stiffened rim", "Cotton lining"],
    sizes: [],
    colours: ["Natural", "Charcoal", "Stripe", "Custom dyed"],
    customisation: [...BRANDING, "Lining fabric selection", "Fold-down or fixed rim"],
    applications: ["Homeware retail", "Hotels", "Interior brands", "Gifting"],
    art: {
      form: "laundry",
      handle: "cut-out",
      texture: "jute",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "yoga-bag",
    name: "Yoga Bag",
    category: "lifestyle-and-promotions",
    summary: "Cotton mat carrier with room for studio essentials.",
    description:
      "Crafted from premium cotton fabric, this reusable yoga bag is designed to carry your yoga mat and essentials with ease. Lightweight, durable, spacious and eco-friendly, it is perfect for studios, wellness brands, fitness enthusiasts and everyday use. An adjustable shoulder strap and a side pocket keep a bottle and keys within reach.",
    materials: ["Premium cotton", "Adjustable shoulder strap", "Side pocket"],
    sizes: [],
    colours: ["Natural", "Indigo", "Terracotta", "Custom dyed"],
    customisation: [...BRANDING, "Strap length", "Pocket configuration"],
    applications: ["Yoga studios", "Wellness brands", "Retail", "Corporate wellness"],
    art: {
      form: "yoga",
      handle: "shoulder",
      texture: "khadi",
      palette: "clay",
      accent: "none",
    },
  },
  {
    slug: "jute-dog-toys-bag",
    name: "Jute Dog Toys Bag",
    category: "lifestyle-and-promotions",
    summary: "Natural jute storage bag for pet brands and retail.",
    description:
      "Manufactured from premium-quality natural jute, our dog toys bags offer an eco-conscious storage solution for pet brands, retailers and lifestyle collections. The wide mouth and soft body make it easy for the bag to live on a floor beside a sofa, and easy for a dog to help itself. Available in custom sizes, prints and private-label branding.",
    materials: ["Natural jute", "Cotton drawcord", "Reinforced base"],
    sizes: [],
    colours: ["Natural", "Charcoal", "Custom dyed"],
    customisation: [...BRANDING, "Private-label programmes", "Print artwork"],
    applications: ["Pet brands", "Pet retail", "Lifestyle collections", "Private label"],
    art: {
      form: "pouch",
      handle: "drawstring",
      texture: "jute",
      palette: "wheat",
      accent: "label",
    },
  },
  {
    slug: "sitalpati-picnic-basket-mediterranean",
    name: "Shital Pati Picnic Basket — Mediterranean",
    category: "lifestyle-and-promotions",
    summary: "Hand-woven murta reed basket in a blue colourway.",
    description:
      "Hand-woven from murta reed by Shital Pati artisans in West Bengal, this picnic basket carries a craft that is several centuries old into a contemporary blue and natural colourway. Each mat is split, dyed and woven by hand, so the weave tension and tone vary slightly from piece to piece — the signature of genuine handwork.",
    materials: ["Hand-woven murta reed (Shital Pati)", "Cotton lining", "Reinforced frame"],
    sizes: [],
    colours: ["Mediterranean blue / natural", "Custom weave colourways"],
    customisation: ["Custom weave colourways", "Lining fabric selection", "Custom dimensions", "Woven labels"],
    applications: ["Lifestyle retail", "Hotels & resorts", "Interior brands", "Luxury gifting"],
    art: {
      form: "round-basket",
      handle: "twin-loop",
      texture: "sitalpati",
      palette: "indigo",
      accent: "none",
    },
  },
  {
    slug: "sitalpati-picnic-basket-sunny",
    name: "Shital Pati Picnic Basket — Sunny",
    category: "lifestyle-and-promotions",
    summary: "The woven picnic basket in a warm yellow colourway.",
    description:
      "The same hand-woven murta reed construction in a warm yellow and natural colourway, built around a reinforced frame that holds its shape when fully loaded. Woven to order, which means the colourway can be matched to a seasonal range rather than chosen from stock.",
    materials: ["Hand-woven murta reed (Shital Pati)", "Cotton lining", "Reinforced frame"],
    sizes: [],
    colours: ["Sunny yellow / natural", "Custom weave colourways"],
    customisation: ["Custom weave colourways", "Lining fabric selection", "Custom dimensions", "Woven labels"],
    applications: ["Lifestyle retail", "Hotels & resorts", "Seasonal ranges", "Luxury gifting"],
    art: {
      form: "round-basket",
      handle: "twin-loop",
      texture: "sitalpati",
      palette: "lemon",
      accent: "none",
    },
  },
  {
    slug: "sitalpati-picnic-bag-small",
    name: "Shital Pati Picnic Bag — Small",
    category: "lifestyle-and-promotions",
    summary: "A compact woven bag with a soft fabric lining.",
    description:
      "A compact version of the Shital Pati picnic range, sized for a lunch, a book and a bottle. The woven reed body is soft enough to carry against the hip and rigid enough to stand on its own — the quality that makes Shital Pati unusual among natural weaves.",
    materials: ["Hand-woven murta reed (Shital Pati)", "Cotton lining"],
    sizes: [],
    colours: ["Natural", "Two-tone weave", "Custom weave colourways"],
    customisation: ["Custom weave colourways", "Lining fabric selection", "Custom dimensions", "Woven labels"],
    applications: ["Lifestyle retail", "Boutiques", "Gifting", "Resort retail"],
    art: {
      form: "picnic",
      handle: "twin-loop",
      texture: "sitalpati",
      palette: "natural",
      accent: "none",
    },
  },
  {
    slug: "sitalpati-yoga-bag-indigo",
    name: "Shital Pati Yoga Bag — Indigo",
    category: "lifestyle-and-promotions",
    summary: "Woven reed mat carrier in a deep indigo weave.",
    description:
      "A yoga mat carrier woven from murta reed in a deep indigo and natural pattern, with a cotton shoulder strap. Reed is naturally cool to the touch and holds no odour, which makes it a genuinely well-matched material for studio use rather than simply a decorative one.",
    materials: ["Hand-woven murta reed (Shital Pati)", "Cotton shoulder strap", "Cotton lining"],
    sizes: [],
    colours: ["Indigo / natural", "Custom weave colourways"],
    customisation: ["Custom weave colourways", "Strap length", "Custom dimensions", "Woven labels"],
    applications: ["Yoga studios", "Wellness retail", "Resort retail", "Gifting"],
    art: {
      form: "yoga",
      handle: "shoulder",
      texture: "sitalpati",
      palette: "indigo",
      accent: "none",
    },
  },
  {
    slug: "sitalpati-lunch-bag-lemon",
    name: "Shital Pati Lunch Bag — Lemon",
    category: "lifestyle-and-promotions",
    summary: "Compact woven lunch bag with a top handle.",
    description:
      "A neat top-handled lunch bag woven in lemon and natural reed, lined in cotton and sized for a stacked tiffin or a boxed lunch. Reed keeps the interior cool for longer than a fabric bag would, which is the reason the material has been used for food carrying in Bengal for generations.",
    materials: ["Hand-woven murta reed (Shital Pati)", "Cotton lining", "Top handle"],
    sizes: [],
    colours: ["Lemon / natural", "Custom weave colourways"],
    customisation: ["Custom weave colourways", "Lining fabric selection", "Custom dimensions", "Woven labels"],
    applications: ["Lifestyle retail", "Café retail", "Corporate gifting", "Resort retail"],
    art: {
      form: "lunch",
      handle: "twin-loop",
      texture: "sitalpati",
      palette: "lemon",
      accent: "none",
    },
  },
  {
    slug: "sitalpati-lunch-bag-black",
    name: "Shital Pati Lunch Bag — Black",
    category: "lifestyle-and-promotions",
    summary: "The woven lunch bag in a graphic black weave.",
    description:
      "The lunch bag woven in black and natural reed — a graphic, almost architectural pattern that suits contemporary retail and hospitality settings. Same cotton lining, same top handle, same hand-woven construction.",
    materials: ["Hand-woven murta reed (Shital Pati)", "Cotton lining", "Top handle"],
    sizes: [],
    colours: ["Black / natural", "Custom weave colourways"],
    customisation: ["Custom weave colourways", "Lining fabric selection", "Custom dimensions", "Woven labels"],
    applications: ["Lifestyle retail", "Hospitality", "Corporate gifting", "Design stores"],
    art: {
      form: "lunch",
      handle: "twin-loop",
      texture: "sitalpati",
      palette: "charcoal",
      accent: "none",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const productsByCategory = (slug: CategorySlug): Product[] =>
  products.filter((p) => p.category === slug);

/**
 * The fabric shown on a product page. Derived from the first material so the
 * catalogue stays the single source of truth — "Natural jute hessian" reads as
 * "Jute" rather than as a list of construction materials. Order matters below:
 * canvas is checked before cotton, seed paper before paper.
 */
export const productFabric = (product: Product): string => {
  if (product.fabric) return product.fabric;

  const first = (product.materials[0] ?? "").toLowerCase();
  if (first.includes("murta") || first.includes("shital")) return "Shital Pati";
  if (first.includes("seed paper")) return "Seed paper";
  if (first.includes("paper")) return "Handmade paper";
  if (first.includes("canvas")) return "Cotton canvas";
  if (first.includes("khadi")) return "Khadi";
  if (first.includes("jute")) return "Jute";
  if (first.includes("linen")) return "Linen";
  if (first.includes("cotton")) return "Cotton";
  return product.materials[0] ?? "";
};

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const categoryCount = (slug: CategorySlug): number =>
  productsByCategory(slug).length;

/** A few products pulled forward onto the home page. */
export const featuredSlugs = [
  "jute-single-bottle-wine-bag",
  "canvas-six-bottle-carrier",
  "jute-bread-basket",
  "sitalpati-picnic-basket-mediterranean",
  "seed-paper-bottle-bag",
  "reversible-handbag-red",
  "jute-laundry-bag",
  "handmade-paper-bottle-bag-dried-flower",
] as const;

export const featuredProducts = (): Product[] =>
  featuredSlugs
    .map((s) => productBySlug(s))
    .filter((p): p is Product => Boolean(p));
