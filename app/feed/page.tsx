import Image from "next/image";
import Link from "next/link";

const FEED_ITEMS = [
  {
    id: 1,
    title: "Deep run in the Sunday Major",
    thumbnail: "/images/thumbnails/best-moments.jpeg",
    type: "Tournament",
    info: "€215 Online Major",
    length: "32:10",
  },
  {
    id: 2,
    title: "High stakes cash – 3-bet pot madness",
    thumbnail: "/images/thumbnails/high-stakes.jpeg",
    type: "Cash game",
    info: "€5/€10",
    length: "21:04",
  },
  {
    id: 3,
    title: "Strategy session: defending the big blind",
    thumbnail: "/images/thumbnails/strategy.jpeg",
    type: "Strategy",
    info: "Coaching session",
    length: "18:27",
  },
  {
    id: 2,
    title: "Final table replay – short-handed action",
    thumbnail: "/images/thumbnails/wsop-main.jpeg",
    type: "Final table",
    info: "€1k Main Event",
    length: "44:02",
  },
  {
    id: 3,
    title: "Bluff of the week compilation",
    thumbnail: "/images/thumbnails/amazing-bluff.jpeg",
    type: "Highlights",
    info: "Creator mix",
    length: "15:39",
  },
];

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 space-y-8">
        <header className="space-y-2">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-amber-300">
            Feed
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Your personalised ProPokerTV stream (placeholder)
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            This page shows how a personalised feed could look once we connect
            your viewing history, favourite creators and upcoming streams.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEED_ITEMS.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/video/${item.id}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-amber-400/60 transition-colors"
            >
              <div className="relative aspect-video">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-3 right-3 text-xs">
                  <div className="flex justify-between items-center gap-3">
                    <div className="space-y-1">
                      <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-300">
                        {item.type}
                      </p>
                      <p className="font-medium line-clamp-2">{item.title}</p>
                    </div>
                    <div className="text-right text-[0.6rem] text-slate-300">
                      <p>{item.info}</p>
                      <p className="text-slate-400">{item.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 flex items-center justify-between text-[0.7rem] text-slate-400">
                <span>Prototype only</span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Mock data
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
