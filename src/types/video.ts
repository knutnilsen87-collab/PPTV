export type Vendor = 'mux' | 'cloudflare'
export type VideoItem = { id: string; title: string; durationSec: number; thumbnail: string; vendor: Vendor; playbackId: string }
