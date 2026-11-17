import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Zap, Droplets, PaintRoller, Sprout, Sparkles, Truck, Hammer, Wrench, BrickWall, LayoutGrid } from 'lucide-react'
import { Link } from '@tanstack/react-router'
export function RequestLink({children='Auftrag erstellen',className='',category}: {children?:ReactNode;className?:string;category?:string}) {return <Link to="/auftrag-erstellen" search={{category}} className={`button ${className}`}>{children}<ArrowUpRight size={18}/></Link>}
export function Reveal({children,className=''}:{children:ReactNode;className?:string}) {const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.1}} transition={{duration:.65,ease:[.2,.7,.3,1]}}>{children}</motion.div>}
export function CategoryIcon({name,size=25}:{name:string;size?:number}) {const icons: Record<string, typeof Zap> = {Zap,Droplets,PaintRoller,Sprout,Sparkles,Truck,Hammer,Wrench,BrickWall,LayoutGrid};const Icon=icons[name]??Hammer;return <Icon size={size} strokeWidth={1.6}/>}
export function ErrorMessage({message}:{message?:string}) {return message?<p role="alert" className="error-message">{message}</p>:null}
export function EmptyState({children}:{children:ReactNode}) {return <div className="empty-state">{children}</div>}
export const formatPrice=(amount:number)=>new Intl.NumberFormat('de-AT',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(amount)
