import { createFileRoute } from '@tanstack/react-router'
import { AccessGate } from '../features/auth/components/access-gate'
import { RegistrationPage } from '../features/auth/components/registration-page'

export const Route = createFileRoute('/register/business')({
  component: () => <AccessGate access="GUEST"><RegistrationPage business /></AccessGate>,
})
