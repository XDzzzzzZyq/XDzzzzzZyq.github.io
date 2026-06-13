import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const src = join(import.meta.dirname, "..", "node_modules", "gsap", "dist");
const dest = join(import.meta.dirname, "..", "lib", "gsap");

const files = ["gsap.min.js", "ScrollTrigger.min.js", "SplitText.min.js"];

mkdirSync(dest, { recursive: true });

for (const file of files) {
  copyFileSync(join(src, file), join(dest, file));
  console.log(`Copied ${file}`);
}
