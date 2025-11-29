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
