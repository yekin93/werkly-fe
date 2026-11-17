import type { ReactNode } from 'react'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
export function Shell({ children }: { children: ReactNode }) {
  return <><a href="#main" className="skip-link">Zum Inhalt</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></>
}
