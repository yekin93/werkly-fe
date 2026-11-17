import { ArrowRight, BellRing, ClipboardList, Hand, CircleCheck } from 'lucide-react'
import { Reveal } from '../../../components/ui/primitives'
const steps = [
  { icon: ClipboardList, title: 'Auftrag erstellen', text: 'Beschreibe, was erledigt werden soll.' },
  { icon: BellRing, title: 'Angebote erhalten', text: 'Betriebe können dir passende Angebote senden.' },
  { icon: Hand, title: 'Angebot auswählen', text: 'Vergleiche Betriebe, Preise und Leistungen.' },
  { icon: CircleCheck, title: 'Projekt umsetzen', text: 'Stimme die Umsetzung direkt mit dem Betrieb ab.' },
]
export function ProcessSteps() {
  return <section id="ablauf" className="container process-section" aria-labelledby="process-heading"><div className="process-title"><h2 id="process-heading">So einfach<br />funktioniert Werkly</h2><span /></div><div className="process-track">{steps.map((step, index) => <Reveal key={step.title} className="process-step-wrap"><article className="process-card"><span className="process-number">{index + 1}</span><step.icon size={31} strokeWidth={1.65} /><h3>{step.title}</h3><p>{step.text}</p></article>{index < steps.length - 1 && <ArrowRight className="process-arrow" size={20} aria-hidden="true" />}</Reveal>)}</div></section>
}
