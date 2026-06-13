// search.js — floating overlay (Cmd+K / /) on research pages.
// Builds an index from research/data/projects.json once projects are loaded.
// Fuzzy match: lower-cased substring match + subsequence match (chars in order)
// scored per field. Title hits the hardest, tags next, summary last.

const MAX_RESULTS = 10;

let projects = [];
let query = "";
let activeIndex = 0;

const $overlay = document.querySelector("[data-search-overlay]");
const $input = document.querySelector("[data-search-input]");
const $results = document.querySelector("[data-search-results]");

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");

const t = (path) => {
  const dict = window.__i18n;
  if (!dict) return path;
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict) || path;
};

const categoryLabel = (cat) => {
  if (cat === "research") return t("nav.projects");
  if (cat === "personal") return t("nav.personal");
  return cat;
};

const ensureProjects = async () => {
  if (projects.length > 0) return projects;
  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error(`search: projects.json ${res.status}`);
    const all = await res.json();
    projects = all.filter(p => p.enable !== false);
  } catch (error) {
    console.error(error);
    projects = [];
  }
  return projects;
};

// Subsequence score: higher = better. -Infinity means no match.
const subsequenceScore = (query, target) => {
  if (!query) return 0;
  const q = query.toLowerCase();
  const tg = target.toLowerCase();
  if (tg.includes(q)) {
    const idx = tg.indexOf(q);
    // Earlier match + shorter target = better.
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
  if (qi < q.length) return -Infinity; // not all chars matched in order
  // Bonus for matching all query chars in a small target
  return score - Math.min(tg.length, 200) * 0.1;
};

const scoreProject = (project, q) => {
  const titleScore = subsequenceScore(q, project.title);
  if (titleScore === -Infinity) return -Infinity;
  let s = titleScore * 3;
  const summaryScore = subsequenceScore(q, project.summary || "");
  if (summaryScore !== -Infinity) s += summaryScore * 0.6;
  if (project.tags) {
    for (const tag of project.tags) {
      const tagScore = subsequenceScore(q, tag);
      if (tagScore !== -Infinity) s += tagScore * 1.4;
    }
  }
  if (project.status) {
    const stScore = subsequenceScore(q, project.status);
    if (stScore !== -Infinity) s += stScore * 0.4;
  }
  return s;
};

const renderResults = () => {
  if (!$results) return;
  $results.replaceChildren();
  if (!query) {
    activeIndex = 0;
    const empty = document.createElement("li");
    empty.className = "search-empty search-helper";
    empty.textContent = t("site.searchPlaceholder") || "Type to search…";
    $results.append(empty);
    return;
  }

  const scored = projects
    .map(p => ({ p, s: scoreProject(p, query) }))
    .filter(r => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, MAX_RESULTS);

  if (scored.length === 0) {
    activeIndex = 0;
    const empty = document.createElement("li");
    empty.className = "search-empty";
    empty.textContent = t("site.searchNoResults") || "No matches found.";
    $results.append(empty);
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
    link.href = `project.html?slug=${encodeURIComponent(p.slug)}`;
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
    li.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      window.location.href = link.href;
    });

    $results.append(li);
  });
};

const updateActiveClass = () => {
  if (!$results) return;
  $results.querySelectorAll(".search-result").forEach((el, i) => {
    el.classList.toggle("is-active", i === activeIndex);
    el.setAttribute("aria-selected", i === activeIndex ? "true" : "false");
  });
};

const open = async () => {
  if (!$overlay) return;
  await ensureProjects();
  $overlay.hidden = false;
  $overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("search-open");
  if ($input) {
    $input.value = "";
    query = "";
    renderResults();
    $input.focus();
  }
};

const close = () => {
  if (!$overlay) return;
  $overlay.hidden = true;
  $overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("search-open");
};

const navigateActive = () => {
  if (!$results) return;
  const items = $results.querySelectorAll(".search-result__link");
  if (items.length === 0) return;
  const target = items[Math.min(activeIndex, items.length - 1)];
  if (target) window.location.href = target.href;
};

const bindOpenButtons = () => {
  document.querySelectorAll("[data-search-open]").forEach(btn => {
    btn.addEventListener("click", open);
  });
};

const bindCloseButtons = () => {
  document.querySelectorAll("[data-search-close]").forEach(el => {
    el.addEventListener("click", close);
  });
};

const bindInput = () => {
  if (!$input) return;
  $input.addEventListener("input", (e) => {
    query = e.target.value.trim();
    activeIndex = 0;
    renderResults();
  });
  $input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const total = $results.querySelectorAll(".search-result").length;
      if (total > 0) {
        activeIndex = (activeIndex + 1) % total;
        updateActiveClass();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const total = $results.querySelectorAll(".search-result").length;
      if (total > 0) {
        activeIndex = (activeIndex - 1 + total) % total;
        updateActiveClass();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigateActive();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });
};

const bindGlobalHotkeys = () => {
  document.addEventListener("keydown", (e) => {
    const inField = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
    if (e.key === "Escape" && !$overlay.hidden) {
      e.preventDefault();
      close();
      return;
    }
    if (inField) return;
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if ($overlay.hidden) open(); else close();
      return;
    }
    if (e.key === "/") {
      e.preventDefault();
      open();
    }
  });
};

// Preload project index as soon as i18n is ready; also listen for the
// research:ready event in case research.js / project.js finish later.
const init = () => {
  bindOpenButtons();
  bindCloseButtons();
  bindInput();
  bindGlobalHotkeys();
  ensureProjects();
  document.addEventListener("research:ready", () => {
    if (!projects.length) ensureProjects();
  });
  // Re-apply the empty-state placeholder text after i18n loads.
  document.addEventListener("i18n:ready", () => {
    if (!$overlay.hidden) renderResults();
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export { open, close };
