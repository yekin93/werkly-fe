import { Link } from '@tanstack/react-router'
import { ArrowRight, ClipboardCheck, Layers3, LockKeyhole, MapPin, Store } from 'lucide-react'
import { Reveal } from '../../../components/ui/primitives'
import { launchRegion } from '../../../config/regions'
const benefits = [
  { icon: Store, title: 'Lokale Betriebe entdecken', text: 'Finde Unterstützung aus deiner Region.' },
  { icon: Layers3, title: 'Angebote vergleichen', text: 'Leistungen und Preise übersichtlich im Blick.' },
  { icon: LockKeyhole, title: 'Kontaktdaten geschützt', text: 'Freigabe nur an den ausgewählten Betrieb.' },
  { icon: ClipboardCheck, title: 'Projekte einfach verwalten', text: 'Vom ersten Vorhaben bis zur Umsetzung.' },
]
export function RegionalOverview() {
  return <section className="container regional-overview" aria-label="Regional verbunden mit Werkly">
    <Reveal className="region-photo-card"><div id="region" className="region-photo-inner"><img src="/assets/steyr-960.jpg" width="960" height="652" alt={`Blick auf die Michaelerkirche, die historische Altstadt und die Brücke in ${launchRegion.name}`} loading="lazy" /><div className="region-card-copy"><span><MapPin size={14} />Regional für dich da</span><h2>{launchRegion.name} und Umgebung</h2><p>Lokale Betriebe entdecken. Wir starten in {launchRegion.name} und prüfen deinen Ort im Auftragsformular.</p><a href="#leistungen" className="button button-navy">Region entdecken <ArrowRight size={17} /></a></div></div></Reveal>
    <Reveal className="home-benefit-list"><ul>{benefits.map(benefit => <li key={benefit.title}><benefit.icon size={30} strokeWidth={1.7} /><div><h3>{benefit.title}</h3><p>{benefit.text}</p></div></li>)}</ul></Reveal>
    <Reveal className="business-promo"><div id="betriebe" className="business-promo-inner"><img src="/assets/tradesperson-720.png" width="720" height="1080" alt="" loading="lazy" aria-hidden="true" /><div className="business-promo-copy"><Store size={32} strokeWidth={1.7} /><h2>Du bist Handwerker<br />oder führst einen Betrieb?</h2><p>Entdecke Projekte in deiner Region und überzeuge mit deinem Angebot.</p><Link to="/registrieren" search={{ role: 'BUSINESS' }} className="button">Als Betrieb registrieren <ArrowRight size={18} /></Link><small>Jetzt die Betriebs-Demo kennenlernen.</small></div></div></Reveal>
  </section>
}

