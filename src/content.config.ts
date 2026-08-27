import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    slug: z.string(),
    lang: z.enum(["en", "cn"]),
  }),
});

export const collections = { projects };

