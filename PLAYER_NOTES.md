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
