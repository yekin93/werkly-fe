import { z } from 'zod'
import { regions } from '../../../config/regions'

const email = z.string().trim().email('Bitte gib eine gültige E-Mail-Adresse ein.').max(254)
const name = z.string().trim().min(2, 'Bitte gib mindestens zwei Zeichen ein.').max(100)
const password = z.string()
  .min(12, 'Das Passwort braucht mindestens 12 Zeichen.')
  .max(128, 'Das Passwort darf maximal 128 Zeichen haben.')
  .regex(/[a-z]/, 'Verwende einen Kleinbuchstaben.')
  .regex(/[A-Z]/, 'Verwende einen Großbuchstaben.')
  .regex(/[0-9]/, 'Verwende eine Zahl.')
  .regex(/[^a-zA-Z0-9\s]/, 'Verwende ein Sonderzeichen.')

export const loginSchema = z.object({ email, password: z.string().min(1, 'Bitte gib das Demo-Passwort ein.').max(128) })
const registration = z.object({
  firstName: name, lastName: name, email, password,
  confirmation: z.string().min(1, 'Bitte wiederhole das Passwort.'),
  consent: z.boolean().refine(Boolean, 'Bitte bestätige die Hinweise und deine Zustimmung.'),
})
const matching = (values: { password: string; confirmation: string }) => values.password === values.confirmation
const mismatch = { path: ['confirmation'], message: 'Die Passwörter stimmen nicht überein.' }
export const customerSchema = registration.refine(matching, mismatch)
const businessFields = {
  businessName: name,
  categoryIds: z.array(z.string().min(1)).min(1, 'Bitte wähle mindestens eine Leistung.'),
  regionId: z.string().refine(id => regions.some(region => region.id === id && region.active), 'Bitte wähle eine verfügbare Region.'),
}
export const businessSchema = registration.extend(businessFields).refine(matching, mismatch)
export const customerFormSchema = registration.extend({
  businessName: z.string(), categoryIds: z.array(z.string()), regionId: z.string(),
}).refine(matching, mismatch)
