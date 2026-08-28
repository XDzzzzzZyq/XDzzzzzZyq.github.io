/**
 * Thumbnail builder for the /design/ hub.
 *
 * Originals live in public/design/assets/ and are the only files kept in git.
 * Every page shows those originals — the one exception is the section strip on
 * the hub, where three covers are drawn a few dozen pixels wide and pulling
 * megabytes for them is pure waste. This script writes a small copy of each
 * asset to public/design/derived/sm/ under the same relative path, so a page
 * can reach one by prefix alone (see `derived()` in src/lib/design.ts).
 *
 * Animated webp is frozen to its first frame here. Frame count, not frame size,
 * is what makes those files heavy — resizing alone barely dents them — and a
 * strip thumbnail is too small to read motion anyway.
 *
 * Runs from `predev` and `prebuild`, and skips any thumbnail that is already
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
 * Long-edge caps and the webp quality each size is encoded at. Only `sm` has a
 * consumer today; a second entry here is all a larger size would need.
 */
const SIZES = {
  sm: { width: 640, quality: 72 },
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
let outBytes = 0;

const sources = (await walk(SOURCE_ROOT)).sort();

for (const source of sources) {
  const rel = path.relative(SOURCE_ROOT, source);
  const stats = await stat(source);
  sourceBytes += stats.size;

  for (const [name, size] of Object.entries(SIZES)) {
    const out = path.join(OUT_ROOT, name, rel).replace(/\.(png|jpe?g)$/i, ".webp");
    if ((await mtime(out)) >= stats.mtimeMs) {
      outBytes += (await stat(out)).size;
      skipped += 1;
      continue;
    }

    const buffer = await sharp(source)
      // `withoutEnlargement` keeps images that are already small as they are,
      // so a 250px mark is never upscaled into a blurry 640px one.
      .resize({ width: size.width, height: size.width, fit: "inside", withoutEnlargement: true })
      .webp({ quality: size.quality, effort: 5 })
      .toBuffer();

    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, buffer);
    outBytes += buffer.length;
    built += 1;
  }
}

const mb = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;
console.log(
  `thumbs: ${sources.length} sources (${mb(sourceBytes)}) → ${mb(outBytes)} ` +
    `(${built} written, ${skipped} up to date)`
);
