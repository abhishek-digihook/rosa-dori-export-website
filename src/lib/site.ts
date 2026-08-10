import { categories } from "./products";

/**
 * Site-wide configuration.
 *
 * ⚠️  PLACEHOLDERS — the contact block below is invented. Replace every value
 * in `site.contact` and `site.social` with ROSA DORI's real details before
 * this goes live; they surface in the footer, the contact page and the
 * Organization structured data.
 */
export const site = {
  name: "ROSA DORI",
  legalName: "Rosa Dori",
  /** Used for canonical URLs, sitemap and Open Graph. Update on launch. */
  url: "https://www.rosadori.com",
  tagline: "Ethically crafted. Natural fibers. Made for the world.",
  description:
    "Premium lifestyle products handcrafted in India using jute, canvas, Shital Pati and other natural fibers for global brands that value quality, sustainability and thoughtful design.",
  strapline: "Sustainable by nature. Crafted in India. Loved worldwide.",

  contact: {
    email: "hello@rosadori.com",
    sales: "sales@rosadori.com",
    phone: "+91 98300 00000",
    phoneHref: "+919830000000",
    whatsapp: "+91 98300 00000",
    address: {
      line1: "Rosa Dori Exports",
      line2: "Salt Lake Sector V",
      city: "Kolkata",
      region: "West Bengal",
      postcode: "700091",
      country: "India",
    },
    hours: "Monday – Saturday, 10:00 – 18:30 IST",
  },

  social: {
    instagram: "https://instagram.com/rosadori",
    linkedin: "https://linkedin.com/company/rosadori",
    pinterest: "https://pinterest.com/rosadori",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

/**
 * Primary navigation.
 *
 * "Our Story" and "Sustainability" point at sections of the home page, not at
 * routes — clicking them scrolls. Both sections carry `scroll-mt-*` so their
 * headings clear the sticky header, and each links onward to its deeper page.
 */
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/#our-story" },
  {
    label: "Collections",
    href: "/collections",
    children: categories.map((c) => ({
      label: c.name,
      href: `/collections/${c.slug}`,
    })),
  },
  { label: "Sustainability", href: "/#sustainability" },
  { label: "Materials", href: "/materials" },
  { label: "Contact", href: "/contact" },
];

/** The promises repeated across the top of the site. */
export const pillars = [
  { title: "Natural Fibers" },
  { title: "Skilled Artisans" },
  { title: "Sustainable Choice" },
  { title: "Ethical Manufacturing" },
  { title: "Made in India" },
  { title: "Global Delivery" },
];

/** Materials we work in — used on the Our Story page. */
export const materials = [
  {
    name: "Jute",
    origin: "West Bengal",
    copy: "The golden fibre. Grown without irrigation or pesticide, spun and woven into hessian that is strong, breathable and fully biodegradable.",
  },
  {
    name: "Cotton Canvas",
    origin: "Gujarat & Tamil Nadu",
    copy: "Heavyweight woven cotton that softens with age instead of wearing out. Takes print and embroidery cleanly, washes indefinitely.",
  },
  {
    name: "Shital Patti",
    origin: "Cooch Behar, West Bengal",
    copy: "Murta reed, split by hand and woven into mats so fine they were once given as royal gifts. Naturally cool, and unlike anything machine-made.",
  },
  {
    name: "Khadi",
    origin: "Uttar Pradesh",
    copy: "Hand-spun, hand-woven cotton with a slubbed, living surface. No two lengths are quite the same.",
  },
  {
    name: "Handmade Paper",
    origin: "Jaipur, Rajasthan",
    copy: "Cotton rag pulped and pressed by hand, often with seeds or petals set into the wet sheet. Deckle-edged and tree-free.",
  },
  {
    name: "Linen",
    origin: "Sourced in Europe",
    copy: "Flax woven for structure and drape. Used where a piece needs to feel refined rather than rustic.",
  },
];

/**
 * Names shown in the trust marquee on the home page.
 *
 * ⚠️  VERIFY BEFORE LAUNCH — these are carried over from the reference design
 * and are unconfirmed. Naming a retailer implies a commercial relationship, so
 * only keep the ones ROSA DORI has actually supplied. If none can be named,
 * replace the marquee with capability claims ("Export-ready", "OEKO-TEX
 * available", "Private label") — see README.md.
 */
export const clients = [
  "ZARA HOME",
  "WEST ELM",
  "CRATE & BARREL",
  "ANTHROPOLOGIE",
  "TESCO",
];

/** The three-step working process, used on Our Story and Contact. */
export const process = [
  {
    step: "01",
    title: "Brief & Concept",
    copy: "Share your specification, reference or sketch. We come back with material options, construction notes and indicative pricing within five working days.",
  },
  {
    step: "02",
    title: "Sampling",
    copy: "We produce a physical sample to your dimensions and branding. Two revision rounds are included as standard before anything is signed off.",
  },
  {
    step: "03",
    title: "Production & Export",
    copy: "Bulk production runs against the approved sample with in-line quality checks, followed by export documentation and freight to your door.",
  },
];
