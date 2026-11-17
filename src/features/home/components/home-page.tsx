import { MarketplaceHero } from './marketplace-hero'
import { ServiceCategories } from './service-categories'
import { ProcessSteps } from './process-steps'
import { RegionalOverview } from './regional-overview'
import { HomeFaq } from './home-faq'
import { RequestLink } from '../../../components/ui/primitives'
export function HomePage() {
  return <div className="marketplace-home"><MarketplaceHero /><ServiceCategories /><ProcessSteps /><RegionalOverview /><HomeFaq />
    <section className="home-final-cta"><div className="container"><div><span className="home-eyebrow">DEIN PROJEKT. DEINE ENTSCHEIDUNG.</span><h2>Was steht bei dir als Nächstes an?</h2><p>Beschreibe dein Vorhaben und finde die passende Unterstützung.</p></div><RequestLink /></div></section>
  </div>
}
