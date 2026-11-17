import type { DemoSession } from '../../types/domain'

export type Access = DemoSession['role'] | 'GUEST'
export type ProtectedPath = '/dashboard' | '/betrieb/dashboard' | '/auftrag-erstellen'

export function dashboardFor(role: DemoSession['role']) {
  return role === 'BUSINESS' ? '/betrieb/dashboard' as const : '/dashboard' as const
}

export function accessRedirect(role: DemoSession['role'] | undefined, access: Access) {
  if (access === 'GUEST') return role ? dashboardFor(role) : null
  if (!role) return '/login'
  return role === access ? null : dashboardFor(role)
}

export function destinationAfterLogin(role: DemoSession['role'], requested?: ProtectedPath) {
  return role === 'CUSTOMER' && requested === '/auftrag-erstellen' ? requested : dashboardFor(role)
}

export function parseLoginSearch(search: Record<string, unknown>) {
  const { next, category } = search
  return {
    next: next === '/dashboard' || next === '/betrieb/dashboard' || next === '/auftrag-erstellen' ? next : undefined,
    category: next === '/auftrag-erstellen' && typeof category === 'string' ? category : undefined,
  } as { next?: ProtectedPath; category?: string }
}
