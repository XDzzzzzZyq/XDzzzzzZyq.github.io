/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export {};

declare global {
  interface Window {
    __i18n?: Record<string, unknown>;
    __lang?: string;
    __SEARCH_INDEX__?: import("./lib/projects").SearchProjectRecord[];
  }
}
