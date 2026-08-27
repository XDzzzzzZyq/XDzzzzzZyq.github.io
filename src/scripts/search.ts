import type { SearchProject } from "../lib/projects";

const MAX_RESULTS = 10;
const STORAGE_KEY = "xdzzyq.lang";

let projects: SearchProject[] = [];
let query = "";
let activeIndex = 0;

const overlay = document.querySelector("[data-search-overlay]");
const input = document.querySelector<HTMLInputElement>("[data-search-input]");
const results = document.querySelector("[data-search-results]");

const t = (path: string): string => {
  const dict = window.__i18n;
  if (!dict) return path;
  return (
    path.split(".").reduce<unknown>((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, dict) as string | undefined
  ) || path;
};

const categoryLabel = (cat: string): string => {
  if (cat === "research") return t("nav.projects");
  if (cat === "personal") return t("nav.personal");
  return cat;
};

const projectHref = (slug: string): string => {
  const lang = window.__lang || "en";
  const stored = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  })();
  const active = lang || stored || "en";
  return active === "cn"
    ? `/research/cn/${encodeURIComponent(slug)}/`
    : `/research/${encodeURIComponent(slug)}/`;
};

const subsequenceScore = (rawQuery: string, target: string): number => {
  if (!rawQuery) return 0;
  const q = rawQuery.toLowerCase();
  const tg = target.toLowerCase();
  if (tg.includes(q)) {
    const idx = tg.indexOf(q);
    return 1000 - idx - Math.min(tg.length, 100);
  }
  let qi = 0;
  let score = 0;
  let streak = 0;
  let lastMatch = -1;
  for (let i = 0; i < tg.length && qi < q.length; i++) {
    if (tg[i] === q[qi]) {
      score += 1 + streak * 2;
      if (lastMatch === i - 1) score += 1;
      lastMatch = i;
      streak++;
      qi++;
    } else {
      streak = 0;
    }
  }
  if (qi < q.length) return -Infinity;
  return score - Math.min(tg.length, 200) * 0.1;
};

const scoreProject = (project: SearchProject, q: string): number => {
  const titleScore = subsequenceScore(q, project.title);
  if (titleScore === -Infinity) return -Infinity;
  let s = titleScore * 3;
  const summaryScore = subsequenceScore(q, project.summary || "");
  if (summaryScore !== -Infinity) s += summaryScore * 0.6;
  for (const tag of project.tags || []) {
    const tagScore = subsequenceScore(q, tag);
    if (tagScore !== -Infinity) s += tagScore * 1.4;
  }
  if (project.status) {
    const stScore = subsequenceScore(q, project.status);
    if (stScore !== -Infinity) s += stScore * 0.4;
  }
  return s;
};

const updateActiveClass = () => {
  if (!results) return;
  results.querySelectorAll(".search-result").forEach((el, i) => {
    el.classList.toggle("is-active", i === activeIndex);
    el.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
  });
};

const renderResults = () => {
  if (!results) return;
  results.replaceChildren();
  if (!query) {
    activeIndex = 0;
    const empty = document.createElement("li");
    empty.className = "search-empty search-helper";
    empty.textContent = t("site.searchPlaceholder") || "Type to search…";
    results.append(empty);
    return;
  }

  const scored = projects
    .map((p) => ({ p, s: scoreProject(p, query) }))
    .filter((entry) => entry.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, MAX_RESULTS);

  if (scored.length === 0) {
    activeIndex = 0;
    const empty = document.createElement("li");
    empty.className = "search-empty";
    empty.textContent = t("site.searchNoResults") || "No matches found.";
    results.append(empty);
    return;
  }

  if (activeIndex >= scored.length) activeIndex = 0;

  scored.forEach((entry, i) => {
    const { p } = entry;
    const li = document.createElement("li");
    li.className = "search-result" + (i === activeIndex ? " is-active" : "");
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", i === activeIndex ? "true" : "false");

    const link = document.createElement("a");
    link.href = projectHref(p.slug);
    link.className = "search-result__link";

    const type = document.createElement("span");
    type.className = "search-result__type";
    type.textContent = categoryLabel(p.category || "research");

    const title = document.createElement("span");
    title.className = "search-result__title";
    title.textContent = p.title;

    const meta = document.createElement("span");
    meta.className = "search-result__meta";
    const tagText = (p.tags || []).slice(0, 3).join(" · ");
    meta.textContent = tagText || `${p.year} · ${p.status}`;

    link.append(type, title, meta);
    li.append(link);
    li.addEventListener("mouseenter", () => {
      activeIndex = i;
      updateActiveClass();
    });
    results.append(li);
  });
};

const open = () => {
  if (!(overlay instanceof HTMLElement)) return;
  projects = window.__SEARCH_INDEX__ ?? [];
  overlay.hidden = false;
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("search-open");
  if (input) {
    input.value = "";
    query = "";
    renderResults();
    input.focus();
  }
};

const close = () => {
  if (!(overlay instanceof HTMLElement)) return;
  overlay.hidden = true;
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("search-open");
};

const navigateActive = () => {
  if (!results) return;
  const items = results.querySelectorAll<HTMLAnchorElement>(".search-result__link");
  if (items.length === 0) return;
  const target = items[Math.min(activeIndex, items.length - 1)];
  if (target) window.location.href = target.href;
};

document.querySelectorAll("[data-search-open]").forEach((btn) => {
  btn.addEventListener("click", open);
});
document.querySelectorAll("[data-search-close]").forEach((el) => {
  el.addEventListener("click", close);
});

input?.addEventListener("input", (event) => {
  query = (event.target as HTMLInputElement).value.trim();
  activeIndex = 0;
  renderResults();
});

input?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    const total = results?.querySelectorAll(".search-result").length ?? 0;
    if (total > 0) {
      activeIndex = (activeIndex + 1) % total;
      updateActiveClass();
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    const total = results?.querySelectorAll(".search-result").length ?? 0;
    if (total > 0) {
      activeIndex = (activeIndex - 1 + total) % total;
      updateActiveClass();
    }
  } else if (event.key === "Enter") {
    event.preventDefault();
    navigateActive();
  } else if (event.key === "Escape") {
    event.preventDefault();
    close();
  }
});

document.addEventListener("keydown", (event) => {
  const inField =
    event.target instanceof HTMLElement &&
    (event.target.tagName === "INPUT" ||
      event.target.tagName === "TEXTAREA" ||
      event.target.isContentEditable);
  if (event.key === "Escape" && overlay instanceof HTMLElement && !overlay.hidden) {
    event.preventDefault();
    close();
    return;
  }
  if (inField) return;
  if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    if (overlay instanceof HTMLElement && overlay.hidden) open();
    else close();
    return;
  }
  if (event.key === "/") {
    event.preventDefault();
    open();
  }
});
