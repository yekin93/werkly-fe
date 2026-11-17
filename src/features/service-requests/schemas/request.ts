import { z } from 'zod'
import { regions } from '../../../config/regions'
export const requestSchema = z.object({
 categoryId: z.enum(['repair','electrical','plumbing','painting','garden','cleaning','moving','renovation','other'],{error:'Bitte wähle eine Leistung.'}),
 regionId: z.string().refine(id=>regions.some(r=>r.id===id&&r.active),'Bitte wähle eine aktive Region.'),
 postalCode: z.string().refine(code=>regions.some(r=>r.active&&r.postalCodes.includes(code)),'Hier sind wir noch nicht verfügbar. Aktuell kannst du Aufträge in der konfigurierten Startregion erstellen.'),
 title: z.string().min(5,'Bitte gib mindestens 5 Zeichen ein.').max(100,'Maximal 100 Zeichen.'),
 description: z.string().min(30,'Bitte beschreibe dein Projekt mit mindestens 30 Zeichen.').max(4000,'Maximal 4.000 Zeichen.'),
 urgency: z.enum(['So bald wie möglich','In den nächsten Wochen','Flexibel'],{error:'Bitte wähle einen Zeitraum.'}),
})
export type RequestFormValues = z.infer<typeof requestSchema>
export function validateFiles(files: File[]): string | null {
 if(files.length>4) return 'Bitte wähle höchstens 4 Bilder.'
 if(files.some(file=>!['image/jpeg','image/png','image/webp'].includes(file.type))) return 'Erlaubt sind JPG, PNG und WebP.'
 if(files.some(file=>file.size>5*1024*1024)) return 'Ein Bild darf höchstens 5 MB groß sein.'
 return null
}
