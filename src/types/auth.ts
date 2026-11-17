import type { DemoSession } from './domain'

export interface LoginInput { email: string; password: string }
export interface CustomerRegistrationInput extends LoginInput {
  firstName: string
  lastName: string
  confirmation: string
  consent: boolean
}
export interface BusinessRegistrationInput extends CustomerRegistrationInput {
  businessName: string
  categoryIds: string[]
  regionId: string
}
export interface AuthRepository {
  login(input: LoginInput): Promise<DemoSession>
  registerCustomer(input: CustomerRegistrationInput): Promise<DemoSession>
  registerBusiness(input: BusinessRegistrationInput): Promise<DemoSession>
  logout(): Promise<void>
  getCurrentUser(): DemoSession | null
}
