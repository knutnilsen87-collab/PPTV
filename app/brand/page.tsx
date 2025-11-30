export default function BrandPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            Brand
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            ProPokerTV brand kit (placeholder)
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            This space will host logos, colour references and usage guidelines for
            partners, creators and tournament organisers.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-sm font-semibold text-slate-100">
              Logo lockups
            </h2>
            <div className="flex h-32 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_0%_0%,#facc15_0,transparent_40%),radial-gradient(circle_at_100%_100%,#22c55e_0,transparent_45%),radial-gradient(circle_at_50%_0%,#6366f1_0,transparent_40%)]">
              <span className="text-xs font-semibold tracking-[0.18em] text-slate-900/90">
                LOGO PLACEHOLDER
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Here we can add SVG/PNG downloads for light and dark backgrounds, plus
              clear-space rules and minimum sizes.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <h2 className="text-sm font-semibold text-slate-100">
              Colour palette
            </h2>
            <div className="grid grid-cols-4 gap-2 text-[11px]">
              <div className="space-y-1">
                <div className="h-10 rounded-lg bg-slate-950" />
                <p className="text-slate-400">Slate 950</p>
              </div>
              <div className="space-y-1">
                <div className="h-10 rounded-lg bg-slate-800" />
                <p className="text-slate-400">Slate 800</p>
              </div>
              <div className="space-y-1">
                <div className="h-10 rounded-lg bg-amber-400" />
                <p className="text-slate-400">Accent amber</p>
              </div>
              <div className="space-y-1">
                <div className="h-10 rounded-lg bg-emerald-400" />
                <p className="text-slate-400">Accent emerald</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              In a later phase we can provide exact hex values, gradients and usage notes
              for overlays, buttons and HUD elements.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
          <p className="mb-2">
            This is a placeholder brand page. It is meant to help visualise how partner
            documentation and assets could live inside the product.
          </p>
          <p>
            When you are ready, we can replace this with real downloads, examples of sponsored
            highlight cards and content templates for social media.
          </p>
        </section>
      </main>
    </div>
  );
}
