import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorFallback from "@/components/ErrorFallback";
import NotFoundPage from "@/pages/NotFoundPage";

/** Router-level `errorElement` — catches errors thrown while matching/rendering routes. */
export default function RouteErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;
  return <ErrorFallback />;
}
