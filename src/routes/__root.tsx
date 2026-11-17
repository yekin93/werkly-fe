import { useState } from 'react'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'motion/react'
import { Shell } from '../components/layout/shell'
import { DemoSessionProvider } from '../features/auth/components/demo-session'
import stylesheet from '../styles/app.css?url'
export const Route=createRootRoute({head:()=>({meta:[{charSet:'utf-8'},{name:'viewport',content:'width=device-width, initial-scale=1'},{title:'Werkly — Dein Projekt. Die passenden Profis.'},{name:'description',content:'Beschreibe dein Projekt, vergleiche Angebote und finde passende Betriebe in Steyr. Werkly – die lokale Verbindung für gute Arbeit.'}],links:[{rel:'stylesheet',href:stylesheet},{rel:'preconnect',href:'https://fonts.googleapis.com'},{rel:'preconnect',href:'https://fonts.gstatic.com',crossOrigin:'anonymous'},{rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap'}]}),component:Root,notFoundComponent:()=> <div className="container page-heading"><h1>Hier geht’s nicht weiter.</h1><a href="/">Zur Startseite</a></div>,errorComponent:({error})=><div className="container page-heading"><h1>Das hat leider nicht geklappt.</h1><p>{error instanceof Error ? error.message : 'Bitte versuche es erneut.'}</p><a href="/">Zur Startseite</a></div>})
function Root(){const [client]=useState(()=>new QueryClient({defaultOptions:{queries:{staleTime:30_000,retry:1}}}));return <html lang="de-AT"><head><HeadContent/></head><body><QueryClientProvider client={client}><DemoSessionProvider><MotionConfig reducedMotion="user"><Shell><Outlet/></Shell></MotionConfig></DemoSessionProvider></QueryClientProvider><Scripts/></body></html>}

