'use client'
import { useEffect, useState } from 'react'

type Mode = 'light'|'dark'|'system'
export default function ThemeToggle(){
  const [mode, setMode] = useState<Mode>('system')
  useEffect(()=>{ const m = (localStorage.getItem('theme') as Mode) || 'system'; setMode(m); apply(m) },[])
  function apply(m:Mode){ const root = document.documentElement; const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const dark = m==='dark' || (m==='system' && prefersDark); root.classList.toggle('dark', dark) }
  function set(m:Mode){ localStorage.setItem('theme', m); setMode(m); apply(m) }
  return (
    <div className='relative'>
      <button aria-haspopup='true' className='rounded-2xl border border-brand px-3 py-1.5 text-sm'>Theme: {mode}</button>
      <div className='mt-2 flex gap-2'>
        <button onClick={()=>set('light')} className='rounded-xl border px-2 py-1 text-xs'>Light</button>
        <button onClick={()=>set('dark')} className='rounded-xl border px-2 py-1 text-xs'>Dark</button>
        <button onClick={()=>set('system')} className='rounded-xl border px-2 py-1 text-xs'>System</button>
      </div>
    </div>
  )
}
