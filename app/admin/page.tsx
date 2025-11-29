import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/admin");
  }

  // @ts-expect-error - role is added in our Prisma User + NextAuth session
  const role = session.user.role as string | undefined;

  if (role !== "ADMIN") {
    // Non-admins should never be here – send them back to their account
    redirect("/account");
  }

  // Basic metrics
  const [userCount, videoCount, voteCount, latestUsers, latestVideos] =
    await Promise.all([
      db.user.count(),
      db.video.count(),
      db.vote.count(),
      db.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      db.video.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          createdAt: true,
          durationSec: true,
        },
      }),
    ]);

  const formatDate = (d: Date | null | undefined) =>
    d ? new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d) : "Unknown";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Admin Control Room
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
              High-level overview of the ProPokerTV platform. This is an early
              admin dashboard – more controls and insights will be added over time.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1">
              Role: Admin
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1">
              Phase 2 – Autopilot
            </span>
          </div>
        </header>

        {/* Metrics row */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total users
            </div>
            <div className="mt-2 text-3xl font-semibold">{userCount}</div>
            <p className="mt-2 text-xs text-slate-400">
              Registered accounts in the system. In later phases you will be
              able to filter by role, status and activity.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total videos
            </div>
            <div className="mt-2 text-3xl font-semibold">{videoCount}</div>
            <p className="mt-2 text-xs text-slate-400">
              Videos currently registered in the catalog. Future admin tools
              will include feature flags, pinning, and content curation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Total votes
            </div>
            <div className="mt-2 text-3xl font-semibold">{voteCount}</div>
            <p className="mt-2 text-xs text-slate-400">
              Community engagement for Play of the Week and other interactive
              formats. Advanced analytics will be added in a later phase.
            </p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Latest users */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-100">
                Latest users
              </h2>
              <span className="text-xs text-slate-400">
                First 5 most recent
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Simple list of recent signups. In the full version you&apos;ll
              be able to search, filter and take actions on each user.
            </p>

            <div className="mt-4 space-y-2">
              {latestUsers.length === 0 && (
                <p className="text-xs text-slate-500">
                  No users found yet. Seed data or real signups will appear here.
                </p>
              )}
              {latestUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3 py-2"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {user.name ?? "Unknown name"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {user.email ?? "No email"} · {user.role ?? "USER"}
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-xs text-slate-400">
                    <span>Joined</span>
                    <span>{formatDate(user.createdAt as Date | null)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Latest videos */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-100">
                Latest videos
              </h2>
              <span className="text-xs text-slate-400">
                First 5 most recent
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Monitoring area for newly added content. Later this can evolve
              into a full content operations panel with review and publishing
              workflows.
            </p>

            <div className="mt-4 space-y-2">
              {latestVideos.length === 0 && (
                <p className="text-xs text-slate-500">
                  No videos found yet. Once uploads or seeding is in place,
                  they will show up here.
                </p>
              )}
              {latestVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 px-3 py-2"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {video.title ?? "Untitled video"}
                    </span>
                    <span className="text-xs text-slate-400">
                      Duration:{" "}
                      {video.durationSec
                        ? `${Math.round(video.durationSec / 60)} min`
                        : "Unknown"}
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-xs text-slate-400">
                    <span>Created</span>
                    <span>{formatDate(video.createdAt as Date | null)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Roadmap / placeholder section */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-100">
            Coming next to the Admin Control Room
          </h2>
          <p className="mt-2 text-xs text-slate-300">
            This is an early but functional admin hub. The following features
            are planned for upcoming phases:
          </p>
          <ul className="mt-3 grid gap-2 text-xs text-slate-300 md:grid-cols-2">
            <li className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
              • User management: deactivate, reset password, and role editing.
            </li>
            <li className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
              • Content tools: feature videos, pin Play of the Week and manage
                categories.
            </li>
            <li className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
              • Moderation queue: reported users, flagged content and audit
                trails.
            </li>
            <li className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2">
              • Advanced analytics: retention, watch time and engagement per
                segment (cash games, MTT, high stakes, etc.).
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
