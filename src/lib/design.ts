import en from "../content/design/en.json";
import cn from "../content/design/cn.json";
import { interpolate, otherLang, type Lang } from "./i18n";
import { sectionIndex, type WorkSection } from "../data/works";

export type SectionText = {
  /** Section names stay untranslated (Motion / Graphic / Tools). */
  label: string;
  intro: string;
};

export type WorkText = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  body: string[];
  links: Record<string, string>;
};

export type DesignDict = {
  ui: typeof en.ui;
  sections: Record<WorkSection, SectionText>;
  works: Record<string, WorkText>;
};

const designMentionHrefs: Record<string, string> = {
  小豆子zyq: "https://space.bilibili.com/302469604",
  异世界情绪: "https://space.bilibili.com/488978908",
};

const dictionaries: Record<Lang, DesignDict> = {
  en: en as DesignDict,
  cn: cn as DesignDict,
};

export const getDesignDict = (lang: Lang): DesignDict => dictionaries[lang] ?? dictionaries.cn;

// The design area is Chinese-first, the mirror image of the research area:
// Chinese lives at /design/, English at /design/en/.
export const designBase = (lang: Lang): string =>
  lang === "en" ? "/design/en/" : "/design/";

export const designHomeHref = (lang: Lang, hash = ""): string =>
  `${designBase(lang)}${hash}`;

export const sectionHref = (lang: Lang, section: WorkSection): string =>
  `${designBase(lang)}${section}/`;

export const workHref = (lang: Lang, section: WorkSection, slug: string): string =>
  `${designBase(lang)}${section}/${encodeURIComponent(slug)}/`;

// Same contract as the research switcher: carry `?lang=` so the client script
// stores the new preference, then strips the query.
export const designLangSwitchHref = (lang: Lang, pathname: string): string => {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const target = otherLang(lang);
  const path =
    target === "en"
      ? normalized.replace(/^\/design\//, "/design/en/")
      : normalized.replace(/^\/design\/en\//, "/design/");
  return `${path}?lang=${target}`;
};

export const getSectionText = (lang: Lang, section: WorkSection) => ({
  id: section,
  index: sectionIndex[section],
  ...getDesignDict(lang).sections[section],
});

export const getWorkText = (lang: Lang, slug: string): WorkText | undefined =>
  getDesignDict(lang).works[slug];

export const statLabel = (lang: Lang, key: string): string => {
  const labels = getDesignDict(lang).ui.stats as Record<string, string>;
  return labels[key] ?? key;
};

export const designText = (
  lang: Lang,
  key: keyof typeof en.ui,
  values?: Record<string, string>
): string => interpolate(String(getDesignDict(lang).ui[key]), values);

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const mentionHref = (handle: string): string | undefined => designMentionHrefs[handle];

const mentionPattern = /@\{([^}]+)\}|@([^\s<>{}\[\]()*，。！？!?;；:：/\\]+)/g;

/**
 * Render a short inline string with markdown-style bold and auto-linked @mentions.
 * The result is safe to feed to `set:html` because the source is escaped first.
 */
export const renderDesignInline = (value: string): string => {
  const escaped = escapeHtml(value);
  const bolded = escaped.replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>");
  return bolded.replace(
    mentionPattern,
    (match, bracketedHandle: string, bareHandle: string) => {
      const handle = bracketedHandle || bareHandle;
      const href = mentionHref(handle);
      if (!href) {
        return bracketedHandle ? `@${handle}` : match;
      }
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">@${handle}</a>`;
    }
  );
};

/**
 * Point an asset path at one of the small copies that `scripts/thumbs.mjs`
 * writes beside the originals.
 *
 * Only the hub's section strip uses this — `sm` is 640px with animation frozen
 * to frame one. Everywhere else, including the work cards, the detail stack and
 * the lightbox, shows the original.
 *
 * Anything outside /design/assets/ is returned untouched.
 */
export const derived = (src: string, size: "sm"): string =>
  src.startsWith("/design/assets/")
    ? src.replace("/design/assets/", `/design/derived/${size}/`).replace(/\.(png|jpe?g)$/i, ".webp")
    : src;
