import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ClipboardList, LockKeyhole, MapPin, Plus, SquareCheckBig, UsersRound, Layers3 } from 'lucide-react'
import { launchRegion } from '../../../config/regions'
import { RequestLink } from '../../../components/ui/primitives'
const benefits = [
  { icon: MapPin, title: 'Regional entdecken', text: 'Betriebe aus deiner Region' },
  { icon: LockKeyhole, title: 'Kontaktdaten geschützt', text: 'Du wählst, wer sie bekommt' },
  { icon: Layers3, title: 'Angebote vergleichen', text: 'Leistungen und Preise im Blick' },
]
const workflow = [
  { icon: ClipboardList, title: 'Auftrag erstellen', text: 'Beschreibe dein Projekt in wenigen Schritten.' },
  { icon: UsersRound, title: 'Angebote erhalten', text: 'Passende Betriebe können dir ein Angebot machen.' },
  { icon: SquareCheckBig, title: 'Projekt umsetzen', text: 'Angebot auswählen und direkt abstimmen.' },
]
export function MarketplaceHero() {
  const reduced = useReducedMotion()
  return <section className="market-hero" aria-labelledby="hero-title">
    <div className="hero-cityscape" aria-hidden="true"><img src="/assets/steyr-1600.jpg" srcSet="/assets/steyr-960.jpg 960w, /assets/steyr-1600.jpg 1600w" sizes="(max-width: 700px) 100vw, 75vw" alt="" fetchPriority="high" width="1600" height="1087" /></div><div className="hero-atmosphere" aria-hidden="true" />
    <div className="container market-hero-inner">
      <motion.div className="market-hero-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
        <span className="hero-eyebrow"><i />IHRE REGIONALE HANDWERKER-PLATTFORM<i /></span><h1 id="hero-title">Handwerker in {launchRegion.name}<br />und Umgebung –<br /><em>schnell, einfach, regional.</em></h1>
        <p>Ob Reparatur, Renovierung oder Montage – beschreibe dein Projekt, erhalte Angebote und finde den passenden Betrieb aus deiner Region.</p>
        <div className="market-hero-actions"><RequestLink className="hero-primary"><Plus size={23} />Auftrag erstellen</RequestLink><a href="#ablauf" className="hero-secondary">So funktioniert’s <ArrowRight size={20} /></a></div>
        <ul className="hero-benefits">{benefits.map(item => <li key={item.title}><item.icon size={30} strokeWidth={1.8} /><div><strong>{item.title}</strong><span>{item.text}</span></div></li>)}</ul>
      </motion.div>
      <div className="hero-person-scene" aria-hidden="true"><svg className="hero-house-frame" viewBox="0 0 350 420" fill="none"><path d="M23 396V131a18 18 0 0 1 7-14L163 15a20 20 0 0 1 24 0l133 102a18 18 0 0 1 7 14v265H23Z" stroke="currentColor" strokeWidth="19" strokeLinejoin="round" /></svg><motion.img className="hero-tradesperson" src="/assets/tradesperson-720.png" width="720" height="1080" alt="" fetchPriority="high" initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .75, delay: .12 }} /></div>
      <span className="hero-location"><MapPin size={21} />{launchRegion.name} & Umgebung</span>
      <div className="hero-workflow" aria-label="Vom Auftrag zum Projekt">{workflow.map((item, index) => <motion.div key={item.title} className={`hero-workflow-item workflow-${index + 1}`} initial={reduced ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .25 + index * .12 }}>
        <motion.div className="workflow-surface" animate={reduced ? {} : { y: [0, -3, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * .6 }}><item.icon size={35} strokeWidth={1.8} /><div><h2>{item.title}</h2><p>{item.text}</p></div></motion.div>
        {index < 2 && <svg className="workflow-connector" viewBox="0 0 30 40" fill="none" aria-hidden="true"><path d="M9 3c14 14 14 24 1 30m-2-9 1 11 10-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </motion.div>)}</div>
    </div>
  </section>
}

