import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/anmelden')({ beforeLoad: () => { throw redirect({ to: '/login' }) } })
