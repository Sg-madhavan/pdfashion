/** Route-level loading UI (replacement for Next.js `loading.tsx`). */
export default function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-screen place-items-center bg-[#061124] text-white">
      <div className="flex flex-col items-center gap-4">
        <span className="relative grid h-14 w-14 animate-pulse place-items-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-amber-300 text-xl font-black shadow-[0_18px_50px_rgba(244,63,94,0.35)]">
          PD
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.32em] text-amber-100/80">Wrapping your gifts…</span>
      </div>
    </div>
  );
}
