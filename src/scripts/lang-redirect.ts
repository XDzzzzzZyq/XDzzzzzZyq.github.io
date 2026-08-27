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

if (path.startsWith("/research/")) {
  const isCnPath = path.startsWith("/research/cn/");
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  const requested = fromQuery && SUPPORTED.has(fromQuery) ? fromQuery : null;

  if (requested) writeStored(requested);

  // `?lang=` is a compatibility entry point; the stored preference keeps a
  // visitor on their language when they land on the other tree directly.
  const desired = requested ?? readStored() ?? (isCnPath ? "cn" : "en");
  const url = new URL(window.location.href);
  url.searchParams.delete("lang");

  if ((desired === "cn") !== isCnPath) {
    url.pathname =
      desired === "cn"
        ? path.replace(/^\/research\//, "/research/cn/")
        : path.replace(/^\/research\/cn\//, "/research/");
    window.location.replace(url.toString());
  } else {
    writeStored(desired);
    if (fromQuery) window.history.replaceState({}, "", url.toString());
  }
}
