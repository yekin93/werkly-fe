import { businesses as seedBusinesses, categories, createStore, profiles as seedProfiles } from '../../data/mock/store'
import { demoAccounts, demoPassword } from '../../data/mock/demo-accounts'
import { businessSchema, customerSchema, loginSchema } from '../../features/auth/schemas/auth'
import { regions } from '../../config/regions'
import type { DemoSession, ServiceRequestPreviewDto } from '../../types/domain'
import type { AuthRepository, BusinessRepository, OfferRepository, ServiceRequestRepository } from './interfaces'
import { requestSchema } from '../../features/service-requests/schemas/request'
export function createMockRepositories(initialSession: DemoSession | null = null) {
 const store = createStore()
 const profiles = structuredClone(seedProfiles)
 const businesses = structuredClone(seedBusinesses)
 let activeSession = initialSession ? { ...initialSession } : null
 const fail = (message: string): never => { throw new Error(message) }
 const request = (id: string) => store.requests.find(r=>r.id===id) ?? fail('Auftrag nicht gefunden.')
 const ownRequest = (id: string) => { const session=currentSession(); const r=request(id); if(session.role!=='CUSTOMER'||r.customerId!==session.userId) fail('Kein Zugriff auf diesen Auftrag.'); return r }
 const preview = (r: typeof store.requests[number]): ServiceRequestPreviewDto => ({id:r.id,title:r.title,description:r.description,categoryId:r.categoryId,regionId:r.regionId,urgency:r.urgency,status:r.status,attachments:r.attachments.map(a=>({...a}))})
 const currentSession = () => activeSession ?? fail('Bitte melde dich zuerst in der Demo an.')
 const signIn = (session: DemoSession) => {
   activeSession = { ...session }
   return { ...session }
 }
 const auth: AuthRepository = {
   getCurrentUser: () => activeSession ? { ...activeSession } : null,
   logout: async () => { activeSession = null },
   login: async input => {
     const { email, password } = loginSchema.parse(input)
     const account = demoAccounts.find(candidate => candidate.email === email.toLowerCase())
     if (!account || password !== demoPassword) return fail('Die Demo-Zugangsdaten stimmen nicht. Wähle unten ein Demo-Konto.')
     const { role, userId } = account
     return signIn({ role, userId, ...('businessId' in account ? { businessId: account.businessId } : {}) })
   },
   registerCustomer: async input => {
     customerSchema.parse(input)
     return signIn({ role: 'CUSTOMER', userId: crypto.randomUUID() })
   },
   registerBusiness: async input => {
     const data = businessSchema.parse(input)
     if (data.categoryIds.some(id => !categories.some(category => category.id === id))) {
       return fail('Bitte wähle gültige Leistungen.')
     }
     const businessId = crypto.randomUUID()
     const userId = crypto.randomUUID()
     const location = regions.find(region => region.id === data.regionId)!.name
     profiles.push({ id: businessId, name: data.businessName, description: 'Neu angelegter Demo-Betrieb', categoryId: data.categoryIds[0], categoryIds: [...new Set(data.categoryIds)], regionId: data.regionId, location })
     businesses.push({ id: businessId, userId, name: data.businessName, email: 'betrieb@example.invalid', phone: 'Nicht angegeben (Demo)' })
     return signIn({ role: 'BUSINESS', userId, businessId })
   },
 }
 const requests: ServiceRequestRepository = {
  categories:async()=>structuredClone(categories),
  list:async()=>{const session=currentSession();return session.role==='CUSTOMER'?structuredClone(store.requests.filter(r=>r.customerId===session.userId)):store.requests.filter(r=>r.status==='OPEN'||store.offers.some(o=>o.requestId===r.id&&o.businessId===session.businessId)).map(preview)},
  create:async input=>{ const session=currentSession(); if(session.role!=='CUSTOMER') fail('Bitte wechsle zur Kunden-Demo.'); const data=requestSchema.parse(input); const r={...data,id:crypto.randomUUID(),customerId:session.userId,status:'OPEN' as const,attachments:input.attachments??[],fullName:'Demo-Kund:in',email:'demo@example.invalid',phone:'Nicht angegeben (Demo)',address:'Nicht angegeben (Demo)'};store.requests.push(r);return preview(r) },
  complete:async id=>{const r=ownRequest(id);if(r.status!=='ASSIGNED')fail('Nur vergebene Aufträge können abgeschlossen werden.');r.status='COMPLETED'},
  contact:async id=>{const session=currentSession();const r=request(id);if(session.role!=='BUSINESS'||!store.offers.some(o=>o.requestId===id&&o.businessId===session.businessId&&o.status==='ACCEPTED'))fail('Kontaktdaten werden nur für den ausgewählten Betrieb freigegeben.');return {fullName:r.fullName,email:r.email,phone:r.phone,address:r.address}},
 }
 const offers: OfferRepository = {
  list:async requestId=>{const session=currentSession();if(requestId&&session.role==='CUSTOMER')ownRequest(requestId);return store.offers.filter(o=>(!requestId||o.requestId===requestId)&&(session.role==='CUSTOMER'?request(o.requestId).customerId===session.userId:o.businessId===session.businessId)).map(o=>({...o,business:structuredClone(profiles.find(p=>p.id===o.businessId)!)}))},
  submit:async input=>{const session=currentSession();if(session.role!=='BUSINESS'||!session.businessId)fail('Bitte wechsle zur Betriebs-Demo.');if(request(input.requestId).status!=='OPEN')fail('Dieser Auftrag ist nicht mehr offen.');if(!Number.isFinite(input.amount)||input.amount<=0||input.message.trim().length<15||!['FIXED','ESTIMATE'].includes(input.priceType))fail('Bitte gib einen gültigen Preis und mindestens 15 Zeichen Beschreibung an.');if(store.offers.some(o=>o.requestId===input.requestId&&o.businessId===session.businessId&&o.status==='SUBMITTED'))fail('Du hast bereits ein Angebot abgegeben.');store.offers.push({...input,id:crypto.randomUUID(),businessId:session.businessId!,status:'SUBMITTED'})},
  accept:async id=>{const offer=store.offers.find(o=>o.id===id)??fail('Angebot nicht gefunden.');const r=ownRequest(offer.requestId);if(r.status!=='OPEN'||offer.status!=='SUBMITTED')fail('Dieser Auftrag wurde bereits vergeben oder das Angebot ist nicht verfügbar.');r.status='ASSIGNED';store.offers.filter(o=>o.requestId===r.id&&o.status==='SUBMITTED').forEach(o=>{o.status=o.id===id?'ACCEPTED':'REJECTED'})},
  acceptedBusinessContact:async id=>{ownRequest(id);const o=store.offers.find(o=>o.requestId===id&&o.status==='ACCEPTED')??fail('Noch kein Angebot angenommen.');const b=businesses.find(b=>b.id===o.businessId)!;return {name:b.name,email:b.email,phone:b.phone}},
 }
 const business: BusinessRepository = {list:async()=>structuredClone(profiles)}
 return {auth,requests,offers,business}
}
