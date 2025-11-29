"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-amber-300/80">
        <span className="text-base">♠</span>
        <span>PROPOKERTV</span>
      </div>

      <h1 className="max-w-3xl text-balance text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
        Claim your seat at the table
      </h1>

      <p className="max-w-2xl text-balance text-sm text-slate-200/80 sm:text-base">
        Entertainment, professionalism and passion for poker — i ett univers.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Link href="/feed">
          <button className="pptv-primary-cta text-sm">
            Watch Highlights
          </button>
        </Link>

        <Link href="/play-of-the-week">
          <button className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/5">
            Leaderboard
          </button>
        </Link>
      </div>
    </section>
  );
}

