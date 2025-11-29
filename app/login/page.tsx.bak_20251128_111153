'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Login(){
  const sp = useSearchParams()
  const callbackUrl = sp.get('callbackUrl') || '/'
  const [email,setEmail] = useState('')
  const [sent,setSent] = useState(false)
  async function submit(e:React.FormEvent){ e.preventDefault(); await signIn('email', { email, callbackUrl }); setSent(true) }
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-brand p-6 bg-[--color-secondary]">
      <h1 className="text-xl font-display mb-2">Sign in</h1>
      <p className="text-sm text-[--color-text-secondary] mb-4">We will send you a magic link to sign in.</p>
      <form onSubmit={submit} className="grid gap-3">
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="rounded-xl border border-brand bg-transparent px-3 py-2"/>
        <button className="rounded-2xl bg-[--color-accent-gold] text-black px-4 py-2 font-medium">Send magic link</button>
      </form>
      {sent && <p className="mt-3 text-sm">Check your email for a sign-in link.</p>}
    </div>
  )
}
