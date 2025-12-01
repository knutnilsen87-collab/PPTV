import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import AdminUploadsClient from "./AdminUploadsClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions as any);
  const role = (session as any)?.user?.role as string | undefined;

  if (!session || role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin");
  }

  const [userCount, videoCount, voteCount, latestUsers] = await Promise.all([
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
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">ProPokerTV Admin</h1>
            <p className="text-sm text-slate-400 mt-1">
              Internal control center for videos, creators and the community.
            </p>
          </div>
          <div className="text-right text-xs text-slate-400">
            Signed in as{" "}
            <span className="font-semibold text-slate-100">
              {(session?.user as any)?.email ?? "unknown"}
            </span>
            <br />
            Role:{" "}
            <span className="font-semibold text-emerald-300">
              {role ?? "unknown"}
            </span>
          </div>
        </header>

        {/* Stats cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Total users
            </div>
            <div className="mt-2 text-3xl font-semibold">{userCount}</div>
            <p className="mt-1 text-xs text-slate-500">
              Registered accounts in the ProPokerTV universe.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Total videos
            </div>
            <div className="mt-2 text-3xl font-semibold">{videoCount}</div>
            <p className="mt-1 text-xs text-slate-500">
              Clips, streams and highlights currently in the system.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Total votes
            </div>
            <div className="mt-2 text-3xl font-semibold">{voteCount}</div>
            <p className="mt-1 text-xs text-slate-500">
              Community engagement across Play of the Week and clips.
            </p>
          </div>
        </section>

        {/* Latest users + Upload management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest users */}
          <section className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-3">Latest users</h2>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              {latestUsers.length === 0 && (
                <p className="text-sm text-slate-400">
                  No users found yet.
                </p>
              )}
              {latestUsers.length > 0 && (
                <ul className="space-y-3 text-sm">
                  {latestUsers.map((u) => {
                    const createdLabel = new Date(
                      u.createdAt as unknown as string
                    ).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    });

                    return (
                      <li
                        key={u.id}
                        className="flex items-start justify-between border-b border-slate-800/60 last:border-none pb-2"
                      >
                        <div>
                          <div className="font-medium">
                            {u.name ?? "(no name)"}
                          </div>
                          <div className="text-xs text-slate-400">
                            {u.email}
                          </div>
                        </div>
                        <div className="text-right text-xs text-slate-400">
                          <div className="mb-1">
                            <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700">
                              {u.role ?? "USER"}
                            </span>
                          </div>
                          <div>{createdLabel}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>

          {/* Upload management (client component) */}
          <div className="lg:col-span-2">
            <AdminUploadsClient />
          </div>
        </div>
      </div>
    </div>
  );
}
