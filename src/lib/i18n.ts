import en from "../content/i18n/en.json";
import cn from "../content/i18n/cn.json";

export type Lang = "en" | "cn";
export type Dictionary = typeof en;

export const SUPPORTED_LANGS: Lang[] = ["en", "cn"];
export const DEFAULT_LANG: Lang = "en";
export const STORAGE_KEY = "xdzzyq.lang";

const dictionaries: Record<Lang, Dictionary> = { en, cn };

export const getDict = (lang: Lang): Dictionary => dictionaries[lang] ?? en;

export const htmlLang = (lang: Lang): string => (lang === "cn" ? "zh-CN" : "en");

export const otherLang = (lang: Lang): Lang => (lang === "cn" ? "en" : "cn");

export const researchBase = (lang: Lang): string =>
  lang === "cn" ? "/research/cn/" : "/research/";

export const researchHomeHref = (lang: Lang, hash = ""): string =>
  `${researchBase(lang)}${hash}`;

export const projectHref = (lang: Lang, slug: string): string =>
  `${researchBase(lang)}${encodeURIComponent(slug)}/`;

// The switcher carries `?lang=` so the client script records the new
// preference; the script strips the query after storing it.
export const langSwitchHref = (lang: Lang, pathname: string): string => {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const target = otherLang(lang);
  const path =
    target === "cn"
      ? normalized.replace(/^\/research\//, "/research/cn/")
      : normalized.replace(/^\/research\/cn\//, "/research/");
  return `${path}?lang=${target}`;
};

export const interpolate = (
  template: string,
  values?: Record<string, string>
): string => {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    values[key] !== undefined ? values[key] : `{${key}}`
  );
};
