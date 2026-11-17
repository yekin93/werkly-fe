import { Link, Navigate } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { accessRedirect, destinationAfterLogin, type Access, type ProtectedPath } from '../access'
import { useDemoSession } from './demo-session'

export function AccessGate({ access, next, category, children }: {
  access: Access
  next?: ProtectedPath
  category?: string
  children: ReactNode
}) {
  const { session } = useDemoSession()
  const redirect = accessRedirect(session?.role, access)
  if (redirect === '/login') return <>
    <div className="container panel role-guard"><h1>Bitte melde dich an.</h1><p>Für diesen Bereich brauchst du eine Demo-Sitzung.</p><Link className="button" to="/login" search={{ next, category }}>Zur Demo-Anmeldung</Link></div>
    <Navigate to={redirect} search={{ next, category }} replace />
  </>
  if (redirect && access === 'GUEST' && session && destinationAfterLogin(session.role, next) === '/auftrag-erstellen') {
    return <Navigate to="/auftrag-erstellen" search={{ category }} replace />
  }
  if (redirect) return <Navigate to={redirect} replace />
  return <>{children}</>
}
