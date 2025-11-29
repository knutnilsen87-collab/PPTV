'use client'
import VideoCard, {Video} from './VideoCard'
export default function VideoGrid({items}:{items:Video[]}){
  return (<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{items.map(v=> <VideoCard key={v.id} v={v}/>)}
  </div>)
}
