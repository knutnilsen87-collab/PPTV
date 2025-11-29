#!/usr/bin/env bash
set -euo pipefail

# ProPokerTV — Apply Front-End Layout & Brand Guide (CLEAN no-expansion)
# Writes theme tokens, Tailwind config, and UI components without using any
# shell variables inside file content. Every file is written via single-quoted
# heredocs to avoid ${...} expansion. Existing files are backed up.
#
# Usage (from project root that contains src/):
#   bash scripts/apply_frontend_guide_clean.sh

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup_frontend_clean_$TS"

need_root(){ [ -d src ] || { echo "Run from the project root (missing src/)." >&2; exit 1; } }
backup(){ local f="$1"; [ -e "$f" ] || return 0; mkdir -p "$BACKUP_DIR/$(dirname "$f")"; mv "$f" "$BACKUP_DIR/$f"; echo "  ↪ backup $f"; }
write(){ local p="$1"; shift; mkdir -p "$(dirname "$p")"; backup "$p"; cat > "$p"; echo "  ✓ wrote $p"; }

need_root

# --- Tailwind config (ts preferred) -----------------------------------------
TWCFG="tailwind.config.ts"; [ -f tailwind.config.js ] && TWCFG="tailwind.config.js"
write "$TWCFG" <<'EOF'
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}','./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        poker: {
          primary:  '#0B0E13',
          secondary:'#111C2D',
          accent:   '#FFD166',
          deepgold: '#CFAE58',
          emerald:  '#00ECC3',
          royal:    '#F4355E',
          text:     '#EDEDEF',
          muted:    '#A6A7AD',
          border:   '#2A2B31',
        }
      },
      borderRadius: { lg: '12px', xl: '16px' },
      boxShadow: { elevate: '0 8px 24px rgba(0,0,0,.35)', glowGold: '0 0 20px rgba(255,209,102,.3)', glowEmerald:'0 0 24px rgba(0,255,198,.18)' },
      transitionDuration: { 120:'120ms', 200:'200ms', 320:'320ms' },
      transitionTimingFunction: { luxe: 'cubic-bezier(.22,.61,.36,1)' },
      container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1440px' } },
      fontFamily: {
        display: ['var(--font-manrope)', 'ui-sans-serif'],
        body:    ['var(--font-inter)', 'ui-sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
EOF

# --- globals.css (overwrite with clean base) -------------------------------
write src/app/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== Neo-Luxe brand tokens ===== */
:root{
  --color-primary:#0B0E13; --color-secondary:#111C2D;
  --color-accent-gold:#FFD166; --color-deep-gold:#CFAE58;
  --color-emerald-green:#00ECC3; --color-royal-red:#F4355E;
  --color-text-primary:#EDEDEF; --color-text-secondary:#A6A7AD;
  --color-border:#2A2B31;
}
:root{ color-scheme: dark }
html{ background:var(--color-primary); color:var(--color-text-primary) }

/* Motion */
:root{ --dur-1:120ms; --dur-2:200ms; --dur-3:320ms; --ease-luxe:cubic-bezier(.22,.61,.36,1) }
@media (prefers-reduced-motion: reduce){ *{ animation:none !important; transition:none !important } }

/* Focus rings */
:focus-visible{ outline:none }
:focus-visible{ box-shadow:0 0 0 3px var(--color-emerald-green); border-radius:12px }

/* Helpers */
.card{ background:var(--color-secondary); border:1px solid var(--color-border); border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,.35) }
.border-brand{ border-color: var(--color-border) }
.glass{ background: rgba(17,28,45,.95); backdrop-filter: blur(8px) }
EOF

# --- fonts.ts --------------------------------------------------------------
write src/app/fonts.ts <<'EOF'
import { Inter, Manrope } from 'next/font/google'
export const inter = Inter({ subsets:['latin'], variable:'--font-inter', display:'swap', weight:['400','500','600'] })
export const manrope = Manrope({ subsets:['latin'], variable:'--font-manrope', display:'swap', weight:['700'] })
EOF

# --- components ------------------------------------------------------------
write src/components/Container.tsx <<'EOF'
import React from 'react'
export default function Container({ children, className = '' }:{children:React.ReactNode, className?:string}){
  return <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
EOF

write src/components/SiteFooter.tsx <<'EOF'
import Container from './Container'
export default function SiteFooter(){
  return (
    <footer className='mt-10 border-t border-brand/50 text-sm text-poker-muted'>
      <Container className='py-6 grid gap-3 sm:flex sm:items-center sm:justify-between'>
        <nav className='flex gap-4'><a href='/about'>About</a><a href='/privacy'>Privacy</a><a href='/terms'>Terms</a></nav>
        <p>© {new Date().getFullYear()} ProPokerTV</p>
      </Container>
    </footer>
  )
}
EOF

write src/components/ThemeToggle.tsx <<'EOF'
'use client'
import { useEffect, useState } from 'react'

type Mode = 'light'|'dark'|'system'
export default function ThemeToggle(){
  const [mode, setMode] = useState<Mode>('system')
  useEffect(()=>{ const m = (localStorage.getItem('theme') as Mode) || 'system'; setMode(m); apply(m) },[])
  function apply(m:Mode){ const root = document.documentElement; const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const dark = m==='dark' || (m==='system' && prefersDark); root.classList.toggle('dark', dark) }
  function set(m:Mode){ localStorage.setItem('theme', m); setMode(m); apply(m) }
  return (
    <div className='relative'>
      <button aria-haspopup='true' className='rounded-2xl border border-brand px-3 py-1.5 text-sm'>Theme: {mode}</button>
      <div className='mt-2 flex gap-2'>
        <button onClick={()=>set('light')} className='rounded-xl border px-2 py-1 text-xs'>Light</button>
        <button onClick={()=>set('dark')} className='rounded-xl border px-2 py-1 text-xs'>Dark</button>
        <button onClick={()=>set('system')} className='rounded-xl border px-2 py-1 text-xs'>System</button>
      </div>
    </div>
  )
}
EOF

write src/components/TopNav.tsx <<'EOF'
'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Container from './Container'

export default function TopNav(){
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false) }; document.addEventListener('keydown', onKey); return ()=>document.removeEventListener('keydown', onKey) },[])
  useEffect(()=>{ const onClick=(e:MouseEvent)=>{ if(open && menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener('click', onClick); return ()=>document.removeEventListener('click', onClick) },[open])
  return (
    <header className='sticky top-0 z-50 glass border-b border-brand/50'>
      <Container className='h-16 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='font-display text-lg'>ProPokerTV</Link>
          <div className='relative' ref={menuRef}>
            <button aria-haspopup='true' aria-expanded={open} onClick={()=>setOpen(v=>!v)} className='rounded-2xl border border-brand px-3 py-1.5 text-sm'>Explore ▾</button>
            {open && (
              <div role='menu' className='absolute left-0 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl border border-brand bg-[--color-secondary] p-3 shadow-elevate'>
                <div className='min-w-[180px]'><p className='text-xs text-poker-muted mb-1'>Topics</p><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>Cash</a><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>MTT</a><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>Short Deck</a></div>
                <div className='min-w-[220px]'><p className='text-xs text-poker-muted mb-1'>Live now</p><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>High Stakes</a><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>Creator League</a></div>
                <div className='min-w-[220px]'><p className='text-xs text-poker-muted mb-1'>Upcoming</p><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>Sunday Million</a><a className='block rounded-xl px-3 py-2 hover:bg-white/5' href='#'>EPT Prague</a></div>
              </div>
            )}
          </div>
          <Link className='rounded-2xl border border-brand px-3 py-1.5 text-sm' href='/live'>Live</Link>
          <Link className='rounded-2xl border border-brand px-3 py-1.5 text-sm' href='/clips'>Clips</Link>
          <Link className='rounded-2xl border border-brand px-3 py-1.5 text-sm' href='/calendar'>Calendar</Link>
          <Link className='rounded-2xl border border-brand px-3 py-1.5 text-sm' href='/community'>Community</Link>
        </div>
        <div className='flex items-center gap-2'>
          <Link href='/search' className='rounded-2xl border border-brand px-3 py-1.5 text-sm'>Search</Link>
          <Link href='/profile' className='rounded-2xl bg-[--color-accent-gold] text-black px-3 py-1.5 text-sm hover:brightness-110 transition'>Profile</Link>
          <ThemeToggle/>
        </div>
      </Container>
    </header>
  )
}
EOF

write src/components/HeroSlider.tsx <<'EOF'
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DURATION = 6000
export default function HeroSlider(){
  const slides = useMemo(()=>[
    { id:1, title:'WSOP Highlights', img:'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1600&q=60' },
    { id:2, title:'High Stakes Cash', img:'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=60' },
    { id:3, title:'EPT Final Table', img:'https://images.unsplash.com/photo-1520975867597-0f51bc2a1061?auto=format&fit=crop&w=1600&q=60' },
  ],[])
  const [i,setI] = useState(0); const reduced = useRef(false)
  useEffect(()=>{ reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches })
  useEffect(()=>{ if(reduced.current) return; const t = setInterval(()=> setI(v => (v+1)%slides.length), DURATION); return ()=>clearInterval(t) },[slides.length])
  return (
    <section className='relative overflow-hidden rounded-xl border border-brand'>
      <div className='relative'>
        <Image src={slides[i].img} alt='' width={1600} height={900} className='aspect-video w-full object-cover'/>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'/>
        <div className='absolute inset-x-0 bottom-0 p-6'>
          <h1 className='font-display text-2xl md:text-4xl font-bold'>{slides[i].title}</h1>
          <div className='mt-3 flex gap-2'>
            <Link href='/live' className='rounded-2xl bg-gradient-to-r from-[--color-accent-gold] to-[--color-deep-gold] text-black px-4 py-2 font-medium'>Watch live</Link>
            <Link href='/clips' className='rounded-2xl border border-brand px-4 py-2 hover:shadow-[0_0_24px_rgba(0,255,198,.18)]'>Highlights</Link>
          </div>
        </div>
      </div>
      <div className='absolute right-4 top-4 flex gap-2'>
        {slides.map((s,idx)=> (
          <button key={s.id} aria-label={`Slide ${idx+1}: ${s.title}`} onClick={()=>setI(idx)} className={`h-2 w-6 rounded-full ${i===idx? 'bg-[--color-emerald-green]':'bg-white/30'}`}/>
        ))}
      </div>
    </section>
  )
}
EOF

write src/components/ContentCard.tsx <<'EOF'
import Image from 'next/image'
export type CardKind = 'video'|'live'|'lesson'
export function ContentCard({ kind='video', title, poster, duration, views, avatar, author }:{ kind?:CardKind; title:string; poster:string; duration?:string; views?:string; avatar?:string; author?:string; }){
  const live = kind === 'live'
  return (
    <article role='article' className='group rounded-2xl overflow-hidden bg-[--color-secondary] border border-brand hover:shadow-elevate hover:shadow-[0_0_20px_rgba(255,209,102,.3)] transition duration-200 ease-luxe'>
      <div className='relative'>
        <Image src={poster} alt='' width={640} height={360} className='aspect-video w-full object-cover' />
        {live && <span className='absolute top-3 left-3 bg-[--color-royal-red] text-white text-xs px-2 py-1 rounded-full'>LIVE</span>}
        {duration && <span className='absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md'>{duration}</span>}
      </div>
      <div className='p-3 flex gap-3'>
        {avatar && <Image src={avatar} alt='' width={36} height={36} className='h-9 w-9 rounded-full'/>}
        <div>
          <h3 className='text-sm font-semibold leading-tight line-clamp-2'>{title}</h3>
          {(author||views) && <p className='text-xs text-[--color-text-secondary]'>{author}{author&&views? ' • ' : ''}{views}</p>}
        </div>
      </div>
    </article>
  )
}
EOF

write src/app/search/page.tsx <<'EOF'
'use client'
import { useEffect, useRef, useState } from 'react'
import { ContentCard } from '@/components/ContentCard'
export default function Search(){
  const [q,setQ] = useState('')
  const [results,setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{ if(e.key === '/') { e.preventDefault(); inputRef.current?.focus() } }; window.addEventListener('keydown', onKey); return ()=>window.removeEventListener('keydown', onKey) },[])
  async function run(e?:any){ e?.preventDefault(); const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`); setResults(await res.json()) }
  return (
    <div className='grid gap-4'>
      <form role='search' onSubmit={run} className='flex gap-2'>
        <label htmlFor='q' className='sr-only'>Search videos</label>
        <input id='q' ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder='Search videos (press / to focus)' className='flex-1 rounded-xl border border-brand bg-[--color-secondary] px-3 py-2'/>
        <button className='rounded-xl border border-brand px-3 py-2'>Search</button>
      </form>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {results.map(r=> (<a key={r.id} href={`/video/${r.id}`}><ContentCard title={r.title} poster={r.thumbnail} duration={`${Math.floor(r.durationSec/60)}:${String(r.durationSec%60).padStart(2,'0')}`} views='' author=''/></a>))}
      </div>
    </div>
  )
}
EOF

write src/components/ToastProvider.tsx <<'EOF'
'use client'
import { createContext, useContext, useState } from 'react'

type Toast = { id: string; text: string }
const Ctx = createContext<{toasts:Toast[], push:(t:string)=>void, remove:(id:string)=>void}|null>(null)
export function ToastProvider({children}:{children:React.ReactNode}){
  const [toasts,set] = useState<Toast[]>([])
  function push(text:string){ const id = Math.random().toString(36).slice(2); set(t=>[...t,{id,text}]); setTimeout(()=>remove(id), 4000) }
  function remove(id:string){ set(t=>t.filter(x=>x.id!==id)) }
  return (
    <Ctx.Provider value={{toasts:toasts, push, remove}}>
      {children}
      <div aria-live='polite' className='fixed right-4 top-4 z-[2000] grid gap-2'>
        {toasts.map(t=> (<div key={t.id} className='rounded-xl border border-brand bg-[--color-secondary] px-3 py-2 shadow-elevate'>{t.text}</div>))}
      </div>
    </Ctx.Provider>
  )
}
export function useToast(){ const c = useContext(Ctx); if(!c) throw new Error('useToast outside provider'); return c }
EOF

write src/components/Skeleton.tsx <<'EOF'
export function Skeleton({ className='' }:{className?:string}){ return <div className={`animate-pulse bg-white/10 ${className}`} /> }
export function PosterSkeleton(){ return <div className='aspect-video w-full rounded-xl bg-white/10'/> }
export function Spinner(){ return <div className='h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-[--color-emerald-green]'/> }
EOF

write src/components/ChatDock.tsx <<'EOF'
'use client'
import { useState } from 'react'
export default function ChatDock(){
  const [open, setOpen] = useState(false)
  return (
    <aside className={`fixed bottom-4 right-4 z-40 ${open? 'w-80' : 'w-14'} rounded-xl border border-brand bg-[--color-secondary] overflow-hidden transition-[width] duration-200 ease-luxe`}>
      <button onClick={()=>setOpen(v=>!v)} className='w-14 h-14'>💬<span className='sr-only'>Toggle chat</span></button>
      {open && (
        <div className='grid max-h-[60vh] grid-rows-[auto,1fr,auto]'>
          <div className='border-b border-brand p-2 text-sm'>Community Chat</div>
          <div role='log' aria-live='polite' className='p-2 overflow-auto text-sm space-y-1'>{/* messages */}</div>
          <form className='flex gap-2 p-2'>
            <input className='flex-1 rounded-lg border border-brand bg-transparent px-2 py-1 text-sm' placeholder='Message'/>
            <button className='rounded-lg border border-brand px-2 py-1 text-sm'>Send</button>
          </form>
        </div>
      )}
    </aside>
  )
}
EOF

# --- layout & home ---------------------------------------------------------
write src/app/layout.tsx <<'EOF'
import type { Metadata } from 'next'
import './globals.css'
import { inter, manrope } from './fonts'
import TopNav from '@/components/TopNav'
import SiteFooter from '@/components/SiteFooter'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = { title: 'ProPokerTV', description: 'Elite poker video platform' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className='bg-poker-primary text-poker-text antialiased'>
        <ToastProvider>
          <TopNav/>
          <main id='main' className='py-6'>{children}</main>
          <SiteFooter/>
        </ToastProvider>
      </body>
    </html>
  )
}
EOF

write src/app/page.tsx <<'EOF'
import HeroSlider from '@/components/HeroSlider'
import { ContentCard } from '@/components/ContentCard'
export default function Page(){
  const mock = Array.from({length:8}).map((_,i)=>({ id:i+1, title:`Exploitative 3‑bet SB vs BTN — Hand ${i+1}`, poster:'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1600&q=60', duration:`${7+i}:${String((10+i)%60).padStart(2,'0')}`, views:`${(12+i)*3}k`, author:'ProPoker Coach', kind: i===0? 'live':'video' }))
  return (
    <div className='grid gap-6'>
      <HeroSlider/>
      <section className='grid gap-3'>
        <div className='flex items-center justify-between'><h2 className='text-lg font-display font-semibold'>Trending</h2><a href='/clips' className='text-sm underline underline-offset-4'>See all</a></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
          {mock.map(m=> <a key={m.id} href={`/video/${m.id}`}><ContentCard kind={m.kind as any} title={m.title} poster={m.poster} duration={m.duration} views={m.views} author={m.author}/></a>)}
        </div>
      </section>
    </div>
  )
}
EOF

echo "\nDone. CLEAN apply completed. Backups in $BACKUP_DIR (if any)."
