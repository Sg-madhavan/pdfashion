/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional absolute URL of the backend API (e.g. http://localhost:3001). Defaults to same origin. */
  readonly VITE_API_BASE_URL?: string;
  /** Public site URL used for canonical / Open Graph metadata. */
  readonly VITE_SITE_URL?: string;
  /** Public WhatsApp number for wa.me links. */
  readonly VITE_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
