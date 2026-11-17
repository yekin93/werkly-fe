import { Link } from '@tanstack/react-router'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { launchRegion } from '../../config/regions'
import { Brand } from './brand'
export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-top">
    <div className="footer-brand"><Brand /><p>Gute Arbeit beginnt mit<br />der richtigen Verbindung.</p><span><MapPin size={14} />{launchRegion.name}, Österreich</span></div>
    <div><h3>Für dein Projekt</h3><Link to="/auftrag-erstellen" search={{ category: undefined }}>Auftrag erstellen</Link><a href="/#leistungen">Dienstleistungen</a><Link to="/dashboard">Meine Aufträge · Demo</Link></div>
    <div><h3>Für deinen Betrieb</h3><Link to="/betrieb">Betriebsbereich · Demo</Link><Link to="/registrieren" search={{ role: 'BUSINESS' }}>Betrieb registrieren <ArrowUpRight size={13} /></Link><a href="/#ablauf">So funktioniert’s</a></div>
    <div><h3>Über Werkly</h3><a href="/#region">Unsere Startregion</a><a href="/#fragen">Häufige Fragen</a><span>Kontakt folgt vor dem Start.</span></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Werkly · Frontend-Demo</span><div><Link to="/impressum">Impressum · Entwurf</Link><Link to="/datenschutz">Datenschutz · Entwurf</Link><Link to="/bildnachweise">Bildnachweise</Link></div><span>Mit Sorgfalt aus Österreich <i className="austria-flag" /></span></div></footer>
}
