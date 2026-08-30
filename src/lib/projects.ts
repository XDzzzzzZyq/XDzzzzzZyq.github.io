import { getCollection, render, type CollectionEntry } from "astro:content";
import rawProjects from "../data/projects.json";
import type { Lang } from "./i18n";

export type ProjectCategory = "research" | "personal";

export type ProjectLinks = {
  github?: string;
  website?: string;
  arxiv?: string;
  publication?: string;
};

export type ProjectRecord = {
  slug: string;
  enable?: boolean;
  category: ProjectCategory;
  title: string;
  titleCn?: string;
  year: string;
  status: string;
  statusCn?: string;
  affiliation?: string;
  affiliationCn?: string;
  piWebsite?: string;
  summary: string;
  summaryCn?: string;
  abstract?: string;
  abstractCn?: string;
  coverImage: string;
  coverAlt?: string;
  coverAltCn?: string;
  tags: string[];
  tagsCn?: string[];
  links?: ProjectLinks;
  details?: string[];
  detailsCn?: string[];
};

export type LocalizedProjectRecord = Omit<
  ProjectRecord,
  | "titleCn"
  | "statusCn"
  | "affiliationCn"
  | "summaryCn"
  | "abstractCn"
  | "coverAltCn"
  | "tagsCn"
  | "detailsCn"
> & {
  title: string;
  status: string;
  affiliation?: string;
  summary: string;
  abstract?: string;
  coverAlt?: string;
  tags: string[];
  details?: string[];
};

export type SearchProject = Pick<
  LocalizedProjectRecord,
  "slug" | "title" | "summary" | "tags" | "status" | "category" | "year"
>;

const projects = rawProjects as ProjectRecord[];

const pickLocalized = (lang: Lang, en: string, cn?: string): string =>
  lang === "cn" && cn ? cn : en;

const pickLocalizedArray = (lang: Lang, en: string[], cn?: string[]): string[] =>
  lang === "cn" && cn && cn.length > 0 ? cn : en;

export const localizeProject = (project: ProjectRecord, lang: Lang): LocalizedProjectRecord => ({
  ...project,
  title: pickLocalized(lang, project.title, project.titleCn),
  status: pickLocalized(lang, project.status, project.statusCn),
  affiliation: project.affiliation
    ? pickLocalized(lang, project.affiliation, project.affiliationCn)
    : undefined,
  summary: pickLocalized(lang, project.summary, project.summaryCn),
  abstract: project.abstract ? pickLocalized(lang, project.abstract, project.abstractCn) : undefined,
  coverAlt: project.coverAlt ? pickLocalized(lang, project.coverAlt, project.coverAltCn) : undefined,
  tags: pickLocalizedArray(lang, project.tags || [], project.tagsCn),
  details: project.details ? pickLocalizedArray(lang, project.details, project.detailsCn) : undefined,
});

export const getProjects = (): ProjectRecord[] =>
  projects.filter((project) => project.enable !== false);

export const getProject = (slug: string): ProjectRecord | undefined =>
  getProjects().find((project) => project.slug === slug);

export const getProjectsByCategory = (category: ProjectCategory): ProjectRecord[] =>
  getProjects().filter((project) => (project.category || "research") === category);

export const coverUrl = (coverImage: string): string => {
  if (coverImage.startsWith("assets/")) return `/research/${coverImage}`;
  if (coverImage.startsWith("/")) return coverImage;
  return `/research/${coverImage}`;
};

export const getSearchIndex = (lang: Lang): SearchProject[] =>
  getProjects().map((project) => {
    const text = localizeProject(project, lang);
    return {
    slug: project.slug,
    title: text.title,
    summary: text.summary,
    tags: text.tags,
    status: text.status,
    category: project.category,
    year: project.year,
  };
  });

export const getProjectBody = async (
  slug: string,
  lang: Lang
): Promise<CollectionEntry<"projects"> | null> => {
  const entries = await getCollection("projects");
  const forSlug = entries.filter((entry) => entry.data.slug === slug);
  const fallbackLang: Lang = lang === "cn" ? "en" : "cn";
  return (
    forSlug.find((entry) => entry.data.lang === lang) ??
    forSlug.find((entry) => entry.data.lang === fallbackLang) ??
    null
  );
};

export const renderProjectBody = async (slug: string, lang: Lang) => {
  const entry = await getProjectBody(slug, lang);
  if (!entry) return null;
  return render(entry);
};
