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
