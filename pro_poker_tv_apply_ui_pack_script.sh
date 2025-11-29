#!/usr/bin/env bash
set -euo pipefail

# ProPokerTV — Apply UI Pack
# This script will write/overwrite UI files delivered in the UI Pack into your repo.
# Run from project root:  bash scripts/apply_ui_pack.sh

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup_ui_$TS"

# --- helpers ---------------------------------------------------------------
backup_if_exists(){
  local f="$1"
  if [ -e "$f" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$f")"
    mv "$f" "$BACKUP_DIR/$f"
    echo "  ↪ backed up $f → $BACKUP_DIR/$f"
  fi
}

write(){
  local path="$1"; shift
  mkdir -p "$(dirname "$path")"
  backup_if_exists "$path"
  cat > "$path" <<'EOF'
$CONTENT
EOF
  echo "  ✓ wrote $path"
}

append(){
  local path="$1"; shift
  mkdir -p "$(dirname "$path")"
  touch "$path"
  cat >> "$path" <<'EOF'
$CONTENT
EOF
  echo "  ➕ appended to $path"
}

# --- sanity checks ---------------------------------------------------------
if [ ! -d src ]; then
  echo "This does not look like the project root (missing src/). Abort." >&2
  exit 1
fi

mkdir -p scripts

# --- Files from the UI Pack -----------------------------------------------

# src/lib/ui/tokens.ts
CONTENT=$(cat <<'EOT'
export const tokens = {
  radius: { sm: '0.5rem', md: '1rem', lg: '1.25rem', xl: '1.5rem' },
  shadows: { card: '0 8px 24px rgba(0,0,0,0.08)', focus: '0 0 0 3px rgba(59, 130, 246, 0.5)' },
  layout: { max: '1200px' }
} as const
EOT
)
write src/lib/ui/tokens.ts

# src/components/SkipToContent.tsx
CONTENT=$(cat <<'EOT'
'use client'
export default function SkipToContent(){
  return (
    <a href="#main" className="sr-only focus:not-sr-only fixed left-4 top-4 z-[1000] rounded-md bg-black/80 px-3 py-2 text-white">Skip to content</a>
  )
}
EOT
)
write src/components/SkipToContent.tsx

# src/components/ThemeToggle.tsx
CONTENT=$(cat <<'EOT'
'use client'
import {useEffect, useState} from 'react'
export default function ThemeToggle(){
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(()=>{ setMounted(true); setDark(document.documentElement.classList.contains('dark')) },[])
  if(!mounted) return null
  return (
    <button aria-label={dark? 'Switch to light theme':'Switch to dark theme'} className="rounded-2xl border px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={()=>{ const root = document.documentElement; const next = !root.classList.contains('dark'); root.classList.toggle('dark', next); setDark(next) }}> {dark? '🌙' : '☀️'} </button>
  )
}
EOT
)
write src/components/ThemeToggle.tsx

# src/components/Navigation.tsx
CONTENT=$(cat <<'EOT'
'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect, useRef } from 'react'
const links = [
  {href:'/', label:'Home'},
  {href:'/live', label:'Live'},
  {href:'/clips', label:'Clips'},
  {href:'/strategy', label:'Strategy'},
  {href:'/community', label:'Community'},
]
export default function Navigation(){
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(()=>{ setOpen(false) }, [pathname])
  return (
    <header role="banner" className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/40">
      <nav aria-label="primary" className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <button ref={btnRef} aria-expanded={open} aria-controls="nav-drawer" className="md:hidden rounded-lg border px-2 py-1" onClick={()=>setOpen(v=>!v)}>☰<span className="sr-only">Menu</span></button>
          <Link href="/" className="font-semibold tracking-tight">ProPokerTV</Link>
        </div>
        <ul className="hidden md:flex items-center gap-2" role="menubar">
          {links.map(l => (
            <li role="none" key={l.href}>
              <Link role="menuitem" href={l.href} className={`rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${pathname===l.href? 'font-semibold underline-offset-4 underline':''}`}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/search" className="rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Search">🔎</Link>
          <Link href="/profile" className="rounded-xl px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Profile</Link>
          <ThemeToggle/>
        </div>
      </nav>
      <div id="nav-drawer" className={`md:hidden ${open? '':'hidden'}`}>
        <ul className="mx-4 mb-3 grid gap-2 rounded-2xl border p-3 shadow-md" role="menu">
          {links.map(l => (
            <li role="none" key={l.href}><Link role="menuitem" href={l.href} className="block rounded-xl px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">{l.label}</Link></li>
          ))}
        </ul>
      </div>
    </header>
  )
}
EOT
)
write src/components/Navigation.tsx

# src/components/VideoCard.tsx
CONTENT=$(cat <<'EOT'
'use client'
import Link from 'next/link'
import Image from 'next/image'
export type Video = { id: string; title: string; duration: number; thumbnail: string; category?: string; progress?: number }
function fmt(s:number){ const m = Math.floor(s/60), ss = s%60; return `${m}:${ss.toString().padStart(2,'0')}` }
export default function VideoCard({v}:{v:Video}){
  const p = Math.round((v.progress ?? 0)*100)
  return (
    <Link href={`/video/${v.id}`} className="group block rounded-2xl border overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
      <div className="relative">
        <Image src={v.thumbnail} alt="" width={480} height={270} className="aspect-video object-cover transition md:group-hover:scale-[1.02]"/>
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs text-white">{fmt(v.duration)}</span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium">{v.title}</h3>
          {p>0 && (<div aria-label={`Progress ${p}%`} className="text-xs">{p}%</div>)}
        </div>
        {v.category && <p className="mt-1 text-xs text-neutral-500">{v.category}</p>}
      </div>
    </Link>
  )
}
EOT
)
write src/components/VideoCard.tsx

# src/components/VideoGrid.tsx
CONTENT=$(cat <<'EOT'
'use client'
import VideoCard, {Video} from './VideoCard'
export default function VideoGrid({items}:{items:Video[]}){
  return (<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{items.map(v=> <VideoCard key={v.id} v={v}/>)}
  </div>)
}
EOT
)
write src/components/VideoGrid.tsx

# src/components/Hero.tsx
CONTENT=$(cat <<'EOT'
'use client'
import Link from 'next/link'
export default function Hero(){
  return (
    <section className="relative overflow-hidden rounded-2xl border p-6 md:p-10">
      <div className="max-w-xl">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Play of the Week</h1>
        <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-300">A short, elite hand breakdown selected by coaches — watch in under 5 minutes.</p>
        <div className="mt-4 flex gap-2">
          <Link href="/play-of-the-week" className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Watch now</Link>
          <Link href="/strategy" className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Explore strategy</Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-10 ring-8"/>
    </section>
  )
}
EOT
)
write src/components/Hero.tsx

# src/context/OnboardingContext.tsx
CONTENT=$(cat <<'EOT'
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
type Ctx = { done: boolean, complete: ()=>void }
const OnboardingCtx = createContext<Ctx|undefined>(undefined)
export function OnboardingProvider({children}:{children:React.ReactNode}){
  const [done, setDone] = useState(true)
  useEffect(()=>{ const v = localStorage.getItem('onboarding_done'); setDone(v==='1') },[])
  return (
    <OnboardingCtx.Provider value={{done, complete:()=>{ localStorage.setItem('onboarding_done','1'); setDone(true) }}}>
      {children}
    </OnboardingCtx.Provider>
  )
}
export function useOnboarding(){
  const ctx = useContext(OnboardingCtx)
  if(!ctx) throw new Error('useOnboarding must be used inside OnboardingProvider')
  return ctx
}
EOT
)
write src/context/OnboardingContext.tsx

# src/components/OnboardingTour.tsx
CONTENT=$(cat <<'EOT'
'use client'
import { useOnboarding } from '@/context/OnboardingContext'
import Link from 'next/link'
const steps = [
  {title:'Browse library', body:'Explore curated series and search thousands of hands.' , href:'/'},
  {title:'Play of the Week', body:'A 5‑min breakdown to stay sharp with minimal time.', href:'/play-of-the-week'},
  {title:'Search', body:'Find hands by stack depth, position, and format.', href:'/search'},
]
export default function OnboardingTour(){
  const {done, complete} = useOnboarding()
  if(done) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[2000] grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-4 shadow-xl dark:bg-neutral-900">
        <ol className="grid gap-3">
          {steps.map((s,i)=> (
            <li key={i} className="rounded-xl border p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{i+1}. {s.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{s.body}</p>
                </div>
                <Link href={s.href} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Go</Link>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex justify-end">
          <button onClick={complete} className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Got it</button>
        </div>
      </div>
    </div>
  )
}
EOT
)
write src/components/OnboardingTour.tsx

# src/app/layout.tsx (overwrite)
CONTENT=$(cat <<'EOT'
import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import SkipToContent from '@/components/SkipToContent'
import GlobalPageLoader from '@/components/GlobalPageLoader'
import { OnboardingProvider } from '@/context/OnboardingContext'
export const metadata: Metadata = { title: 'ProPokerTV', description: 'Elite poker video platform' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 antialiased dark:bg-black dark:text-white">
        <GlobalPageLoader/>
        <SkipToContent/>
        <OnboardingProvider>
          <Navigation/>
          <main id="main" className="mx-auto max-w-[1200px] px-4 py-6">{children}</main>
        </OnboardingProvider>
      </body>
    </html>
  )
}
EOT
)
write src/app/layout.tsx

# src/app/page.tsx
CONTENT=$(cat <<'EOT'
import Hero from '@/components/Hero'
import VideoGrid from '@/components/VideoGrid'
import OnboardingTour from '@/components/OnboardingTour'
const mock = Array.from({length:12}).map((_,i)=>({ id: String(i+1), title: `Exploitative 3‑bet SB vs BTN — Hand ${i+1}`, duration: 420 + i*7, thumbnail: `https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1200&q=60`, category: i%2? 'Cash (6‑max)' : 'MTT', progress: i%5===0? 0.42 : 0 }))
export default function Page(){
  return (
    <div className="grid gap-6">
      <OnboardingTour/>
      <Hero/>
      <section aria-labelledby="pow" className="grid gap-3">
        <h2 id="pow" className="text-lg font-semibold">Play of the Week</h2>
        <VideoGrid items={mock.slice(0,4)} />
      </section>
      <section aria-labelledby="new" className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 id="new" className="text-lg font-semibold">New Strategy</h2>
          <a href="/strategy" className="text-sm underline underline-offset-4">See all</a>
        </div>
        <VideoGrid items={mock.slice(4,12)} />
      </section>
    </div>
  )
}
EOT
)
write src/app/page.tsx

# src/app/login/page.tsx
CONTENT=$(cat <<'EOT'
'use client'
import { useState } from 'react'
export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <div className="mx-auto max-w-sm rounded-2xl border p-6">
      <h1 className="text-xl font-bold">Sign in</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">We’ll send a magic link to your inbox.</p>
      {!sent ? (
        <form className="mt-4 grid gap-3" onSubmit={(e)=>{ e.preventDefault(); setSent(true) }}>
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="rounded-xl border px-3 py-2"/>
          </label>
          <button className="rounded-xl border px-3 py-2 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Send magic link</button>
        </form>
      ) : (
        <p role="status" className="mt-4 text-sm">Check your email — the link expires in 10 minutes.</p>
      )}
    </div>
  )
}
EOT
)
write src/app/login/page.tsx

# src/app/video/[id]/page.tsx
CONTENT=$(cat <<'EOT'
import Image from 'next/image'
export default function VideoPage({params}:{params:{id:string}}){
  return (
    <article className="grid gap-4 lg:grid-cols-[1fr,360px]">
      <div className="rounded-2xl border">
        <Image src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=60" width={1280} height={720} alt="" className="aspect-video w-full rounded-2xl object-cover"/>
      </div>
      <aside className="grid gap-3">
        <div className="rounded-2xl border p-3">
          <h2 className="font-semibold">Next up</h2>
          <ul className="mt-2 space-y-2">{[1,2,3,4].map(i=> (<li key={i}><a className="block rounded-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800" href="#">BTN vs SB 3‑bet — Hand {i}</a></li>))}</ul>
        </div>
        <div className="rounded-2xl border p-3">
          <h2 className="font-semibold">Chapters</h2>
          <ol className="mt-2 list-decimal pl-4 text-sm"><li>Preflop context</li><li>Range rationale</li><li>Turn/river plans</li></ol>
        </div>
      </aside>
    </article>
  )
}
EOT
)
write src/app/video/[id]/page.tsx

# src/app/search/page.tsx
CONTENT=$(cat <<'EOT'
'use client'
import { useState } from 'react'
import VideoGrid from '@/components/VideoGrid'
export default function Search(){
  const [q,setQ] = useState('')
  const results:any[] = []
  return (
    <div className="grid gap-4">
      <form role="search" className="flex gap-2">
        <label className="sr-only" htmlFor="q">Search</label>
        <input id="q" value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g., SB vs BTN, 40bb, 3‑bet pot" className="flex-1 rounded-xl border px-3 py-2"/>
        <button className="rounded-xl border px-3 py-2">Search</button>
      </form>
      <VideoGrid items={results} />
    </div>
  )
}
EOT
)
write src/app/search/page.tsx

# src/app/profile/page.tsx
CONTENT=$(cat <<'EOT'
export default function Profile(){
  return (
    <section className="grid gap-4">
      <header>
        <h1 className="text-xl font-bold">Your profile</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Manage account and preferences.</p>
      </header>
      <div className="grid gap-3 rounded-2xl border p-4">
        <h2 className="font-semibold">Preferences</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Enable reduced motion</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Email me Play of the Week</label>
      </div>
    </section>
  )
}
EOT
)
write src/app/profile/page.tsx

# src/app/globals.css (append focus & motion)
CONTENT=$(cat <<'EOT'
:focus-visible{ outline: none }
:focus-visible{ box-shadow: 0 0 0 3px rgba(59,130,246,.6); border-radius: .75rem }
@media (prefers-reduced-motion: reduce){ *{ animation: none !important; transition: none !important } }
EOT
)
append src/app/globals.css

# src/components/GlobalPageLoader.tsx
CONTENT=$(cat <<'EOT'
'use client'
import { useEffect, useState } from 'react'
export default function GlobalPageLoader(){
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const start = ()=> setLoading(true)
    const stop = ()=> setLoading(false)
    window.addEventListener('routeChangeStart', start as any)
    window.addEventListener('routeChangeComplete', stop as any)
    window.addEventListener('routeChangeError', stop as any)
    return ()=>{
      window.removeEventListener('routeChangeStart', start as any)
      window.removeEventListener('routeChangeComplete', stop as any)
      window.removeEventListener('routeChangeError', stop as any)
    }
  },[])
  if(!loading) return null
  return (
    <div aria-live="polite" className="fixed inset-x-0 top-0 z-[1000]">
      <div className="mx-auto h-1 max-w-[1200px] animate-pulse rounded-full bg-blue-500"/>
    </div>
  )
}
EOT
)
write src/components/GlobalPageLoader.tsx

# README-UI-NOTES.md
CONTENT=$(cat <<'EOT'
# ProPokerTV UI Notes
- Landmarks: header/nav/main applied; Skip link is visible on focus.
- Keyboard: Nav supports Tab/Enter; drawer announces state via aria-expanded.
- A11y: thumbnails use empty alt (decorative) with titled context; ensure player captions.
- Theming: ThemeToggle toggles root `.dark` class.
- Onboarding: localStorage for now; migrate to server flag post-auth.
- Replace mock data with API calls once Prisma models are in.
EOT
)
write README-UI-NOTES.md

# --- finish ---------------------------------------------------------------

echo "\nDone. Backups stored in $BACKUP_DIR (if any files existed)."
echo "Next: pnpm dev (or npm/yarn) and visit http://localhost:3000"
