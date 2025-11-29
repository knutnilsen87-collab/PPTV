"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/clips", label: "Clips" },
  { href: "/play-of-the-week", label: "Play of the Week" },
  { href: "/live", label: "Live" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" },
];

function NavLink({ href, label }: NavItem) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href) && href !== "/";

  return (
    <Link
      href={href}
      className={
        "rounded-full px-3 py-1 text-xs transition " +
        (isActive
          ? "bg-slate-800 text-white"
          : "text-slate-300 hover:bg-slate-800/60 hover:text-white")
      }
    >
      {label}
    </Link>
  );
}

export default function Navigation() {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session as any)?.user?.role as string | undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/80 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo / brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-950 shadow-md">
              ♠
            </div>
            <span className="text-sm font-semibold tracking-tight">
              ProPokerTV
            </span>
          </Link>
        </div>

        {/* Middle nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-2">
          {status === "loading" && (
            <div className="h-8 w-24 animate-pulse rounded-full bg-slate-800/60" />
          )}

          {status !== "loading" && !session && (
            <>
              <button
                type="button"
                onClick={() => signIn(undefined, { callbackUrl: "/account" })}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
              >
                Login
              </button>
              <Link
                href="/register"
                className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:bg-amber-300"
              >
                Sign up
              </Link>
            </>
          )}

          {status !== "loading" && session && (
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
              >
                Account
              </Link>

              {role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-full border border-emerald-500/60 bg-emerald-500/15 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-emerald-200 hover:bg-emerald-500/25"
                >
                  Admin
                </Link>
              )}

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[0.7rem] font-medium text-slate-300 hover:bg-slate-800"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav (simple version – only brand + auth) */}
      <nav className="flex gap-1 border-t border-slate-900/80 px-4 py-2 text-xs text-slate-400 md:hidden">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </header>
  );
}
