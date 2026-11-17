import { businesses, categories, createStore, profiles } from '../../data/mock/store'
import type { DemoSession, ServiceRequestPreviewDto } from '../../types/domain'
import type { AuthRepository, BusinessRepository, OfferRepository, ServiceRequestRepository } from './interfaces'
import { requestSchema } from '../../features/service-requests/schemas/request'
export function createMockRepositories(initialSession?: DemoSession) {
 const store = createStore()
 let session: DemoSession = initialSession ?? { role:'CUSTOMER',userId:'customer-1' }
 const fail = (message: string): never => { throw new Error(message) }
 const request = (id: string) => store.requests.find(r=>r.id===id) ?? fail('Auftrag nicht gefunden.')
 const ownRequest = (id: string) => { const r=request(id); if(session.role!=='CUSTOMER'||r.customerId!==session.userId) fail('Kein Zugriff auf diesen Auftrag.'); return r }
 const preview = (r: typeof store.requests[number]): ServiceRequestPreviewDto => ({id:r.id,title:r.title,description:r.description,categoryId:r.categoryId,regionId:r.regionId,urgency:r.urgency,status:r.status,attachments:r.attachments.map(a=>({...a}))})
 const auth: AuthRepository = {session:()=>({...session}),switchRole:role=>{session=role==='CUSTOMER'?{role,userId:'customer-1'}:{role,userId:'business-user-1',businessId:'business-1'}}}
 const requests: ServiceRequestRepository = {
  categories:async()=>structuredClone(categories),
  list:async()=>session.role==='CUSTOMER'?structuredClone(store.requests.filter(r=>r.customerId===session.userId)):store.requests.filter(r=>r.status==='OPEN'||store.offers.some(o=>o.requestId===r.id&&o.businessId===session.businessId)).map(preview),
  create:async input=>{ if(session.role!=='CUSTOMER') fail('Bitte wechsle zur Kunden-Demo.'); const data=requestSchema.parse(input); const r={...data,id:crypto.randomUUID(),customerId:session.userId,status:'OPEN' as const,attachments:input.attachments??[],fullName:'Demo-Kund:in',email:'demo@example.invalid',phone:'Nicht angegeben (Demo)',address:'Nicht angegeben (Demo)'};store.requests.push(r);return preview(r) },
  complete:async id=>{const r=ownRequest(id);if(r.status!=='ASSIGNED')fail('Nur vergebene Aufträge können abgeschlossen werden.');r.status='COMPLETED'},
  contact:async id=>{const r=request(id);if(session.role!=='BUSINESS'||!store.offers.some(o=>o.requestId===id&&o.businessId===session.businessId&&o.status==='ACCEPTED'))fail('Kontaktdaten werden nur für den ausgewählten Betrieb freigegeben.');return {fullName:r.fullName,email:r.email,phone:r.phone,address:r.address}},
 }
 const offers: OfferRepository = {
  list:async requestId=>{if(requestId&&session.role==='CUSTOMER')ownRequest(requestId);return store.offers.filter(o=>(!requestId||o.requestId===requestId)&&(session.role==='CUSTOMER'?request(o.requestId).customerId===session.userId:o.businessId===session.businessId)).map(o=>({...o,business:{...profiles.find(p=>p.id===o.businessId)!}}))},
  submit:async input=>{if(session.role!=='BUSINESS'||!session.businessId)fail('Bitte wechsle zur Betriebs-Demo.');if(request(input.requestId).status!=='OPEN')fail('Dieser Auftrag ist nicht mehr offen.');if(!Number.isFinite(input.amount)||input.amount<=0||input.message.trim().length<15||!['FIXED','ESTIMATE'].includes(input.priceType))fail('Bitte gib einen gültigen Preis und mindestens 15 Zeichen Beschreibung an.');if(store.offers.some(o=>o.requestId===input.requestId&&o.businessId===session.businessId&&o.status==='SUBMITTED'))fail('Du hast bereits ein Angebot abgegeben.');store.offers.push({...input,id:crypto.randomUUID(),businessId:session.businessId!,status:'SUBMITTED'})},
  accept:async id=>{const offer=store.offers.find(o=>o.id===id)??fail('Angebot nicht gefunden.');const r=ownRequest(offer.requestId);if(r.status!=='OPEN'||offer.status!=='SUBMITTED')fail('Dieser Auftrag wurde bereits vergeben oder das Angebot ist nicht verfügbar.');r.status='ASSIGNED';store.offers.filter(o=>o.requestId===r.id&&o.status==='SUBMITTED').forEach(o=>{o.status=o.id===id?'ACCEPTED':'REJECTED'})},
  acceptedBusinessContact:async id=>{ownRequest(id);const o=store.offers.find(o=>o.requestId===id&&o.status==='ACCEPTED')??fail('Noch kein Angebot angenommen.');const b=businesses.find(b=>b.id===o.businessId)!;return {name:b.name,email:b.email,phone:b.phone}},
 }
 const business: BusinessRepository = {list:async()=>structuredClone(profiles)}
 return {auth,requests,offers,business}
}
