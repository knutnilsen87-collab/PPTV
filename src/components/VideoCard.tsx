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
