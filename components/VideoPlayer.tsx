"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

type Props = {
  src: string;           // .m3u8 or mp4
  poster?: string;
  captions?: { src: string; srclang: string; label: string; default?: boolean }[];
};

export default function VideoPlayer({ src, poster, captions = [] }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const video = videoRef.current!;
    if (!video) return;

    if (Hls.isSupported() && src.endsWith(".m3u8")) {
      const hls = new Hls({ maxBufferLength: 20 });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native
      video.src = src;
    } else {
      setSupported(false);
    }
  }, [src]);

  return (
    <figure className="w-full rounded-card overflow-hidden bg-surface-card shadow-e1">
      <video ref={videoRef} controls preload="metadata" poster={poster} className="w-full h-auto">
        {!src.endsWith(".m3u8") && <source src={src} />}
        {captions.map((c, i) => (
          <track key={i} src={c.src} kind="subtitles" srcLang={c.srclang} label={c.label} default={c.default} />
        ))}
      </video>
      {!supported && (
        <figcaption className="p-3 text-sm text-textc-secondary">
          Unable to play stream. Download: <a className="underline" href={src}>video</a>
        </figcaption>
      )}
    </figure>
  );
}