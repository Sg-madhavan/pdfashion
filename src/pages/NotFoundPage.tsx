import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

/** Replacement for the Next.js built-in 404 page (`not-found`). */
export default function NotFoundPage() {
  useDocumentMeta({ title: "Page Not Found", noIndex: true });

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#061124] px-6 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,82,98,0.22),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(172,204,255,0.18),transparent_30%)]" aria-hidden="true" />
      <div className="relative max-w-xl">
        <span className="section-kicker">Error 404</span>
        <h1 className="mt-5 text-[clamp(3rem,10vw,7rem)] font-black leading-none tracking-[-0.07em]">
          This page could not be found.
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/65">
          The gift you’re looking for may have been moved. Let’s get you back to the magic.
        </p>
        <Link
          to="/"
          className="mt-9 inline-flex rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-300 px-7 py-4 font-black text-slate-950 shadow-[0_24px_70px_rgba(244,63,94,0.3)] transition hover:-translate-y-0.5"
        >
          Back to PD Fashion
        </Link>
      </div>
    </main>
  );
}
