import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "@/config/env";

/** Mirrors the Next.js `metadata.title` config from the original `app/layout.tsx`. */
export const DEFAULT_TITLE = "PD Fashion – World of Personalized Gifts";
const TITLE_TEMPLATE = "%s | PD Fashion Gifts";
export const DEFAULT_DESCRIPTION =
  "Premium personalized gifts for birthdays, anniversaries, weddings, festivals, baby celebrations, corporate events, and Christmas memories.";

type DocumentMeta = {
  /** Page title. When omitted, the default title is used (Next.js `title.default`). */
  title?: string;
  description?: string;
  /** Adds `noindex, nofollow` (e.g. for 404 pages). */
  noIndex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Client-side replacement for Next.js `metadata` / `generateMetadata`.
 * Static defaults also live in `index.html` so crawlers without JS still see them.
 */
export function useDocumentMeta({ title, description = DEFAULT_DESCRIPTION, noIndex = false }: DocumentMeta = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? TITLE_TEMPLATE.replace("%s", title) : DEFAULT_TITLE;
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title ? fullTitle : DEFAULT_TITLE);
    upsertMeta("name", "twitter:title", title ? fullTitle : DEFAULT_TITLE);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    const url = `${SITE_URL}${pathname === "/index.html" ? "/" : pathname}`;
    upsertCanonical(url);
    upsertMeta("property", "og:url", url);
  }, [title, description, noIndex, pathname]);
}
