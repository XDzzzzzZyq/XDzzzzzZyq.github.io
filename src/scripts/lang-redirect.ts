const STORAGE_KEY = "xdzzyq.lang";
const SUPPORTED = new Set(["en", "cn"]);

const readStored = (): string | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value && SUPPORTED.has(value) ? value : null;
  } catch {
    return null;
  }
};

const writeStored = (lang: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* noop */
  }
};

const path = window.location.pathname;

// Both content areas keep two URL trees and share the stored language
// preference, but their defaults are mirrored: research is English-first with
// Chinese under /research/cn/, design is Chinese-first with English under
// /design/en/. `base` is the default tree, `alt` the secondary one.
const AREAS = [
  { base: "/research/", alt: "/research/cn/", altLang: "cn", baseLang: "en" },
  { base: "/design/", alt: "/design/en/", altLang: "en", baseLang: "cn" },
];
const area = AREAS.find((entry) => path.startsWith(entry.base));

if (area) {
  const onAlt = path.startsWith(area.alt);
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  const requested = fromQuery && SUPPORTED.has(fromQuery) ? fromQuery : null;

  if (requested) writeStored(requested);

  // `?lang=` is a compatibility entry point; the stored preference keeps a
  // visitor on their language when they land on the other tree directly.
  const desired = requested ?? readStored() ?? (onAlt ? area.altLang : area.baseLang);
  const wantsAlt = desired === area.altLang;
  const url = new URL(window.location.href);
  url.searchParams.delete("lang");

  if (wantsAlt !== onAlt) {
    url.pathname = wantsAlt
      ? path.replace(area.base, area.alt)
      : path.replace(area.alt, area.base);
    window.location.replace(url.toString());
  } else {
    writeStored(desired);
    if (fromQuery) window.history.replaceState({}, "", url.toString());
  }
}
