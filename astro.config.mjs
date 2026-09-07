import { defineConfig } from "astro/config";

/**
 * Markdown external links open in a new tab.
 * Hand-rolled hast walk so no extra dependency is needed.
 */
function rehypeExternalLinks() {
  const isExternal = (href) => typeof href === "string" && /^https?:\/\//i.test(href);
  const walk = (node) => {
    if (node.type === "element" && node.tagName === "a" && isExternal(node.properties?.href)) {
      node.properties.target = "_blank";
      node.properties.rel = "noopener noreferrer";
    }
    for (const child of node.children ?? []) walk(child);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: "https://xdzzzzzzyq.github.io",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
