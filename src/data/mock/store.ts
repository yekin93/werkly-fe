import type { Business, PublicBusinessDto, ServiceCategory, ServiceRequest, Offer } from '../../types/domain'
export const categories: ServiceCategory[] = [
  {id:'repair',name:'Reparaturen',icon:'Wrench',description:'Kleine Reparaturen, große Hilfe'},
  {id:'electrical',name:'Elektro',icon:'Zap',description:'Anschlüsse, Licht & mehr'},
  {id:'plumbing',name:'Sanitär & Heizung',icon:'Droplets',description:'Bad, Wasser & Heizung'},
  {id:'painting',name:'Malerarbeiten',icon:'PaintRoller',description:'Frische Farbe für daheim'},
  {id:'garden',name:'Gartenpflege',icon:'Sprout',description:'Mehr Leben im Grünen'},
  {id:'cleaning',name:'Reinigung',icon:'Sparkles',description:'Ein rundum gutes Gefühl'},
  {id:'moving',name:'Umzug & Transport',icon:'Truck',description:'Gut ankommen im neuen Zuhause'},
  {id:'renovation',name:'Bau & Umbau',icon:'BrickWall',description:'Aus Ideen wird Zuhause'},
  {id:'other',name:'Weitere Dienstleistungen',icon:'LayoutGrid',description:'Unterstützung für dein Vorhaben'},
]
export const profiles: PublicBusinessDto[] = [
 {id:'business-1',name:'Farbwerk Demo OG',categoryId:'painting',description:'Fiktiver Demobetrieb für Innenanstriche und sorgfältige Oberflächengestaltung.',location:'Steyr'},
 {id:'business-2',name:'Raum & Farbe Musterbetrieb',categoryId:'painting',description:'Fiktiver Demobetrieb für Malerarbeiten und Renovierung.',location:'Steyr'},
]
export const businesses: Business[] = profiles.map((p,i)=>({id:p.id,userId:`business-user-${i+1}`,name:p.name,email:`betrieb${i+1}@example.invalid`,phone:'+43 000 000000 (Demo)'}))
export function createStore() {
 const requests: ServiceRequest[] = [
 {id:'demo-request-1',customerId:'customer-1',categoryId:'painting',regionId:'steyr',title:'Wohnzimmer neu ausmalen',description:'Unser Wohnzimmer mit etwa 28 m² soll einen neuen, hellen Anstrich bekommen. Die Wände sind in gutem Zustand. Bitte Material im Angebot berücksichtigen.',urgency:'In den nächsten Wochen',status:'OPEN',attachments:[],fullName:'Alex Muster (Demo)',email:'alex@example.invalid',phone:'+43 000 000000 (Demo)',address:'Fiktive Mustergasse 1, 4400 Steyr'},
 {id:'demo-request-2',customerId:'customer-1',categoryId:'painting',regionId:'steyr',title:'Vorzimmer auffrischen',description:'Wände im Vorzimmer ausmalen, inklusive kleiner Spachtelarbeiten.',urgency:'Flexibel',status:'ASSIGNED',attachments:[],fullName:'Alex Muster (Demo)',email:'alex@example.invalid',phone:'+43 000 000000 (Demo)',address:'Fiktive Mustergasse 1, 4400 Steyr'},
 ]
 const offers: Offer[] = [
 {id:'offer-1',requestId:'demo-request-1',businessId:'business-1',amount:680,priceType:'FIXED',message:'Zweifacher Anstrich inklusive Abdecken, Farbe und Endreinigung. Ausführung nach gemeinsamer Terminvereinbarung.',status:'SUBMITTED'},
 {id:'offer-2',requestId:'demo-request-1',businessId:'business-2',amount:590,priceType:'ESTIMATE',message:'Geschätzter Preis für Vorbereitung und Anstrich inklusive Material. Der genaue Umfang wird vor Arbeitsbeginn abgestimmt.',status:'SUBMITTED'},
 {id:'offer-3',requestId:'demo-request-2',businessId:'business-1',amount:420,priceType:'FIXED',message:'Vorbereitung und heller Anstrich inklusive Material.',status:'ACCEPTED'},
 ]
 return { requests, offers }
}
