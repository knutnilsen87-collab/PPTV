'use client'
import { useEffect, useState } from 'react'
export default function GlobalPageLoader(){
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const start = ()=> setLoading(true)
    const stop = ()=> setLoading(false)
    window.addEventListener('routeChangeStart', start as any)
    window.addEventListener('routeChangeComplete', stop as any)
    window.addEventListener('routeChangeError', stop as any)
    return ()=>{
      window.removeEventListener('routeChangeStart', start as any)
      window.removeEventListener('routeChangeComplete', stop as any)
      window.removeEventListener('routeChangeError', stop as any)
    }
  },[])
  if(!loading) return null
  return (
    <div aria-live="polite" className="fixed inset-x-0 top-0 z-[1000]">
      <div className="mx-auto h-1 max-w-[1200px] animate-pulse rounded-full bg-blue-500"/>
    </div>
  )
}
