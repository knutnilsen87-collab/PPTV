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
