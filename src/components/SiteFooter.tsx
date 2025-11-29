import Container from './Container'
export default function SiteFooter(){
  return (
    <footer className='mt-10 border-t border-brand/50 text-sm text-poker-muted'>
      <Container className='py-6 grid gap-3 sm:flex sm:items-center sm:justify-between'>
        <nav className='flex gap-4'><a href='/about'>About</a><a href='/privacy'>Privacy</a><a href='/terms'>Terms</a></nav>
        <p>© {new Date().getFullYear()} ProPokerTV</p>
      </Container>
    </footer>
  )
}
