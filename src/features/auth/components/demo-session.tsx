import { createContext, useContext, useState, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { repositories } from '../../../services/repositories'
import type { DemoSession } from '../../../types/domain'
const SessionContext=createContext<{session:DemoSession;switchRole:(role:DemoSession['role'])=>void}|null>(null)
export function DemoSessionProvider({children}:{children:ReactNode}) {const [session,setSession]=useState(repositories.auth.session);const client=useQueryClient();function switchRole(role:DemoSession['role']){repositories.auth.switchRole(role);client.clear();setSession(repositories.auth.session())}return <SessionContext.Provider value={{session,switchRole}}>{children}</SessionContext.Provider>}
export function useDemoSession(){const context=useContext(SessionContext);if(!context)throw new Error('DemoSessionProvider required');return context}
export function DemoBanner(){const {session,switchRole}=useDemoSession();return <div className="demo-banner"><span><strong>Demo-Modus</strong> · Fiktive Daten. Änderungen gelten nur bis zum Neuladen.</span><label>Ansicht <select aria-label="Demo-Rolle wechseln" value={session.role} onChange={e=>switchRole(e.target.value as DemoSession['role'])}><option value="CUSTOMER">Kund:in</option><option value="BUSINESS">Betrieb</option></select></label></div>}
