type PlaceholderClip = {
  id: number;
  title: string;
  player: string;
  stakes: string;
  length: string;
};

const placeholderClips: PlaceholderClip[] = [
  {
    id: 1,
    title: "High stakes hero call on the river",
    player: "Alex Ice Larsen",
    stakes: "€5/€10 Cash",
    length: "08:42",
  },
  {
    id: 2,
    title: "Triple barrel bluff for the show",
    player: "Maria Sharp",
    stakes: "$1k Tournament",
    length: "05:19",
  },
  {
    id: 3,
    title: "Set over set disaster",
    player: "Tommy Ace Jensen",
    stakes: "€2/€5 Cash",
    length: "04:03",
  },
  {
    id: 4,
    title: "Hero fold in a massive pot",
    player: "Lena Stone",
    stakes: "$530 Online",
    length: "03:12",
  },
];

export default function ClipsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-3">
          <p className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-emerald-400/80 bg-emerald-400/10 px-3 py-1 rounded-full">
            COMMUNITY CLIPS
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Watch{" "}
            <span className="text-emerald-400">
              wild hands and sick bluffs
            </span>{" "}
            from the community.
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            This is the public clips hub. When uploads are fully wired to
            storage and transcoding, featured community clips will appear
            here with real data, views and votes.
          </p>

          <div className="mt-3 inline-flex flex-wrap items-center gap-3 text-xs">
            <a
              href="/account"
              className="rounded-full bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              Log in and upload your own clips
            </a>
            <span className="text-slate-400">
              Uploads are tied to your profile for security and moderation.
            </span>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {placeholderClips.map((clip) => (
            <article
              key={clip.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-slate-950/40 hover:border-emerald-500/70 hover:bg-slate-900 transition-colors"
            >
              <div className="relative h-40 w-full bg-slate-800">
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-200/80">
                  Placeholder clip thumbnail
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-[2px] text-[10px] text-slate-50">
                  {clip.length}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="text-sm font-semibold text-slate-50 line-clamp-2 group-hover:text-emerald-300">
                  {clip.title}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {clip.player} • {clip.stakes}
                </p>
                <div className="mt-auto flex items-center justify-between text-[10px] text-slate-500">
                  <span>Coming soon: real views & likes</span>
                  <span className="rounded-full border border-slate-700 px-2 py-[2px]">
                    MOCK DATA
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-[11px] text-slate-400">
          <p className="mb-1 font-semibold text-slate-200">
            Roadmap for the Clips hub:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Real clips pulled from the database and storage backend.</li>
            <li>Filters by stakes, format (cash / MTT), hero, location and more.</li>
            <li>Integration with Play of the Week voting and leaderboards.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
