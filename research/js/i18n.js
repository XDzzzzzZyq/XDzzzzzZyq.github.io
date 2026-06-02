// i18n.js — research-page translation loader
// Reads ?lang=en|cn from URL, falls back to localStorage, then to "en".
// On every page load: applies translations to [data-i18n] nodes, sets <html lang>,
// updates the lang switcher href, and exposes t()/lang helpers on window for other scripts.

const SUPPORTED = ["en", "cn"];
const STORAGE_KEY = "xdzzyq.lang";
const DEFAULT_LANG = "en";

const getLang = () => {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("lang");
  if (fromQuery && SUPPORTED.includes(fromQuery)) {
    try { localStorage.setItem(STORAGE_KEY, fromQuery); } catch (_) { /* noop */ }
    return fromQuery;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch (_) { /* noop */ }
  return DEFAULT_LANG;
};

const getByPath = (obj, path) => {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

const interpolate = (template, values) => {
  if (!template || typeof template !== "string") return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => (values && values[key] !== undefined ? String(values[key]) : `{${key}}`));
};

const applyTranslations = (dict) => {
  document.documentElement.setAttribute("lang", dict.site?.lang || DEFAULT_LANG);

  document.querySelectorAll("[data-i18n]").forEach(node => {
    const path = node.getAttribute("data-i18n");
    const value = getByPath(dict, path);
    if (value === undefined) return;
    if (node.tagName === "TITLE") {
      node.textContent = String(value);
    } else if ("innerHTML" in node && /<[a-z][\s\S]*>/i.test(String(value))) {
      node.innerHTML = value;
    } else {
      node.textContent = String(value);
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach(node => {
    node.getAttribute("data-i18n-attr").split(",").map(s => s.trim()).filter(Boolean).forEach(spec => {
      const [attr, path] = spec.split("|").map(s => s.trim());
      if (!attr || !path) return;
      const value = getByPath(dict, path);
      if (value !== undefined) node.setAttribute(attr, String(value));
    });
  });

  // Update page <title> if a [data-i18n] path is on it
  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl) {
    const v = getByPath(dict, titleEl.getAttribute("data-i18n"));
    if (v) document.title = String(v);
  }

  // Update lang switcher href
  const switcher = document.querySelector("[data-lang-switch]");
  if (switcher) {
    const otherLang = dict.site?.lang === "cn" ? "en" : "cn";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", otherLang);
    switcher.setAttribute("href", url.pathname.split("/").pop() + (url.search || ""));
    const label = switcher.querySelector("[data-lang-switch-label]");
    if (label) label.textContent = dict.site?.langOther || (otherLang === "cn" ? "中" : "EN");
  }
};

const switchToLang = (target) => {
  if (!SUPPORTED.includes(target)) return;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", target);
  window.location.href = url.toString();
};

const t = (path, values) => {
  const dict = window.__i18n;
  if (!dict) return path;
  return interpolate(getByPath(dict, path), values);
};

const loadDict = async (lang) => {
  const response = await fetch(`i18n/${lang}.json`);
  if (!response.ok) throw new Error(`i18n load failed: ${lang} -> ${response.status}`);
  return response.json();
};

const init = async () => {
  const lang = getLang();
  let dict;
  try {
    dict = await loadDict(lang);
  } catch (error) {
    console.error(error);
    if (lang !== DEFAULT_LANG) {
      dict = await loadDict(DEFAULT_LANG).catch(() => ({}));
    } else {
      dict = {};
    }
  }
  window.__i18n = dict;
  window.__lang = dict.site?.lang || lang;
  applyTranslations(dict);
  document.dispatchEvent(new CustomEvent("i18n:ready", { detail: { dict, lang: window.__lang } }));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export { t, switchToLang, getLang, SUPPORTED };
