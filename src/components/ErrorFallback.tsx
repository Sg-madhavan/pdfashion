type Props = { onReset?: () => void };

/** Shared error UI used by the React error boundary and the router `errorElement`. */
export default function ErrorFallback({ onReset }: Props) {
  return (
    <main role="alert" className="grid min-h-screen place-items-center bg-[#061124] px-6 text-center text-white">
      <div className="max-w-lg">
        <span className="section-kicker">Something went wrong</span>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-black leading-none tracking-[-0.05em]">
          Our elves dropped a gift.
        </h1>
        <p className="mt-5 leading-7 text-white/65">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="rounded-full bg-gradient-to-r from-rose-500 to-amber-300 px-6 py-3 font-black text-slate-950 transition hover:-translate-y-0.5"
            >
              Try again
            </button>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-white/15 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/16"
          >
            Reload page
          </button>
        </div>
      </div>
    </main>
  );
}
