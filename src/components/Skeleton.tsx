export function Skeleton({ className='' }:{className?:string}){ return <div className={`animate-pulse bg-white/10 ${className}`} /> }
export function PosterSkeleton(){ return <div className='aspect-video w-full rounded-xl bg-white/10'/> }
export function Spinner(){ return <div className='h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-[--color-emerald-green]'/> }
