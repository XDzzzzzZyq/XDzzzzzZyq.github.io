const projectList = document.querySelector("[data-project-list]");

const icons = {
  github: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.12 2.12 0 0 1 .63-1.34c-2.22-.25-4.56-1.11-4.56-4.95a3.87 3.87 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.48 9.48 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64a3.87 3.87 0 0 1 1.03 2.68c0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
    </svg>`,
  arxiv: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M5.7 18.5 11 5.5h2l5.3 13h-2.2l-1.1-2.9H9l-1.1 2.9H5.7Zm4-4.8h4.6L12 7.8l-2.3 5.9Z"/>
    </svg>`,
  publication: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M6 3h9l3 3v15H6z"/>
      <path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 12h6M9 16h6M14 3v4h4"/>
    </svg>`
};

const hasUrl = value => typeof value === "string" && value.trim().length > 0;

const createTextElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = text;
  return element;
};

const createIconLink = (type, href) => {
  const link = document.createElement("a");
  link.className = "icon-link";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `Open ${type} link`);
  link.innerHTML = icons[type] || icons.publication;
  return link;
};

const createProjectCard = project => {
  const article = document.createElement("article");
  article.className = "project-panel";
  article.tabIndex = 0;
  article.setAttribute("role", "link");
  article.setAttribute("aria-label", `Open details for ${project.title}`);

  const detailHref = `project.html?slug=${encodeURIComponent(project.slug)}`;
  article.addEventListener("click", event => {
    if (event.target.closest("a")) return;
    window.location.href = detailHref;
  });
  article.addEventListener("keydown", event => {
    if (event.key === "Enter") window.location.href = detailHref;
  });

  const mediaLink = document.createElement("a");
  mediaLink.className = "project-media";
  mediaLink.href = detailHref;

  const image = document.createElement("img");
  image.className = "project-cover";
  image.src = project.coverImage;
  image.alt = project.coverAlt || `${project.title} cover image`;
  mediaLink.append(image);

  const content = document.createElement("div");
  content.className = "project-content";

  const copy = document.createElement("div");
  copy.className = "project-copy";

  const titleLink = document.createElement("a");
  titleLink.className = "project-title-link";
  titleLink.href = detailHref;
  titleLink.append(createTextElement("h3", "project-title", project.title));

  const summary = createTextElement("p", "project-summary", project.summary);
  const meta = createTextElement("p", "project-meta", `${project.year} · ${project.status}`);
  const affiliation = hasUrl(project.affiliation)
    ? null
    : createTextElement("p", "project-affiliation", project.affiliation);

  const tags = document.createElement("ul");
  tags.className = "tag-list";
  (project.tags || []).forEach(tag => tags.append(createTextElement("li", "", tag)));

  copy.append(titleLink, summary, meta);
  if (affiliation) copy.append(affiliation);
  copy.append(tags);

  const actions = document.createElement("div");
  actions.className = "project-actions";
  if (hasUrl(project.links?.github)) actions.append(createIconLink("github", project.links.github));
  if (hasUrl(project.links?.arxiv)) actions.append(createIconLink("arxiv", project.links.arxiv));
  if (hasUrl(project.links?.publication)) actions.append(createIconLink("publication", project.links.publication));

  content.append(copy, actions);
  article.append(mediaLink, content);
  return article;
};

const renderProjects = projects => {
  projectList.replaceChildren();
  projects.forEach(project => projectList.append(createProjectCard(project)));
};

fetch("data/projects.json")
  .then(response => {
    if (!response.ok) throw new Error(`Project data failed to load: ${response.status}`);
    return response.json();
  })
  .then(renderProjects)
  .catch(error => {
    projectList.replaceChildren(createTextElement("p", "empty-state", "Projects could not be loaded. Check research/data/projects.json."));
    console.error(error);
  });
