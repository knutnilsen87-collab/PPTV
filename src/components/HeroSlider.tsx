'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DURATION = 6000
export default function HeroSlider(){
  const slides = useMemo(()=>[
    { id:1, title:'WSOP Highlights', img:'https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1600&q=60' },
    { id:2, title:'High Stakes Cash', img:'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=60' },
    { id:3, title:'EPT Final Table', img:'https://images.unsplash.com/photo-1520975867597-0f51bc2a1061?auto=format&fit=crop&w=1600&q=60' },
  ],[])
  const [i,setI] = useState(0); const reduced = useRef(false)
  useEffect(()=>{ reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches })
  useEffect(()=>{ if(reduced.current) return; const t = setInterval(()=> setI(v => (v+1)%slides.length), DURATION); return ()=>clearInterval(t) },[slides.length])
  return (
    <section className='relative overflow-hidden rounded-xl border border-brand'>
      <div className='relative'>
        <Image src={slides[i].img} alt='' width={1600} height={900} className='aspect-video w-full object-cover'/>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'/>
        <div className='absolute inset-x-0 bottom-0 p-6'>
          <h1 className='font-display text-2xl md:text-4xl font-bold'>{slides[i].title}</h1>
          <div className='mt-3 flex gap-2'>
            <Link href='/live' className='rounded-2xl bg-gradient-to-r from-[--color-accent-gold] to-[--color-deep-gold] text-black px-4 py-2 font-medium'>Watch live</Link>
            <Link href='/clips' className='rounded-2xl border border-brand px-4 py-2 hover:shadow-[0_0_24px_rgba(0,255,198,.18)]'>Highlights</Link>
          </div>
        </div>
      </div>
      <div className='absolute right-4 top-4 flex gap-2'>
        {slides.map((s,idx)=> (
          <button key={s.id} aria-label={`Slide ${idx+1}: ${s.title}`} onClick={()=>setI(idx)} className={`h-2 w-6 rounded-full ${i===idx? 'bg-[--color-emerald-green]':'bg-white/30'}`}/>
        ))}
      </div>
    </section>
  )
}
