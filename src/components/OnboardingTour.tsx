'use client'
import { useOnboarding } from '@/context/OnboardingContext'
import Link from 'next/link'
const steps = [
  {title:'Browse library', body:'Explore curated series and search thousands of hands.' , href:'/'},
  {title:'Play of the Week', body:'A 5â€‘min breakdown to stay sharp with minimal time.', href:'/play-of-the-week'},
  {title:'Search', body:'Find hands by stack depth, position, and format.', href:'/search'},
]
export default function OnboardingTour(){
  const {done, complete} = useOnboarding()
  if(done) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[2000] grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-4 shadow-xl dark:bg-neutral-900">
        <ol className="grid gap-3">
          {steps.map((s,i)=> (
            <li key={i} className="rounded-xl border p-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{i+1}. {s.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">{s.body}</p>
                </div>
                <Link href={s.href} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">Go</Link>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex justify-end">
          <button onClick={complete} className="rounded-xl border px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800">Got it</button>
        </div>
      </div>
    </div>
  )
}
