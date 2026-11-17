import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Brand } from '../../../components/layout/brand'

export function AuthLayout({ title, description, business = false, children }: {
  title: string
  description: string
  business?: boolean
  children: ReactNode
}) {
  return <div className="auth-layout auth-screen">
    <aside className="auth-visual auth-scene">
      <Brand />
      <h2>{business ? 'Dein Handwerk. Neue Aufträge.' : 'Dein Projekt. Die passenden Profis.'}</h2>
      <p>{business ? 'Entdecke Aufträge aus deiner Region und zeig, was dein Betrieb kann.' : 'Finde lokale Betriebe und vergleiche Angebote für dein Vorhaben.'}</p>
      <img src="/assets/tradesperson-720.png" alt="" width={720} height={1080} />
    </aside>
    <motion.section className="auth-form-wrap" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: .24 }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="auth-notice"><strong>Demo-Modus.</strong> Bitte verwende ausschließlich fiktive Daten. Die Demo bietet keinen Kontoschutz.</p>
      {children}
    </motion.section>
  </div>
}
