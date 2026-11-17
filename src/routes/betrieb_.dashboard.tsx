import { createFileRoute } from '@tanstack/react-router'
import { AccessGate } from '../features/auth/components/access-gate'
import { BusinessArea } from '../features/businesses/components/business-area'

export const Route = createFileRoute('/betrieb_/dashboard')({
  component: () => <AccessGate access="BUSINESS" next="/betrieb/dashboard"><BusinessArea /></AccessGate>,
})
