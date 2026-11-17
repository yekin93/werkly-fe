import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '../features/auth/components/auth-page'
export const Route=createFileRoute('/registrieren')({validateSearch:(s:Record<string,unknown>)=>({role:s.role==='BUSINESS'?'BUSINESS' as const:'CUSTOMER' as const}),component:()=>{const {role}=Route.useSearch();return <AuthPage register initialRole={role}/>}})
