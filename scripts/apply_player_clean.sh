#!/usr/bin/env bash
set -euo pipefail

# ProPokerTV — Apply Video Player (HLS) — CLEAN (no expansion)
# - Adds Player component that supports Mux or Cloudflare Stream (HLS)
# - Uses native <video> + hls.js for MSE browsers; falls back to native HLS (Safari)
# - Captions track support (optional), muted autoplay preview-capable props
# - Lightweight progress ping hook (POST /api/progress) if endpoint exists
#
# Usage:
#   bash scripts/apply_player_clean.sh

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup_player_$TS"
need_root(){ [ -d src ] || { echo "Run from project root (missing src/)." >&2; exit 1; } }
backup(){ local f="$1"; [ -e "$f" ] || return 0; mkdir -p "$BACKUP_DIR/$(dirname "$f")"; mv "$f" "$BACKUP_DIR/$f"; echo "  ↪ backup $f"; }
write(){ local p="$1"; shift; mkdir -p "$(dirname "$p")"; backup "$p"; cat > "$p"; echo "  ✓ wrote $p"; }
need_root

# 1) Player component
write src/components/Player.tsx <<'EOF'
'use client'
import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

type Vendor = 'mux' | 'cloudflare'
export default function Player({ vendor, playbackId, autoPlay = false, startAt = 0, captions }: { vendor: Vendor; playbackId: string; autoPlay?: boolean; startAt?: number; captions?: { src: string; srclang: string; label: string }[] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [ready,setReady] = useState(false)

  // Build HLS URL by vendor
  function hlsUrl(){
    if (vendor === 'mux') return `https://stream.mux.com/${playbackId}.m3u8`
    // cloudflare stream uid
    return `https://videodelivery.net/${playbackId}/manifest/video.m3u8`
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const url = hlsUrl()

    // Native HLS (Safari)
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
      video.addEventListener('loadedmetadata', () => {
        if (startAt > 0) video.currentTime = startAt
        setReady(true)
        if (autoPlay) video.play().catch(()=>{})
      }, { once: true })
      return
    }

    // MSE via hls.js
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true })
      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(url)
      })
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (startAt > 0) video.currentTime = startAt
        setReady(true)
        if (autoPlay) video.play().catch(()=>{})
      })
      return () => { hls.destroy() }
    }

    // Fallback: give the user a link
    setReady(false)
  }, [vendor, playbackId, autoPlay, startAt])

  // Optional: progress ping each 5s (if API exists)
  useEffect(() => {
    const video = videoRef.current
    let t: any
    function tick(){
      if (!video) return
      const body = { position: Math.floor(video.currentTime), videoId: playbackId }
      fetch('/api/progress', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(()=>{})
    }
    if (video) t = setInterval(tick, 5000)
    return () => { if (t) clearInterval(t) }
  }, [playbackId])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-brand bg-black">
      <video ref={videoRef} className="h-full w-full" controls playsInline muted={!autoPlay} preload="metadata">
        {captions?.map((c, i) => (
          <track key={i} src={c.src} kind="subtitles" srcLang={c.srclang} label={c.label} default={i===0} />
        ))}
      </video>
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-[--color-text-secondary]">
          Loading stream…
        </div>
      )}
    </div>
  )
}
EOF

# 2) Minimal types helper (optional future use)
write src/types/video.ts <<'EOF'
export type Vendor = 'mux' | 'cloudflare'
export type VideoItem = { id: string; title: string; durationSec: number; thumbnail: string; vendor: Vendor; playbackId: string }
EOF

# 3) Notes
write PLAYER_NOTES.md <<'EOF'
## Player component
- Props: `{ vendor: 'mux'|'cloudflare', playbackId: string, autoPlay?: boolean, startAt?: number, captions?: [] }`
- HLS URL:
  - Mux: `https://stream.mux.com/<playbackId>.m3u8`
  - Cloudflare Stream: `https://videodelivery.net/<uid>/manifest/video.m3u8`
- Captions: pass VTT URLs via `captions` prop; first track is `default`.
- Progress pings to `/api/progress` if route exists (ignored otherwise).

### Install dependency
Run once in your project:

```
npm install hls.js
```

### Acceptance
- A video with a valid playbackId plays in Chrome + Safari.
- Autoplay preview works when `autoPlay` is true and the element is muted.
- First captions track is on by default; can be toggled in native UI.
EOF

echo "\nDone. Player (HLS) applied. Backups in $BACKUP_DIR. Remember: npm install hls.js"
