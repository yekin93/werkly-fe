import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Menu, Search, UserRound, X } from 'lucide-react'
import { navigation } from '../../config/navigation'
import { Brand } from './brand'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = useRouterState({ select: state => state.location.pathname })
  const reduced = useReducedMotion()
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
      <nav className="desktop-nav" aria-label="Hauptnavigation">{navigation.map(item => <a key={item.href} href={item.href} className={item.home && pathname === '/' ? 'is-active' : undefined} aria-current={item.home && pathname === '/' ? 'page' : undefined}>{item.label}{item.href.includes('leistungen') && <ChevronDown size={13} />}</a>)}</nav>
      <div className="header-actions"><a className="header-search" href="/#leistungen" aria-label="Dienstleistungen entdecken"><Search size={24} /></a><Link to="/anmelden" search={{ role: 'CUSTOMER' }} className="header-login"><UserRound size={18} />Anmelden</Link><Link to="/registrieren" search={{ role: 'CUSTOMER' }} className="button header-register">Registrieren</Link><button className="menu-toggle" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Mobile Navigation" initial={{ opacity: 0, height: reduced ? 'auto' : 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
      {navigation.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}<Link to="/anmelden" search={{ role: 'CUSTOMER' }} onClick={() => setOpen(false)}>Anmelden</Link><Link to="/auftrag-erstellen" search={{ category: undefined }} className="mobile-request" onClick={() => setOpen(false)}>Auftrag erstellen</Link>
    </motion.nav>}</AnimatePresence>
  </header>
}
