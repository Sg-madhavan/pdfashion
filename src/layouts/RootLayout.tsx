import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import PageLoader from "@/components/PageLoader";

/**
 * Equivalent of Next.js `app/layout.tsx`.
 * `<html lang>`, body classes, global metadata and viewport/theme-color are
 * defined statically in `index.html`; global CSS is imported in `main.tsx`.
 */
export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <ErrorBoundary key={pathname}>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
