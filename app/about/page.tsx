export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
            About
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            What is ProPokerTV?
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            ProPokerTV is a poker-first entertainment platform. The goal is to blend live
            streamed action, curated highlights and community-driven moments into one
            universe.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-sm font-semibold text-slate-100">
            The vision
          </h2>
          <p className="text-sm text-slate-300">
            Think of ProPokerTV as a digital rail. Viewers can follow their favourite
            creators, jump into live streams, re-watch key hands and vote on the plays
            that define each week.
          </p>
          <p className="text-sm text-slate-400">
            Over time, the platform will support creator tools, branded integrations and
            tiered subscriptions – all built around responsible, entertaining poker.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              For viewers
            </h3>
            <p className="text-sm text-slate-300">
              Easy access to live tables, curated highlights, short clips and
              Play of the Week votes.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              For creators
            </h3>
            <p className="text-sm text-slate-300">
              A home for your content, with tools for scheduling, tagging and
              showcasing your best hands.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              For partners
            </h3>
            <p className="text-sm text-slate-300">
              Brand-safe integrations, highlight sponsorships and content formats that
              respect both the game and the audience.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-sm text-slate-400">
          <p>
            This page is a placeholder. As the product matures, we can expand it with a
            full story around the brand, team and roadmap.
          </p>
        </section>
      </main>
    </div>
  );
}
