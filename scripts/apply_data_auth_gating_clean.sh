#!/usr/bin/env bash
set -euo pipefail

# ProPokerTV — Patch Data + Auth Gating (CLEAN, no-expansion)
# - Home pulls data from /api/videos (server component)
# - /video/[id] protected by NextAuth; redirects to /login with callback
# - /login page with magic-link email sign-in
# - URL helper for absolute fetch in server components
# - Optional next.config.js images remotePatterns (Unsplash)
#
# Usage:
#   bash scripts/apply_data_auth_gating_clean.sh

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup_data_auth_$TS"
need_root(){ [ -d src ] || { echo "Run from project root (missing src/)." >&2; exit 1; } }
backup(){ local f="$1"; [ -e "$f" ] || return 0; mkdir -p "$BACKUP_DIR/$(dirname "$f")"; mv "$f" "$BACKUP_DIR/$f"; echo "  ↪ backup $f"; }
write(){ local p="$1"; shift; mkdir -p "$(dirname "$p")"; backup "$p"; cat > "$p"; echo "  ✓ wrote $p"; }
need_root

# ---------------------------------------------------------------------------
# 1) URL helper: build absolute URL in server components from headers
write src/lib/url.ts <<'EOF'
import { headers } from 'next/headers'
export function absolute(path: string){
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
  const proto = (h.get('x-forwarded-proto') || 'http') + '://'
  return path.startsWith('http') ? path : proto + host + (path.startsWith('/') ? path : '/' + path)
}
EOF

# ---------------------------------------------------------------------------
# 2) Home page: fetch videos from API (no cache), show skeleton when empty
write src/app/page.tsx <<'EOF'
import { absolute } from '@/lib/url'
import { ContentCard } from '@/components/ContentCard'

async function getVideos(){
  const res = await fetch(absolute('/api/videos'), { cache: 'no-store' })
  if(!res.ok) return []
  return res.json()
}

export default async function Page(){
  const items: any[] = await getVideos()
  return (
    <div className="grid gap-6">
      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-semibold">Trending</h2>
          <a href="/clips" className="text-sm underline underline-offset-4">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.length === 0 && Array.from({length:8}).map((_,i)=> (
            <div key={i} className="rounded-2xl border border-brand bg-[--color-secondary] aspect-video"/>
          ))}
          {items.map((v:any)=> (
            <a key={v.id} href={`/video/${v.id}`}>
              <ContentCard kind={v.vendor==='mux'?'video':'video'} title={v.title} poster={v.thumbnail} duration={`${Math.floor(v.durationSec/60)}:${String(v.durationSec%60).padStart(2,'0')}`} views="" author=""/>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
EOF

# ---------------------------------------------------------------------------
# 3) Protected Video page: requires session, else redirect to login
write src/app/video/[id]/page.tsx <<'EOF'
import { PrismaClient } from '@prisma/client'
import Player from '@/components/Player'
import { session } from '@/lib/auth'
import { redirect } from 'next/navigation'

const db = new PrismaClient()

export default async function VideoPage({params}:{params:{id:string}}){
  const s = await session()
  if(!s){
    const cb = encodeURIComponent(`/video/${params.id}`)
    redirect(`/login?callbackUrl=${cb}`)
  }
  const v = await db.video.findUnique({ where: { id: params.id } })
  if(!v) return <div className="rounded-2xl border p-6">Not found</div>
  return (
    <article className="grid gap-4 lg:grid-cols-[1fr,360px]">
      <div className="rounded-2xl border p-2">
        <Player vendor={v.vendor as any} playbackId={v.playbackId} />
      </div>
      <aside className="grid gap-3">
        <div className="rounded-2xl border p-3"><h2 className="font-semibold">{v.title}</h2></div>
      </aside>
    </article>
  )
}
EOF

# ---------------------------------------------------------------------------
# 4) Login page: magic link email sign-in via NextAuth
write src/app/login/page.tsx <<'EOF'
'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Login(){
  const sp = useSearchParams()
  const callbackUrl = sp.get('callbackUrl') || '/'
  const [email,setEmail] = useState('')
  const [sent,setSent] = useState(false)
  async function submit(e:React.FormEvent){ e.preventDefault(); await signIn('email', { email, callbackUrl }); setSent(true) }
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-brand p-6 bg-[--color-secondary]">
      <h1 className="text-xl font-display mb-2">Sign in</h1>
      <p className="text-sm text-[--color-text-secondary] mb-4">We will send you a magic link to sign in.</p>
      <form onSubmit={submit} className="grid gap-3">
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="rounded-xl border border-brand bg-transparent px-3 py-2"/>
        <button className="rounded-2xl bg-[--color-accent-gold] text-black px-4 py-2 font-medium">Send magic link</button>
      </form>
      {sent && <p className="mt-3 text-sm">Check your email for a sign-in link.</p>}
    </div>
  )
}
EOF

# ---------------------------------------------------------------------------
# 5) next.config.js: allow Unsplash images (if file exists, we merge minimally)
if [ -f next.config.js ]; then
  backup next.config.js
  cat > next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'videodelivery.net' },
      { protocol: 'https', hostname: 'stream.mux.com' },
    ],
  },
}
module.exports = nextConfig
EOF
fi

# ---------------------------------------------------------------------------
# 6) README note for acceptance checks
write DATA_AUTH_NOTES.md <<'EOF'
## Data + Auth Gating Patch
- Home fetches `/api/videos` (no-store) and renders cards
- `/video/[id]` requires session; unauthenticated users are redirected to `/login?callbackUrl=/video/[id]`
- `/login` page sends magic link using NextAuth Email provider
- Absolute URL helper ensures server component fetch works behind proxies

### Acceptance
- Visiting `/video/<existing-id>` while logged out shows login; after link → returns to the video
- Home shows seeded videos; if empty, shows skeleton cards
EOF

echo "\nDone. Data + Auth Gating (CLEAN) applied. Backups in $BACKUP_DIR."
