"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Account creation
        </p>
        <h1 className="text-3xl font-semibold">Registration disabled</h1>
        <p className="text-slate-300">
          In this phase of ProPokerTV, new accounts are created manually by the
          site owner. If you need access, please contact the administrator.
        </p>

        <div className="mt-4">
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
