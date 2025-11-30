"use client";

import Link from "next/link";

type PowCandidate = {
  id: number;
  title: string;
  player: string;
  stakes: string;
  length: string;
  views: string;
  tag: string;
};

const powCandidates: PowCandidate[] = [
  {
    id: 1,
    title: "High stakes hero call on the river",
    player: 'Alex "Ice" Larsen',
    stakes: "€5/€10 Cash",
    length: "08:42",
    views: "13.2k views",
    tag: "Play of the Week candidate",
  },
  {
    id: 2,
    title: "Final table: sick three-way all-in",
    player: "Mia Santos · €215 Main Event",
    stakes: "Tournament highlight",
    length: "06:17",
    views: "9.4k views",
    tag: "Tournament highlight",
  },
  {
    id: 3,
    title: "Bluff of the week – triple barrel",
    player: "Jin Park · €5/€10 Cash",
    stakes: "Cash game highlight",
    length: "04:39",
    views: "7.8k views",
    tag: "Bluff of the Week",
  },
];

export default function PlayOfTheWeekPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-16">
        <section className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent-gold uppercase">
            Community feature
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Play of the Week
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Every week, the community helps surface the most entertaining hands.
            These entries are mock data for now, wired up to a real voting
            backend so we can test the experience later.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
              Current candidates
            </p>
            <p className="text-[11px] text-slate-500">
              Preview layout only – buttons open the design preview page.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {powCandidates.map((clip) => (
              <article
                key={clip.id}
                className="flex flex-col rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
              >
                <div className="mb-4 h-40 w-full rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-4 py-3 text-xs text-slate-300">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Live table / replay frame placeholder</span>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]">
                      Preview
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Later this area becomes the actual video frame for the
                    selected hand (VOD or short-form highlight).
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-medium text-amber-300 uppercase tracking-[0.16em]">
                    Highlight
                  </span>
                  <span>{clip.length}</span>
                </div>

                <div className="mt-3 space-y-1">
                  <h2 className="text-sm font-semibold leading-snug text-slate-50">
                    {clip.title}
                  </h2>
                  <p className="text-xs text-slate-300">{clip.player}</p>
                  <p className="text-[11px] text-slate-400">{clip.tag}</p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{clip.views}</span>
                  <span className="text-slate-500">Preview only</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-500">
                    Watch button opens the mock player in{" "}
                    <span className="underline">/design-preview</span>.
                  </p>
                  <Link
                    href={`/design-preview?from=pow&id=${clip.id}`}
                    className="whitespace-nowrap rounded-full border border-amber-400/70 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-slate-950"
                  >
                    Watch clip (mock)
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 border-t border-slate-800 pt-6 text-[11px] text-slate-500">
          <p>
            Product note: later, this page can show multiple categories (best
            bluff, hero call, craziest cooler) and time-boxed voting windows
            with leaderboard integration.
          </p>
        </section>
      </div>
    </main>
  );
}
