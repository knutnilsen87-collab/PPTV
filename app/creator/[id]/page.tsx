import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface CreatorPageProps {
  params: { id: string };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  const displayName = user.displayName || user.name || "Poker player";
  const roleLabel = user.role ?? "USER";

  const createdAt =
    user.createdAt instanceof Date ? user.createdAt : user.createdAt ? new Date(user.createdAt as any) : null;

  const joined =
    createdAt != null
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(createdAt)
      : "Unknown";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-xl font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">
                ProPokerTV creator
              </p>
              <h1 className="mt-1 text-3xl font-semibold text-slate-50">
                {displayName}
              </h1>
              <p className="mt-1 text-xs text-slate-400">
                Joined {joined} · Role: {roleLabel}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
              {roleLabel}
            </span>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          {/* About */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-sm shadow-black/40">
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-400 uppercase">
              About
            </h2>
            <p className="mt-3 text-sm text-slate-100 whitespace-pre-line">
              {user.bio && user.bio.trim().length > 0
                ? user.bio
                : "This player has not written a bio yet. Once they do, it will appear here."}
            </p>
          </div>

          {/* Quick stats (placeholder) */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-sm shadow-black/40">
            <h2 className="text-sm font-semibold tracking-[0.18em] text-slate-400 uppercase">
              Highlights
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Clips, streams and Play of the Week entries will show up here.</li>
              <li>• Admins can later feature legendary hands and milestones.</li>
              <li>• Stats like total votes, wins and views will be added over time.</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20 p-6">
          <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Coming soon
          </h3>
          <p className="mt-2 text-xs text-slate-400">
            This is a first version of public creator profiles. Upcoming features:
          </p>
          <ul className="mt-3 grid gap-2 text-xs text-slate-400 md:grid-cols-2">
            <li>• Public clip gallery with filters for Play of the Week, streams and highlights.</li>
            <li>• Badges for wins, deep runs and featured moments on the front page.</li>
            <li>• Social links for Twitch, YouTube, X and more.</li>
            <li>• Advanced stats for views, votes and community engagement.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
