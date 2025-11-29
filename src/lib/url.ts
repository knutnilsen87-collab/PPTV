import { headers } from 'next/headers'
export function absolute(path: string){
  const h = headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
  const proto = (h.get('x-forwarded-proto') || 'http') + '://'
  return path.startsWith('http') ? path : proto + host + (path.startsWith('/') ? path : '/' + path)
}
