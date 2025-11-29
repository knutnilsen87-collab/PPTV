import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const role = (session.user as any)?.role ?? "USER";

  if (role !== "ADMIN" && role !== "SUPERADMIN") {
    redirect("/");
  }

  const displayName = (session.user as any)?.name ?? "Admin";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:px-0">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              ProPokerTV / Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              Control room
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              You are signed in as <span className="font-semibold">{displayName}</span> ({role}).
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
            <p className="font-semibold">Placeholder dashboard</p>
            <p className="mt-1 text-[11px] text-amber-100/80">
              This is the starting point for the full admin area. Real metrics and tools
              will be wired up to Prisma and ProPokerTV services later.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Users
            </h2>
            <p className="mt-2 text-2xl font-semibold text-white">1</p>
            <p className="mt-1 text-xs text-slate-400">active admin (placeholder)</p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Later: search, filter and manage users.</li>
              <li>• Promote/demote roles (USER / CREATOR / ADMIN).</li>
              <li>• Soft-ban and review reports.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Clips & videos
            </h2>
            <p className="mt-2 text-2xl font-semibold text-white">Demo</p>
            <p className="mt-1 text-xs text-slate-400">content moderation & featuring</p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Approve or reject new uploads.</li>
              <li>• Feature clips to the front page or Play of the Week.</li>
              <li>• Flag content that breaks community rules.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Play of the Week
            </h2>
            <p className="mt-2 text-2xl font-semibold text-white">Placeholder</p>
            <p className="mt-1 text-xs text-slate-400">candidates, votes & winners</p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Curate weekly candidates from the clip pool.</li>
              <li>• Monitor live vote counts and trends.</li>
              <li>• Lock results and publish winners.</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Site settings (placeholder)
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              This card will later hold feature toggles, landing page settings and branding controls.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Turn beta features on/off.</li>
              <li>• Configure call-to-action text and hero sections.</li>
              <li>• Manage partner logos and sponsorship placements.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Analytics (placeholder)
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              Hook this up to real-time stats later: registrations, clip uploads, votes and watch time.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-slate-400">
              <li>• Daily new users and returning viewers.</li>
              <li>• Clip upload volume and review queue.</li>
              <li>• Engagement with Play of the Week.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
