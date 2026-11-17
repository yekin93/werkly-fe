import { createFileRoute } from '@tanstack/react-router'
import { parseLoginSearch } from '../features/auth/access'
import { AccessGate } from '../features/auth/components/access-gate'
import { LoginPage } from '../features/auth/components/login-page'

export const Route = createFileRoute('/login')({
  validateSearch: parseLoginSearch,
  component: LoginRoute,
})

function LoginRoute() {
  const search = Route.useSearch()
  return <AccessGate access="GUEST" {...search}><LoginPage {...search} /></AccessGate>
}
