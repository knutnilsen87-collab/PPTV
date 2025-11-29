'use client'
import { createContext, useContext, useEffect, useState } from 'react'
type Ctx = { done: boolean, complete: ()=>void }
const OnboardingCtx = createContext<Ctx|undefined>(undefined)
export function OnboardingProvider({children}:{children:React.ReactNode}){
  const [done, setDone] = useState(true)
  useEffect(()=>{ const v = localStorage.getItem('onboarding_done'); setDone(v==='1') },[])
  return (
    <OnboardingCtx.Provider value={{done, complete:()=>{ localStorage.setItem('onboarding_done','1'); setDone(true) }}}>
      {children}
    </OnboardingCtx.Provider>
  )
}
export function useOnboarding(){
  const ctx = useContext(OnboardingCtx)
  if(!ctx) throw new Error('useOnboarding must be used inside OnboardingProvider')
  return ctx
}
