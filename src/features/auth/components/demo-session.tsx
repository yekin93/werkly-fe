import { createContext, useContext, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { repositories } from '../../../services/repositories'
import type { DemoSession } from '../../../types/domain'

const SessionContext = createContext<{
  session: DemoSession | null
  authenticate: (action: () => Promise<DemoSession>) => Promise<DemoSession>
  logout: () => Promise<void>
} | null>(null)

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState(repositories.auth.getCurrentUser)
  const client = useQueryClient()

  async function authenticate(action: () => Promise<DemoSession>) {
    const nextSession = await action()
    client.clear()
    setSession(nextSession)
    return nextSession
  }

  async function logout() {
    await repositories.auth.logout()
    client.clear()
    setSession(null)
  }

  return <SessionContext.Provider value={{ session, authenticate, logout }}>{children}</SessionContext.Provider>
}

export function useDemoSession() {
  const context = useContext(SessionContext)
  if (!context) throw new Error('DemoSessionProvider required')
  return context
}

export function DemoBanner() {
  return <div className="demo-banner"><span><strong>Demo-Modus</strong> · Fiktive Daten. Anmeldung und Änderungen gelten bis zum Neuladen.</span></div>
}
