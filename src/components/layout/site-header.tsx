import { useEffect, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Menu, Search, UserRound, X } from 'lucide-react'
import { navigation } from '../../config/navigation'
import { Brand } from './brand'
import { dashboardFor } from '../../features/auth/access'
import { useDemoSession } from '../../features/auth/components/demo-session'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = useRouterState({ select: state => state.location.pathname })
  const reduced = useReducedMotion()
  const { session, logout } = useDemoSession()
  const navigate = useNavigate()
  async function signOut() {
    await logout()
    setOpen(false)
    await navigate({ to: '/', replace: true })
  }
  const accountLinks = (mobile = false) => session ? <>
    <Link to={dashboardFor(session.role)} className={mobile ? undefined : 'header-login'} onClick={() => setOpen(false)}><UserRound size={18} />Mein Bereich</Link>
    <button type="button" className="button header-register" onClick={() => void signOut()}>Abmelden</button>
  </> : <>
    <Link to="/login" className={mobile ? undefined : 'header-login'} onClick={() => setOpen(false)}><UserRound size={18} />Anmelden</Link>
    <Link to="/register" className={mobile ? undefined : 'button header-register'} onClick={() => setOpen(false)}>Registrieren</Link>
  </>
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
    <div className="container header-inner"><Brand />
      <nav className="desktop-nav" aria-label="Hauptnavigation">{navigation.map(item => <Link key={item.href} to="/" hash={item.href.split('#')[1]} activeOptions={{ exact: true }} className={item.home && pathname === '/' ? 'is-active' : undefined} aria-current={item.home && pathname === '/' ? 'page' : undefined}>{item.label}{item.href.includes('leistungen') && <ChevronDown size={13} />}</Link>)}</nav>
      <div className="header-actions"><Link className="header-search" to="/" hash="leistungen" aria-label="Dienstleistungen entdecken"><Search size={24} /></Link>{accountLinks()}<button className="menu-toggle" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile Navigation" initial={{ opacity: 0, height: reduced ? 'auto' : 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
      {navigation.map(item => <Link key={item.href} to="/" hash={item.href.split('#')[1]} onClick={() => setOpen(false)}>{item.label}</Link>)}{accountLinks(true)}<Link to="/auftrag-erstellen" search={{ category: undefined }} className="mobile-request" onClick={() => setOpen(false)}>Auftrag erstellen</Link>
    </motion.nav>}</AnimatePresence>
  </header>
}
