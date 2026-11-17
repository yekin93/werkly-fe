import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Reveal } from '../../../components/ui/primitives'
import { launchRegion } from '../../../config/regions'
const questions = [
  ['Wie erstelle ich einen Auftrag?', 'Wähle eine Leistung, prüfe deinen Ort und beschreibe dein Projekt. Du kannst bis zu vier Bilder lokal als Vorschau hinzufügen. In der Demo wird dein Auftrag nur im Arbeitsspeicher erstellt und an keine echten Betriebe versendet.'],
  ['Wie finde ich das passende Angebot?', 'Im Kundenbereich vergleichst du Preis, Preisart und Leistungsumfang. Du siehst den Betriebsnamen und das öffentliche Profil vor deiner Entscheidung. Erst nach deiner Bestätigung wird ein Angebot angenommen.'],
  ['Wer sieht meine Kontaktdaten?', 'Vor der Annahme sehen Betriebe nur die ungefähre Region und öffentliche Projektdetails. Telefonnummer, E-Mail, vollständiger Name und genaue Adresse werden ausschließlich für den ausgewählten Betrieb freigegeben. Bitte teile keine privaten Daten in Beschreibung oder Bildern.'],
  ['Wie läuft die Bezahlung ab?', 'Werkly wickelt keine Zahlungen ab. Durchführung, Termin und Bezahlung vereinbarst du direkt mit dem ausgewählten Betrieb.'],
  ['In welchen Orten ist Werkly verfügbar?', `Wir starten in ${launchRegion.name}. Die derzeit unterstützten Postleitzahlen werden im Formular geprüft. Das gesamte Umland ist noch nicht freigeschaltet. Weitere Orte können später ergänzt werden.`],
  ['Kann ich Werkly schon ausprobieren?', 'Ja, in der klar gekennzeichneten Demo. Alle Betriebe, Aufträge, Angebote und Kontaktdaten sind fiktiv. Es gibt noch keine echte Anmeldung, Benachrichtigung oder Zahlungsabwicklung.'],
]
export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0)
  return <section id="fragen" className="home-faq container" aria-labelledby="faq-heading"><Reveal className="home-faq-intro"><span className="home-eyebrow">GUT ZU WISSEN</span><h2 id="faq-heading">Noch Fragen?<br />Wir machen’s einfach.</h2><p>Die wichtigsten Antworten, bevor dein Projekt losgeht.</p><Link to="/dashboard">Werkly als Kund:in ausprobieren <span aria-hidden="true">↗</span></Link></Reveal><div className="home-faq-list">{questions.map(([question, answer], index) => <div className={`home-faq-item${open === index ? ' is-open' : ''}`} key={question}><h3><button id={`faq-question-${index}`} aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>{question}{open === index ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={open !== index}><p>{answer}</p></div></div>)}</div></section>
}
