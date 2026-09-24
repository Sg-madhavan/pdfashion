/**
 * Centralised, browser-safe runtime configuration.
 *
 * IMPORTANT: Only `VITE_*` variables are exposed to the browser bundle by Vite.
 * Never put secrets (e.g. DATABASE_URL) in a `VITE_*` variable — those belong
 * exclusively to the backend in `/server`.
 */

/** Base URL of the enquiries backend. Empty string = same origin (default, like the Next.js app). */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

/** Public site URL, used for canonical / Open Graph URLs (was `metadataBase` in Next.js). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://pdfashiongifts.example").replace(/\/+$/, "");

/** WhatsApp number used for wa.me deep links (public information). */
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "919999999999";

/** Resolve a file from the `public/` folder, respecting Vite's configured `base`. */
export function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base.endsWith("/") ? base : `${base}/`}${path.replace(/^\/+/, "")}`;
}
