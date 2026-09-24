import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import RouteErrorPage from "@/pages/RouteErrorPage";

/**
 * Centralised route table.
 *
 * Next.js (App Router)               → React Router
 *   src/app/layout.tsx               → <RootLayout /> (pathless layout route)
 *   src/app/page.tsx          "/"    → index route "/"
 *   built-in not-found page   (any)  → "*"
 *
 * "/index.html" is aliased to the home page so the SPA also works when a
 * static host serves the entry file directly.
 */
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "index.html", element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

// Only absolute Vite `base` values (e.g. "/shop/") map to a router basename.
// Relative bases such as "./" (used by single-file builds) mean "served from root".
const rawBase = import.meta.env.BASE_URL ?? "/";
const basename = rawBase.startsWith("/") ? rawBase.replace(/\/+$/, "") || "/" : "/";

export const router = createBrowserRouter(routes, { basename });
