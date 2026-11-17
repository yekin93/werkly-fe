import { createFileRoute } from '@tanstack/react-router'
import { CustomerDashboard } from '../features/service-requests/components/dashboard'
import { AccessGate } from '../features/auth/components/access-gate'
export const Route=createFileRoute('/dashboard')({component:()=> <AccessGate access="CUSTOMER" next="/dashboard"><CustomerDashboard /></AccessGate>})
