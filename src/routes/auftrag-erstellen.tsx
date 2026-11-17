import { createFileRoute } from '@tanstack/react-router'
import { RequestWizard } from '../features/service-requests/components/request-wizard'
export const Route=createFileRoute('/auftrag-erstellen')({validateSearch:(search:Record<string,unknown>)=>({category:typeof search.category==='string'?search.category:undefined}),component:()=>{const {category}=Route.useSearch();return <RequestWizard initialCategory={category}/>}})
