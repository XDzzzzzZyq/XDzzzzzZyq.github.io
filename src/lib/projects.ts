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
  year: string;
  status: string;
  affiliation?: string;
  piWebsite?: string;
  summary: string;
  abstract?: string;
  coverImage: string;
  coverAlt?: string;
  tags: string[];
  links?: ProjectLinks;
  details?: string[];
};

export type SearchProject = Pick<
  ProjectRecord,
  "slug" | "title" | "summary" | "tags" | "status" | "category" | "year"
>;

const projects = rawProjects as ProjectRecord[];

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

export const getSearchIndex = (): SearchProject[] =>
  getProjects().map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    tags: project.tags,
    status: project.status,
    category: project.category,
    year: project.year,
  }));

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
