import { Link } from '@tanstack/react-router'
export function Brand() {
  return <Link to="/" className="brand" aria-label="Werkly Startseite">
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M3 20 24 5l21 15v24H32V25l-8-6-8 6v19H3V20Z" fill="currentColor"/><path d="M19 28 24 24l5 4v16H19V28Z" fill="currentColor" opacity=".8"/></svg>
    <span>Werkly</span>
  </Link>
}
