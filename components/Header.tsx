"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/brand", label: "Brand" }
];

export default function Header(){
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    function onKey(e: KeyboardEvent){ if(e.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const NavLink = ({ href, label }: { href:string; label:string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={[
          "px-3 py-2 rounded-btn transition-colors",
          active
            ? "text-textc-primary bg-[rgba(216,169,40,0.14)] border border-gold-600"
            : "text-textc-secondary hover:text-textc-primary hover:bg-[rgba(216,169,40,0.10)]"
        ].join(" ")}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-bg-primary/70 backdrop-blur supports-[backdrop-filter]:bg-bg-primary/55 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 rounded-lg">
            <Image src="/logo.png" alt="ProPokerTV" width={28} height={28} className="rounded-md" />
            <span className="font-display text-xl leading-none text-textc-primary">ProPokerTV</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {links.map(l => <NavLink key={l.href} {...l} />)}
          <Link href="/signup"
            className="ml-2 rounded-btn bg-gold-500 hover:bg-gold-600 text-bg-primary px-4 py-2 font-semibold shadow-e1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-600">
            Claim seat
          </Link>
        </nav>

        {/* Mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-btn border border-white/15 text-textc-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-600"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-white/10 bg-bg-primary/95">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2" aria-label="Mobile">
            {links.map(l => (<NavLink key={l.href} {...l} />))}
            <Link href="/signup"
              className="mt-2 rounded-btn bg-gold-500 hover:bg-gold-600 text-bg-primary px-4 py-2 font-semibold shadow-e1">
              Claim seat
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}