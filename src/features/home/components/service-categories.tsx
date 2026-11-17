import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { CategoryIcon } from '../../../components/ui/primitives'
import { useCategories } from '../../../hooks/use-marketplace'
const featuredCategories = ['repair', 'plumbing', 'electrical', 'painting', 'renovation', 'garden', 'moving', 'other']
export function ServiceCategories() {
  const { data, isPending, isError, refetch } = useCategories()
  const scroller = useRef<HTMLDivElement>(null)
  return <section id="leistungen" className="container category-dock" aria-labelledby="categories-heading">
    <div className="category-dock-title"><h2 id="categories-heading">Beliebte<br />Dienstleistungen</h2><span /></div>
    {isPending ? <p role="status" className="category-loading">Leistungen werden geladen …</p> : isError ? <div className="category-loading"><p>Die Leistungen konnten nicht geladen werden.</p><button onClick={() => refetch()}>Erneut versuchen</button></div> : <>
      <div className="category-scroll" ref={scroller} role="region" aria-label="Dienstleistungen, horizontal scrollbar" tabIndex={0}>{featuredCategories.map(id => data?.find(category => category.id === id)).filter(category => !!category).map(category => <Link key={category.id} to="/auftrag-erstellen" search={{ category: category.id }} className="service-tile"><CategoryIcon name={category.icon} size={34} /><span>{category.name}</span><ArrowRight className="service-tile-arrow" size={13} /></Link>)}</div>
      <button className="category-scroll-next" aria-label="Weitere Dienstleistungen anzeigen" onClick={() => scroller.current?.scrollBy({ left: 240, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ChevronRight size={19} /></button>
    </>}
  </section>
}
