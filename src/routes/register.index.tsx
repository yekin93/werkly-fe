import { createFileRoute } from '@tanstack/react-router'
import { parseLoginSearch } from '../features/auth/access'
import { AccessGate } from '../features/auth/components/access-gate'
import { RegistrationPage } from '../features/auth/components/registration-page'

export const Route = createFileRoute('/register/')({
  validateSearch: parseLoginSearch,
  component: RegisterRoute,
})

function RegisterRoute() {
  const search = Route.useSearch()
  return <AccessGate access="GUEST" {...search}><RegistrationPage {...search} /></AccessGate>
}
