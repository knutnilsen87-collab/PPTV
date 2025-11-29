import Image from 'next/image'
export type CardKind = 'video'|'live'|'lesson'
export function ContentCard({ kind='video', title, poster, duration, views, avatar, author }:{ kind?:CardKind; title:string; poster:string; duration?:string; views?:string; avatar?:string; author?:string; }){
  const live = kind === 'live'
  return (
    <article role='article' className='group rounded-2xl overflow-hidden bg-[--color-secondary] border border-brand hover:shadow-elevate hover:shadow-[0_0_20px_rgba(255,209,102,.3)] transition duration-200 ease-luxe'>
      <div className='relative'>
        <Image src={poster} alt='' width={640} height={360} className='aspect-video w-full object-cover' />
        {live && <span className='absolute top-3 left-3 bg-[--color-royal-red] text-white text-xs px-2 py-1 rounded-full'>LIVE</span>}
        {duration && <span className='absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md'>{duration}</span>}
      </div>
      <div className='p-3 flex gap-3'>
        {avatar && <Image src={avatar} alt='' width={36} height={36} className='h-9 w-9 rounded-full'/>}
        <div>
          <h3 className='text-sm font-semibold leading-tight line-clamp-2'>{title}</h3>
          {(author||views) && <p className='text-xs text-[--color-text-secondary]'>{author}{author&&views? ' • ' : ''}{views}</p>}
        </div>
      </div>
    </article>
  )
}
