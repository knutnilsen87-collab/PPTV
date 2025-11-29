'use client'
import { useState } from 'react'
export default function ChatDock(){
  const [open, setOpen] = useState(false)
  return (
    <aside className={`fixed bottom-4 right-4 z-40 ${open? 'w-80' : 'w-14'} rounded-xl border border-brand bg-[--color-secondary] overflow-hidden transition-[width] duration-200 ease-luxe`}>
      <button onClick={()=>setOpen(v=>!v)} className='w-14 h-14'>💬<span className='sr-only'>Toggle chat</span></button>
      {open && (
        <div className='grid max-h-[60vh] grid-rows-[auto,1fr,auto]'>
          <div className='border-b border-brand p-2 text-sm'>Community Chat</div>
          <div role='log' aria-live='polite' className='p-2 overflow-auto text-sm space-y-1'>{/* messages */}</div>
          <form className='flex gap-2 p-2'>
            <input className='flex-1 rounded-lg border border-brand bg-transparent px-2 py-1 text-sm' placeholder='Message'/>
            <button className='rounded-lg border border-brand px-2 py-1 text-sm'>Send</button>
          </form>
        </div>
      )}
    </aside>
  )
}
