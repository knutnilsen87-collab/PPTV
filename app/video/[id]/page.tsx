import Link from "next/link";

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "High stakes hero call on the river",
    player: 'Alex "Ice" Larsen',
    stakes: "€5/€10 Cash",
    length: "08:42",
    tag: "Play of the Week candidate",
    views: "13.2k",
    description:
      "Hero call in a big cash game pot. In the real site this could be a flagship hand breakdown with commentary and HUD overlays.",
  },
  {
    id: 2,
    title: "Final table: slick three-way all-in",
    player: "Mia Santos",
    stakes: "€215 Main Event",
    length: "06:17",
    tag: "Tournament highlight",
    views: "9.4k",
    description:
      "Crunch-spot three-way all-in near the top of the payout ladder. Perfect for deep-diving ICM and solver comparisons later.",
  },
  {
    id: 3,
    title: "Bluff of the week – triple barrel",
    player: "Jin Park",
    stakes: "€5/€10 Cash",
    length: "04:39",
    tag: "Bluff of the Week",
    views: "7.8k",
    description:
      "Cold-blooded triple barrel bluff. On the final product this could include range visualisation, chat replay and player cams.",
  },
];

interface PageProps {
  params: { id: string };
}

export default function VideoPage({ params }: PageProps) {
  const numericId = Number(params.id);
  const video = MOCK_VIDEOS.find((v) => v.id === numericId);

  if (!video) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold">Video not found</h1>
          <p className="text-slate-400 text-sm">
            This is a mock player view. Once ProPokerTV is wired to a real
            video backend, invalid IDs will return a proper 404 or redirect.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-4 py-2 rounded-full border border-slate-700 text-xs font-medium hover:bg-slate-900"
            >
              Back to home
            </Link>
            <Link
              href="/feed"
              className="px-4 py-2 rounded-full bg-amber-400 text-slate-950 text-xs font-semibold hover:bg-amber-300"
            >
              Go to feed
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.25em] text-amber-300 uppercase">
              Placeholder player
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
              {video.title}
            </h1>
            <p className="mt-3 text-sm text-slate-400 max-w-xl">
              This page is a mock video detail view for ProPokerTV. Later it can
              be wired to your real live streams, VODs and hero clips.
            </p>
          </div>
          <div className="text-xs text-slate-400 space-y-1 md:text-right">
            <p>
              <span className="text-slate-500">Length:</span> {video.length}
            </p>
            <p>
              <span className="text-slate-500">Stakes:</span> {video.stakes}
            </p>
            <p>
              <span className="text-slate-500">Views:</span> {video.views}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8">
          {/* Player frame */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_0%,#facc15,transparent_55%),radial-gradient(circle_at_90%_100%,#22d3ee,transparent_55%)]" />
              <div className="relative text-center space-y-2 px-6">
                <p className="text-[0.65rem] tracking-[0.3em] uppercase text-amber-300">
                  Video frame placeholder
                </p>
                <p className="text-lg md:text-xl font-medium">
                  Here goes the real embedded player later
                </p>
                <p className="text-xs text-slate-300 max-w-lg mx-auto">
                  For now this is just a visual frame so you can feel how the
                  experience will look once the video service (Mux, YouTube,
                  Twitch, etc.) is connected.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 text-sm font-semibold hover:bg-amber-300">
                Play highlight (mock)
              </button>
              <button className="px-5 py-2.5 rounded-full border border-slate-700 text-sm hover:bg-slate-900">
                Add to favourites (mock)
              </button>
              <span className="text-[0.7rem] text-slate-500">
                Buttons are non-functional until you connect the real player and
                user collections.
              </span>
            </div>
          </div>

          {/* Side info */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
              <p className="text-[0.65rem] font-semibold tracking-[0.25em] text-slate-400 uppercase">
                Table &amp; player
              </p>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">{video.player}</p>
                  <p className="text-xs text-slate-400">{video.tag}</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-slate-300">
                  Placeholder
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {video.description}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
              <p className="text-[0.65rem] font-semibold tracking-[0.25em] text-slate-400 uppercase">
                Navigation
              </p>
              <p className="text-xs text-slate-400">
                When this page is wired up, viewers might arrive from the home
                highlight rail, the feed, playlists or external links.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:bg-slate-900"
                >
                  Back to home
                </Link>
                <Link
                  href="/feed"
                  className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:bg-slate-900"
                >
                  Back to feed
                </Link>
                <Link
                  href="/clips"
                  className="px-4 py-2 rounded-full border border-slate-700 text-xs hover:bg-slate-900"
                >
                  Explore clips
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Small hint for you as product owner */}
        <p className="text-[0.65rem] text-slate-500">
          Product note: when you are ready, this route <code>/video/[id]</code>{" "}
          can be wired to Prisma + your video provider IDs so these placeholders
          become real players.
        </p>
      </div>
    </div>
  );
}
