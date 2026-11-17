import { describe, expect, it } from 'vitest'
import { demoAccounts, demoPassword } from '../../data/mock/demo-accounts'
import { createMockRepositories } from '../../services/repositories/mock'
import { accessRedirect, destinationAfterLogin, parseLoginSearch } from './access'
import { businessSchema, customerSchema, loginSchema } from './schemas/auth'

const registration = {
  firstName: 'Erika', lastName: 'Muster', email: 'erika@example.invalid',
  password: 'Fiktives!2026', confirmation: 'Fiktives!2026', consent: true,
}

describe('authentication validation', () => {
  it('rejects an invalid email or missing password', () => {
    expect(loginSchema.safeParse({ email: 'falsch', password: '' }).success).toBe(false)
    expect(loginSchema.safeParse({ email: demoAccounts[0].email, password: demoPassword }).success).toBe(true)
  })

  it('requires strong passwords, matching confirmation and affirmative consent', () => {
    expect(customerSchema.safeParse(registration).success).toBe(true)
    for (const change of [{ password: 'schwach' }, { confirmation: 'anders' }, { consent: false }]) {
      expect(customerSchema.safeParse({ ...registration, ...change }).success).toBe(false)
    }
  })

  it('requires business categories and an active region', () => {
    const business = { ...registration, businessName: 'Musterbetrieb', categoryIds: ['painting'], regionId: 'steyr' }
    expect(businessSchema.safeParse(business).success).toBe(true)
    expect(businessSchema.safeParse({ ...business, categoryIds: [] }).success).toBe(false)
    expect(businessSchema.safeParse({ ...business, regionId: 'unbekannt' }).success).toBe(false)
  })
})

describe('demo session and access', () => {
  it('logs in both seeded roles and revokes private repository access on logout', async () => {
    const repos = createMockRepositories()
    expect(repos.auth.getCurrentUser()).toBeNull()
    await expect(repos.requests.list()).rejects.toThrow(/melde dich/)
    await expect(repos.auth.login({ email: demoAccounts[0].email, password: 'wrong' })).rejects.toThrow(/Zugangsdaten/)
    for (const account of demoAccounts) {
      const session = await repos.auth.login({ email: account.email, password: demoPassword })
      expect(session.role).toBe(account.role)
      await repos.auth.logout()
      expect(repos.auth.getCurrentUser()).toBeNull()
      await expect(repos.offers.list()).rejects.toThrow(/melde dich/)
    }
  })

  it('creates isolated identities and makes a new business usable in offer comparison', async () => {
    const repos = createMockRepositories()
    const customer = await repos.auth.registerCustomer(registration)
    expect(await repos.requests.list()).toEqual([])
    const request = await repos.requests.create({
      categoryId: 'painting', regionId: 'steyr', postalCode: '4400', urgency: 'Flexibel',
      title: 'Wand ausmalen', description: 'Eine Wand im Wohnzimmer soll neu gestrichen werden.',
    })
    const business = await repos.auth.registerBusiness({
      ...registration, businessName: 'Musterbetrieb', categoryIds: ['painting', 'repair'], regionId: 'steyr',
    })
    expect(business).toMatchObject({ role: 'BUSINESS' })
    expect(business.userId).not.toBe(customer.userId)
    expect(JSON.stringify(repos.auth.getCurrentUser())).not.toContain(registration.password)
    await repos.offers.submit({ requestId: request.id, amount: 200, message: 'Inklusive Material und Vorbereitung.', priceType: 'FIXED' })
    const [offer] = await repos.offers.list(request.id)
    expect(offer.business).toMatchObject({ name: 'Musterbetrieb', categoryIds: ['painting', 'repair'] })
    await expect(repos.requests.contact(request.id)).rejects.toThrow(/ausgewählten Betrieb/)
    await repos.auth.logout()
    await expect(repos.auth.login(registration)).rejects.toThrow(/Zugangsdaten/)
  })

  it('redirects guests, signed-in guests and mismatched roles to the correct pages', () => {
    expect(accessRedirect(undefined, 'GUEST')).toBeNull()
    expect(accessRedirect(undefined, 'CUSTOMER')).toBe('/login')
    expect(accessRedirect(undefined, 'BUSINESS')).toBe('/login')
    expect(accessRedirect('BUSINESS', 'CUSTOMER')).toBe('/betrieb/dashboard')
    expect(accessRedirect('CUSTOMER', 'BUSINESS')).toBe('/dashboard')
    expect(accessRedirect('CUSTOMER', 'GUEST')).toBe('/dashboard')
    expect(accessRedirect('BUSINESS', 'BUSINESS')).toBeNull()
  })

  it('preserves a customer request intent and ignores external destinations', () => {
    expect(parseLoginSearch({ next: '/auftrag-erstellen', category: 'painting' })).toEqual({ next: '/auftrag-erstellen', category: 'painting' })
    expect(parseLoginSearch({ next: '//example.invalid', category: 'painting' }).next).toBeUndefined()
    expect(destinationAfterLogin('CUSTOMER', '/auftrag-erstellen')).toBe('/auftrag-erstellen')
    expect(destinationAfterLogin('BUSINESS', '/auftrag-erstellen')).toBe('/betrieb/dashboard')
  })
})
