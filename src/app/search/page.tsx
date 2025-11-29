'use client'
import { useEffect, useRef, useState } from 'react'
import { ContentCard } from '@/components/ContentCard'
export default function Search(){
  const [q,setQ] = useState('')
  const [results,setResults] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{ if(e.key === '/') { e.preventDefault(); inputRef.current?.focus() } }; window.addEventListener('keydown', onKey); return ()=>window.removeEventListener('keydown', onKey) },[])
  async function run(e?:any){ e?.preventDefault(); const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`); setResults(await res.json()) }
  return (
    <div className='grid gap-4'>
      <form role='search' onSubmit={run} className='flex gap-2'>
        <label htmlFor='q' className='sr-only'>Search videos</label>
        <input id='q' ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder='Search videos (press / to focus)' className='flex-1 rounded-xl border border-brand bg-[--color-secondary] px-3 py-2'/>
        <button className='rounded-xl border border-brand px-3 py-2'>Search</button>
      </form>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {results.map(r=> (<a key={r.id} href={`/video/${r.id}`}><ContentCard title={r.title} poster={r.thumbnail} duration={`${Math.floor(r.durationSec/60)}:${String(r.durationSec%60).padStart(2,'0')}`} views='' author=''/></a>))}
      </div>
    </div>
  )
}
