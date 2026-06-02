const projectRoot = document.querySelector("[data-project-root]");

const icons = {
  github: "GitHub",
  arxiv: "arXiv",
  publication: "Publication"
};

const hasUrl = value => typeof value === "string" && value.trim().length > 0;

const text = (tag, className, content) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = content;
  return element;
};

const getSlug = () => new URLSearchParams(window.location.search).get("slug");

const renderNotFound = () => {
  document.title = "Project not found | XDzZyq Research";
  projectRoot.replaceChildren();
  const panel = document.createElement("section");
  panel.className = "detail-panel";
  panel.append(
    text("h1", "", "Project not found"),
    text("p", "", "The project slug does not match an entry in research/data/projects.json.")
  );
  const back = document.createElement("a");
  back.className = "link-button link-button--primary";
  back.href = "index.html#projects";
  back.textContent = "Back to projects";
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

const renderProject = project => {
  document.title = `${project.title} | XDzZyq Research`;
  projectRoot.replaceChildren();

  const hero = document.createElement("section");
  hero.className = "detail-hero";

  const intro = document.createElement("div");
  intro.append(
    text("p", "detail-meta", `${project.year} · ${project.status}`),
    text("h1", "", project.title),
    text("p", "research-hero__intro", project.summary)
  );
  if (hasUrl(project.affiliation)) {
    intro.append(text("p", "detail-affiliation", `Affiliation · ${project.affiliation}`));
  }

  const image = document.createElement("img");
  image.className = "detail-cover";
  image.src = project.coverImage;
  image.alt = project.coverAlt || `${project.title} cover image`;
  hero.append(intro, image);

  const abstract = document.createElement("section");
  abstract.className = "detail-panel";
  abstract.append(text("h2", "", "Abstract"), text("p", "", project.abstract));

  const details = document.createElement("section");
  details.className = "detail-panel";
  details.append(text("h2", "", "Details"));
  (project.details || []).forEach(item => details.append(text("p", "", item)));

  const tags = document.createElement("ul");
  tags.className = "tag-list";
  (project.tags || []).forEach(tag => tags.append(text("li", "", tag)));
  details.append(tags);

  const links = document.createElement("section");
  links.className = "detail-panel";
  links.append(text("h2", "", "Links"));
  const row = document.createElement("div");
  row.className = "button-row";
  Object.entries(project.links || {}).forEach(([type, href]) => {
    if (hasUrl(href)) row.append(createLinkButton(icons[type] || type, href));
  });
  if (!row.children.length) row.append(text("p", "empty-state", "No external links are attached to this project yet."));
  links.append(row);

  projectRoot.append(hero, abstract, details, links);
};

fetch("data/projects.json")
  .then(response => {
    if (!response.ok) throw new Error(`Project data failed to load: ${response.status}`);
    return response.json();
  })
  .then(projects => {
    const project = projects.find(item => item.slug === getSlug());
    if (!project) {
      renderNotFound();
      return;
    }
    renderProject(project);
  })
  .catch(error => {
    console.error(error);
    renderNotFound();
  });
