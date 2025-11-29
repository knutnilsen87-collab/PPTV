#!/usr/bin/env bash
set -euo pipefail

# ProPokerTV — Apply Design Contract (LFA+++ Neo‑Luxe Theme)
# This script adds color tokens, typography, shadows, components (Container, SkipLink, ContentCard),
# enhanced TopNav pills, HeroSlider (reduced‑motion aware), and Tailwind config glue.
#
# Run from project root:
#   bash scripts/apply_design_contract.sh
#
# After running:
#   npm install  # ensure tailwind is installed already
#   npm run dev

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup_design_$TS"
backup(){ local f="$1"; [ -e "$f" ] || return 0; mkdir -p "$BACKUP_DIR/$(dirname "$f")"; mv "$f" "$BACKUP_DIR/$f"; echo "  ↪ backup $f"; }
write(){ local p="$1"; shift; mkdir -p "$(dirname "$p")"; backup "$p"; printf "%s\n" "$CONTENT" > "$p"; echo "  ✓ wrote $p"; }
append(){ local p="$1"; shift; mkdir -p "$(dirname "$p")"; touch "$p"; printf "%s\n" "$CONTENT" >> "$p"; echo "  ➕ appended $p"; }
need_root(){ [ -d src ] || { echo "Run from project root (missing src/)."; exit 1; } }
need_root

# ---------------------------------------------------------------------------
# 1) Tailwind config (extend colors, fonts, shadows, container)
TWCFG="tailwind.config.ts"
if [ -f tailwind.config.js ]; then TWCFG="tailwind.config.js"; fi

CONTENT='// tailwind config (theme-extended by script)
/** @type {import("tailwindcss").Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        poker: {
          primary:  "#0B0E13",
          secondary:"#111C2D",
          accent:   "#FFD166",
          deepgold: "#CFAE58",
          emerald:  "#00ECC3",
          royal:    "#F4355E",
          text:     "#EDEDEF",
          muted:    "#A6A7AD",
          tertiary: "#6B6D75",
          line:     "#2A2B31",
        }
      },
      boxShadow: {
        elevate: "0 8px 24px rgba(0,0,0,.35)",
        glowEmerald: "0 0 24px rgba(0,255,198,.18)",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(.22,.61,.36,1)",
      },
      spacing: { 13: "3.25rem" }
    },
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1440px" } },
    fontFamily: {
      // Using next/font for Manrope/Inter; Tailwind entry helps utilities
      display: ["var(--font-manrope)", "ui-sans-serif", "system-ui"],
      body: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [],
}
export default config
'
write "$TWCFG"

# ---------------------------------------------------------------------------
# 2) CSS variables + motion + utility tokens
CONTENT='/* Neo‑Luxe base tokens */
:root{
  --background:#0B0E13; /* primary */
  --surface:#111C2D;    /* secondary */
  --text:#EDEDEF;
  --muted:#A6A7AD;
  --tertiary:#6B6D75;
  --accent-gold:#FFD166;
  --deep-gold:#CFAE58;
  --emerald:#00ECC3;
  --royal:#F4355E;
  --line:#2A2B31;
}
:root{ color-scheme: dark }
html{ background:var(--background); color:var(--text) }

/***** Motion *****/
:root{ --dur-1:120ms; --dur-2:200ms; --dur-3:320ms; --ease-luxe:cubic-bezier(.22,.61,.36,1) }
*{ accent-color: var(--emerald) }
@media (prefers-reduced-motion: reduce){ *{ animation:none!important; transition:none!important } }

/***** Focus & borders *****/
:focus-visible{ outline: none }
:focus-visible{ box-shadow:0 0 0 3px rgba(0,236,195,.55); border-radius:12px }
.border-card{ border:1px solid var(--line) }
.card{ background:var(--surface); border:1px solid var(--line); border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,.35) }
.glow-emerald{ box-shadow:0 0 24px rgba(0,255,198,.18) }
'
append src/app/globals.css

# ---------------------------------------------------------------------------
# 3) Next font wiring (ensure variables)
CONTENT='// src/app/fonts.ts
import { Inter, Manrope } from "next/font/google";
export const inter = Inter({ subsets:["latin"], variable:"--font-inter", display:"swap" });
export const manrope = Manrope({ subsets:["latin"], variable:"--font-manrope", display:"swap", weight:["400","500","600","700"] });
'
write src/app/fonts.ts

# ---------------------------------------------------------------------------
# 4) Container component
CONTENT='// src/components/Container.tsx
import React from "react";
export default function Container({children, className=""}:{children:React.ReactNode, className?:string}){
  return <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
'
write src/components/Container.tsx

# 5) SkipLink
CONTENT='// src/components/SkipLink.tsx
export default function SkipLink(){
  return (
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-black text-white px-3 py-2 rounded-xl">Skip to content</a>
  )
}
'
write src/components/SkipLink.tsx

# 6) ContentCard (video/stream)
CONTENT='// src/components/ContentCard.tsx
import Image from "next/image";
export function ContentCard({ title, poster, duration, live, views, avatar, author }:{ title:string; poster:string; duration?:string; live?:boolean; views?:string; avatar?:string; author?:string; }){
  return (
    <article className="group rounded-2xl overflow-hidden bg-poker-secondary border border-poker-line hover:shadow-elevate transition-[transform,box-shadow] duration-200 ease-luxe hover:-translate-y-0.5">
      <div className="relative">
        <Image src={poster} alt="" width={640} height={360} className="aspect-video w-full object-cover" />
        {live && <span className="absolute top-3 left-3 bg-poker-royal text-white text-xs px-2 py-1 rounded-full">LIVE</span>}
        {duration && <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{duration}</span>}
      </div>
      <div className="p-3 flex gap-3">
        {avatar && <Image src={avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full"/>}
        <div>
          <h3 className="text-sm font-semibold leading-tight line-clamp-2">{title}</h3>
          {(author||views) && <p className="text-xs text-poker-muted">{author}{author&&views? ' • ' : ''}{views}</p>}
        </div>
      </div>
    </article>
  );
}
'
write src/components/ContentCard.tsx

# 7) HeroSlider (simple autoplay; respects reduced motion)
CONTENT='// src/components/HeroSlider.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DURATION = 6000;

export default function HeroSlider(){
  const slides = useMemo(()=>[
    { id:1, title:"EPT Monte Carlo Final Table", img:"https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1600&q=60" },
    { id:2, title:"WSOP Main Event — Day 5", img:"https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=60" },
    { id:3, title:"High Stakes Cash — 200/400", img:"https://images.unsplash.com/photo-1520975867597-0f51bc2a1061?auto=format&fit=crop&w=1600&q=60" },
  ],[]);
  const [i,setI] = useState(0);
  const reduced = useRef(false);
  useEffect(()=>{ reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches; });
  useEffect(()=>{
    if(reduced.current) return; const t = setInterval(()=> setI(v => (v+1)%slides.length), DURATION); return ()=>clearInterval(t);
  },[slides.length]);
  return (
    <section className="relative overflow-hidden rounded-xl border border-poker-line bg-gradient-to-br from-poker-secondary to-poker-primary">
      <div className="relative">
        <Image src={slides[i].img} alt="" width={1600} height={900} className="aspect-video w-full object-cover opacity-90"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h1 className="font-display text-2xl md:text-4xl font-bold">{slides[i].title}</h1>
          <div className="mt-3 flex gap-2">
            <Link href="/live" className="rounded-2xl bg-poker-accent text-black px-4 py-2 font-medium hover:brightness-110 transition">Watch live</Link>
            <Link href="/clips" className="rounded-2xl border border-poker-line px-4 py-2">Highlights</Link>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-4 flex gap-2">
        {slides.map((s,idx)=> (
          <button key={s.id} aria-label={`Go to slide ${idx+1}`} onClick={()=>setI(idx)} className={`h-2 w-6 rounded-full ${i===idx? 'bg-poker-emerald glow-emerald':'bg-white/30'}`}/>
        ))}
      </div>
    </section>
  );
}
'
write src/components/HeroSlider.tsx

# 8) Enhanced TopNav (pills, frosted, dropdown skeleton)
CONTENT='// src/components/TopNav.tsx
"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/live", label: "Live" },
  { href: "/clips", label: "Clips" },
  { href: "/calendar", label: "Calendar" },
  { href: "/community", label: "Community" },
];

export default function TopNav(){
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false) };
    document.addEventListener('keydown', onKey); return ()=>document.removeEventListener('keydown', onKey);
  },[]);
  useEffect(()=>{
    const onClick=(e:MouseEvent)=>{ if(open && menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false) };
    document.addEventListener('click', onClick); return ()=>document.removeEventListener('click', onClick);
  },[open]);
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-poker-line">
      <div className="max-w-[1440px] mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-display text-lg">ProPokerTV</Link>
          <div className="relative" ref={menuRef}>
            <button aria-haspopup="true" aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="ml-2 rounded-2xl border border-poker-line bg-poker-secondary px-3 py-1.5 text-sm hover:brightness-110">Explore ▾</button>
            {open && (
              <div role="menu" className="absolute left-0 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl border border-poker-line bg-poker-secondary p-3 shadow-elevate">
                <div className="min-w-[180px]"><p className="text-xs text-poker-muted mb-1">Topics</p><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">Cash</a><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">MTT</a><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">Short Deck</a></div>
                <div className="min-w-[220px]"><p className="text-xs text-poker-muted mb-1">Live now</p><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">High Stakes</a><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">Creator League</a></div>
                <div className="min-w-[220px]"><p className="text-xs text-poker-muted mb-1">Upcoming</p><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">Sunday Million</a><a className="block rounded-xl px-3 py-2 hover:bg-white/5" href="#">EPT Prague</a></div>
              </div>
            )}
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          {links.map(l=> <Link key={l.href} className="rounded-2xl border border-poker-line px-3 py-1.5 text-sm hover:bg-white/5" href={l.href}>{l.label}</Link>)}
          <Link href="/search" className="rounded-2xl border border-poker-line px-3 py-1.5 text-sm">Search</Link>
          <Link href="/profile" className="rounded-2xl bg-poker-accent text-black px-3 py-1.5 text-sm hover:brightness-110">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
'
write src/components/TopNav.tsx

# 9) Layout wiring (use fonts, TopNav, Container, SkipLink) – non-destructive overwrite
CONTENT='import type { Metadata } from "next";
import "./globals.css";
import { inter, manrope } from "./fonts";
import TopNav from "@/components/TopNav";
import SkipLink from "@/components/SkipLink";

export const metadata: Metadata = { title: "ProPokerTV", description: "Elite poker video platform" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="bg-poker-primary text-poker-text antialiased">
        <SkipLink/>
        <TopNav/>
        <main id="main" className="py-6">{children}</main>
      </body>
    </html>
  );
}
'
write src/app/layout.tsx

# 10) Home wiring: use HeroSlider + a themed grid using ContentCard
CONTENT='import HeroSlider from "@/components/HeroSlider";
import { ContentCard } from "@/components/ContentCard";

export default function Page(){
  const mock = Array.from({length:8}).map((_,i)=>({
    id: i+1,
    title: `Exploitative 3‑bet SB vs BTN — Hand ${i+1}`,
    poster: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1600&q=60",
    duration: `${7+i}:${(10+i)%60}`,
    live: i===0,
    views: `${(12+i)*3}k`,
    author: "ProPoker Coach"
  }));
  return (
    <div className="grid gap-6">
      <HeroSlider/>
      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold">Trending</h2>
          <a href="/clips" className="text-sm underline underline-offset-4">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {mock.map(m=> <a key={m.id} href={`/video/${m.id}`}><ContentCard title={m.title} poster={m.poster} duration={m.duration} live={m.live} views={m.views} author={m.author}/></a>)}
        </div>
      </section>
    </div>
  );
}
'
write src/app/page.tsx

# 11) Preconnect hints (optional): document head via next.config is fine; we can add in _document if needed later

# 12) Design docs (for reference)
CONTENT='## DesignContract.md (applied)
- Palette mapped to Tailwind (poker.*) and CSS variables in globals.css
- Radii, shadows, motion timing/function added
- Components: Container, SkipLink, ContentCard, TopNav (pills), HeroSlider
- Layout wired to fonts (Manrope/Inter) via next/font
- Reduced-motion respected in HeroSlider; focus-visible rings themed
'
write DESIGN-CONTRACT-NOTES.md


echo "\nDone. Backups in $BACKUP_DIR if overwrites occurred. Restart dev server to see theme."
|