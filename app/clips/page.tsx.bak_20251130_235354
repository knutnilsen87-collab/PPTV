import Image from "next/image";
import Link from "next/link";

const CLIPS = [
  {
    id: 3,
    title: "Triple barrel bluff for the ages",
    thumbnail: "/images/thumbnails/amazing-bluff.jpeg",
    label: "Bluff of the Week",
    length: "00:43",
  },
  {
    id: 1,
    title: "Hero call with fourth pair",
    thumbnail: "/images/thumbnails/video-thumbnail.jpeg",
    label: "Hero call",
    length: "00:31",
  },
  {
    id: 2,
    title: "Three-way all-in preflop explosion",
    thumbnail: "/images/thumbnails/video-thumbnail.jpeg",
    label: "Final table",
    length: "00:52",
  },
  {
    id: 1,
    title: "River check-raise for stacks",
    thumbnail: "/images/thumbnails/strategy.jpeg",
    label: "Cash game",
    length: "00:35",
  },
];

export default function ClipsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 space-y-8">
        <header className="space-y-2">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-amber-300">
            Clips
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Short, shareable poker moments (placeholder)
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            In the full product, this page becomes the hub for fast highlights,
            social-first cuts and creator clips. For now, it is a visual mock.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-5">
          {CLIPS.map((clip, index) => (
            <Link
              key={`${clip.id}-${index}`}
              href={`/video/${clip.id}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-amber-400/60 transition-colors"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={clip.thumbnail}
                  alt={clip.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 rounded-full bg-black/50 text-[0.6rem] uppercase tracking-[0.15em] text-amber-200">
                    {clip.label}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 space-y-1 text-xs">
                  <p className="font-medium line-clamp-2">{clip.title}</p>
                  <p className="text-[0.6rem] text-slate-300">
                    Length: {clip.length} (mock)
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-[0.7rem] text-slate-500">
          Product note: these clips could later be auto-generated from full
          streams, submitted by creators, or voted up from the community.
        </p>
      </div>
    </div>
  );
}
