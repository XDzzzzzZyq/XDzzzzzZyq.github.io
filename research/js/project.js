const projectRoot = document.querySelector("[data-project-root]");

const icons = {
  github: "GitHub",
  website: "Website",
  arxiv: "arXiv",
  publication: "Publication"
};

const hasUrl = value => typeof value === "string" && value.trim().length > 0;

const t = (path, values) => {
  const dict = window.__i18n;
  if (!dict) return path;
  const value = path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict);
  if (value === undefined) return path;
  return String(value).replace(/\{(\w+)\}/g, (_, k) => (values && values[k] !== undefined ? String(values[k]) : `{${k}}`));
};

const text = (tag, className, content) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (typeof content === "string") element.textContent = content;
  return element;
};

const getSlug = () => new URLSearchParams(window.location.search).get("slug");
const getLang = () => window.__lang || "en";

const renderNotFound = () => {
  document.title = `${t("detail.notFoundTitle") || "Project not found"} | XDzZyq Research`;
  projectRoot.replaceChildren();
  const panel = document.createElement("section");
  panel.className = "detail-panel";
  panel.append(
    text("h1", "", t("detail.notFoundTitle") || "Project not found"),
    text("p", "", t("detail.notFoundMessage") || "The project slug does not match an entry in research/data/projects.json.")
  );
  const back = document.createElement("a");
  back.className = "link-button link-button--primary";
  back.href = `index.html?lang=${getLang()}#projects`;
  back.textContent = t("detail.backButton") || "Back to projects";
  panel.append(back);
  projectRoot.append(panel);
};

const createLinkButton = (label, href) => {
  const link = document.createElement("a");
  link.className = "link-button";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  return link;
};

const fetchMarkdown = async (slug) => {
  const lang = getLang();
  const order = lang === "cn" ? [`projects/${slug}.cn.md`, `projects/${slug}.md`] : [`projects/${slug}.md`, `projects/${slug}.cn.md`];
  for (const path of order) {
    try {
      const res = await fetch(path);
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 0) return { text, path };
      }
    } catch (_) { /* try next */ }
  }
  return null;
};

const renderMarkdown = (md) => {
  const wrapper = document.createElement("div");
  wrapper.className = "markdown-body";
  if (typeof window.marked === "undefined" || typeof window.DOMPurify === "undefined") {
    wrapper.textContent = md;
    return wrapper;
  }
  const html = window.marked.parse(md, { mangle: false, headerIds: true, gfm: true, breaks: false });
  const safe = window.DOMPurify.sanitize(html, { ADD_ATTR: ["target", "rel"] });
  wrapper.innerHTML = safe;
  wrapper.querySelectorAll("a[href]").forEach(a => {
    if (/^https?:\/\//i.test(a.getAttribute("href"))) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
  return wrapper;
};

const renderProject = (project, markdown) => {
  document.title = `${project.title} | XDzZyq Research`;
  projectRoot.replaceChildren();

  // Top "back to list" link
  const topBack = document.createElement("a");
  topBack.className = "back-link";
  topBack.href = `index.html?lang=${getLang()}#projects`;
  topBack.textContent = t("detail.backToList") || "← All projects";
  projectRoot.append(topBack);

  const hero = document.createElement("section");
  hero.className = "detail-hero";

  const intro = document.createElement("div");
  intro.append(
    text("p", "detail-meta", `${project.year} · ${project.status}`),
    text("h1", "", project.title),
    text("p", "research-hero__intro", project.summary)
  );
  if (hasUrl(project.affiliation)) {
    const affiliationLabel = t("detail.affiliationPrefix") || "Affiliation";
    intro.append(text("p", "detail-affiliation", `${affiliationLabel} · ${project.affiliation}`));
  }
  if (hasUrl(project.piWebsite)) {
    const piLabel = t("detail.piLab") || "PI Lab";
    const piLink = document.createElement("a");
    piLink.className = "detail-pi-link";
    piLink.href = project.piWebsite;
    piLink.target = "_blank";
    piLink.rel = "noopener noreferrer";
    piLink.textContent = piLabel;
    const wrap = document.createElement("p");
    wrap.className = "detail-pi";
    wrap.append(`${piLabel} · `, piLink);
    intro.append(wrap);
  }

  const image = document.createElement("img");
  image.className = "detail-cover";
  image.src = project.coverImage;
  image.alt = project.coverAlt || `${project.title} cover image`;
  hero.append(intro, image);
  projectRoot.append(hero);

  // Abstract panel
  if (project.abstract) {
    const abstract = document.createElement("section");
    abstract.className = "detail-panel";
    abstract.append(text("h2", "", t("detail.abstract") || "Abstract"));
    abstract.append(text("p", "", project.abstract));
    projectRoot.append(abstract);
  }

  // Markdown body (the new project detail content)
  const mdPanel = document.createElement("section");
  mdPanel.className = "detail-panel markdown-panel";
  if (markdown) {
    mdPanel.append(renderMarkdown(markdown.text));
  } else {
    mdPanel.append(text("p", "empty-state", t("detail.markdownMissing") || "Detailed notes for this project are not available yet."));
  }
  projectRoot.append(mdPanel);

  // Tags
  if (project.tags && project.tags.length) {
    const tags = document.createElement("section");
    tags.className = "detail-panel";
    const list = document.createElement("ul");
    list.className = "tag-list";
    project.tags.forEach(tag => list.append(text("li", "", tag)));
    tags.append(list);
    projectRoot.append(tags);
  }

  // Links
  const links = document.createElement("section");
  links.className = "detail-panel";
  links.append(text("h2", "", t("detail.links") || "Links"));
  const row = document.createElement("div");
  row.className = "button-row";
  Object.entries(project.links || {}).forEach(([type, href]) => {
    if (hasUrl(href)) row.append(createLinkButton(icons[type] || type, href));
  });
  if (!row.children.length) row.append(text("p", "empty-state", t("detail.noLinks") || "No external links are attached to this project yet."));
  links.append(row);
  projectRoot.append(links);

  // Bottom "back to list" link
  const bottomBack = document.createElement("a");
  bottomBack.className = "link-button link-button--primary back-link-bottom";
  bottomBack.href = `index.html?lang=${getLang()}#projects`;
  bottomBack.textContent = t("detail.backButton") || "Back to projects";
  projectRoot.append(bottomBack);
};

const start = async () => {
  if (!window.__i18n) {
    document.addEventListener("i18n:ready", start, { once: true });
    return;
  }

  const slug = getSlug();
  if (!slug) {
    renderNotFound();
    return;
  }

  let projects = [];
  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error(`Project data failed to load: ${res.status}`);
    projects = await res.json();
  } catch (error) {
    console.error(error);
    renderNotFound();
    return;
  }

  const project = projects.find(p => p.slug === slug);
  if (!project) {
    renderNotFound();
    return;
  }

  const md = await fetchMarkdown(slug);
  renderProject(project, md);
  document.dispatchEvent(new CustomEvent("research:ready", { detail: { projects } }));
};

start();
