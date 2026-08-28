/**
 * Derivative image builder for the /design/ area.
 *
 * Originals live in public/design/assets/ and are the only files kept in git.
 * This script writes downscaled copies to public/design/derived/<size>/ with
 * the same relative path, so a page can ask for a cheap version of any image
 * by prefix alone (see `derived()` in src/lib/design.ts).
 *
 *   sm  wall cards and feature bands
 *   md  the image stack on a work detail page
 *
 * The originals stay untouched and remain what the lightbox opens.
 *
 * Animated webp is split across the two sizes: `sm` freezes it to its first
 * frame so a wall of cards does not pull megabytes of animation, while `md`
 * stays animated so the motion still plays on the detail page. Frame count,
 * not frame size, is what makes those files heavy — resizing alone barely
 * dents them.
 *
 * Runs from `predev` and `prebuild`, and skips any derivative that is already
 * newer than its source, so repeat runs cost nothing.
 */
import { createRequire } from "node:module";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

// sharp arrives with Astro's image service rather than as a direct dependency.
const sharp = createRequire(import.meta.url)("sharp");

const SOURCE_ROOT = "public/design/assets";
const OUT_ROOT = "public/design/derived";

/**
 * Long-edge caps and the webp quality each size is encoded at. `keepAnimation`
 * decides whether an animated source stays animated at that size.
 */
const SIZES = {
  sm: { width: 640, quality: 72, keepAnimation: false },
  md: { width: 1440, quality: 78, keepAnimation: true, animatedWidth: 960, animatedQuality: 65 },
};

const walk = async (dir) => {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else if (/\.(webp|png|jpe?g)$/i.test(entry.name)) found.push(full);
  }
  return found;
};

const mtime = async (file) => {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return -1;
  }
};

let built = 0;
let skipped = 0;
let sourceBytes = 0;
const outBytes = { sm: 0, md: 0 };

const sources = (await walk(SOURCE_ROOT)).sort();

for (const source of sources) {
  const rel = path.relative(SOURCE_ROOT, source);
  const stats = await stat(source);
  sourceBytes += stats.size;
  const meta = await sharp(source).metadata();
  const animated = (meta.pages ?? 1) > 1;

  for (const [name, size] of Object.entries(SIZES)) {
    const out = path.join(OUT_ROOT, name, rel).replace(/\.(png|jpe?g)$/i, ".webp");
    if ((await mtime(out)) >= stats.mtimeMs) {
      outBytes[name] += (await stat(out)).size;
      skipped += 1;
      continue;
    }

    const keepAnimation = animated && size.keepAnimation;
    const cap = keepAnimation ? size.animatedWidth : size.width;
    const quality = keepAnimation ? size.animatedQuality : size.quality;
    const buffer = await sharp(source, { animated: keepAnimation })
      // `withoutEnlargement` keeps images that are already small as they are,
      // so a 250px mark is never upscaled into a blurry 640px one.
      .resize({ width: cap, height: cap, fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toBuffer();

    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, buffer);
    outBytes[name] += buffer.length;
    built += 1;
  }
}

const mb = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;
console.log(
  `thumbs: ${sources.length} sources (${mb(sourceBytes)}) → ` +
    `sm ${mb(outBytes.sm)}, md ${mb(outBytes.md)} ` +
    `(${built} written, ${skipped} up to date)`
);
