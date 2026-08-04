import fs from "node:fs";
import path from "node:path";

/**
 * Photography lookup.
 *
 * The site ships with generated artwork for every product so it is complete
 * from day one. To swap in real photography, drop a file into `public/` named
 * after the product slug — no code change required:
 *
 *   public/products/jute-single-bottle-wine-bag.jpg
 *   public/editorial/hero.jpg
 *
 * Any of .jpg / .jpeg / .png / .webp / .avif works. The lookup runs on the
 * server during the build, so there is no runtime cost and no flash of
 * placeholder art.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"] as const;

function lookup(dir: string, slug: string): string | null {
  for (const ext of EXTENSIONS) {
    const relative = `${dir}/${slug}${ext}`;
    try {
      if (fs.existsSync(path.join(PUBLIC_DIR, relative))) {
        return `/${relative}`;
      }
    } catch {
      // A read failure just means "no photo" — fall through to the artwork.
    }
  }
  return null;
}

/** Returns `/products/<slug>.<ext>` if the operator has supplied a photo. */
export const productPhoto = (slug: string): string | null =>
  lookup("products", slug);

/** Returns `/editorial/<name>.<ext>` for hero and story imagery. */
export const editorialPhoto = (name: string): string | null =>
  lookup("editorial", name);
