import { createFileRoute } from '@tanstack/react-router'
import { RequestWizard } from '../features/service-requests/components/request-wizard'
import { AccessGate } from '../features/auth/components/access-gate'
export const Route=createFileRoute('/auftrag-erstellen')({validateSearch:(search:Record<string,unknown>)=>({category:typeof search.category==='string'?search.category:undefined}),component:()=>{const {category}=Route.useSearch();return <AccessGate access="CUSTOMER" next="/auftrag-erstellen" category={category}><RequestWizard initialCategory={category}/></AccessGate>}})
