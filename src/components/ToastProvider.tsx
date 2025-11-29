'use client'
import { createContext, useContext, useState } from 'react'

type Toast = { id: string; text: string }
const Ctx = createContext<{toasts:Toast[], push:(t:string)=>void, remove:(id:string)=>void}|null>(null)
export function ToastProvider({children}:{children:React.ReactNode}){
  const [toasts,set] = useState<Toast[]>([])
  function push(text:string){ const id = Math.random().toString(36).slice(2); set(t=>[...t,{id,text}]); setTimeout(()=>remove(id), 4000) }
  function remove(id:string){ set(t=>t.filter(x=>x.id!==id)) }
  return (
    <Ctx.Provider value={{toasts:toasts, push, remove}}>
      {children}
      <div aria-live='polite' className='fixed right-4 top-4 z-[2000] grid gap-2'>
        {toasts.map(t=> (<div key={t.id} className='rounded-xl border border-brand bg-[--color-secondary] px-3 py-2 shadow-elevate'>{t.text}</div>))}
      </div>
    </Ctx.Provider>
  )
}
export function useToast(){ const c = useContext(Ctx); if(!c) throw new Error('useToast outside provider'); return c }
