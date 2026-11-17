import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/betrieb')({ beforeLoad: () => { throw redirect({ to: '/betrieb/dashboard' }) } })
