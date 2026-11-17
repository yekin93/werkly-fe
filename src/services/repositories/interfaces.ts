import type { AcceptedJobContactDto, Business, CreateRequestInput, CustomerServiceRequestDto, OfferDto, PublicBusinessDto, ServiceCategory, ServiceRequestPreviewDto } from '../../types/domain'
export interface ServiceRequestRepository {
 categories(): Promise<ServiceCategory[]>
 list(): Promise<(CustomerServiceRequestDto | ServiceRequestPreviewDto)[]>
 create(input: CreateRequestInput): Promise<ServiceRequestPreviewDto>
 complete(id: string): Promise<void>
 contact(id: string): Promise<AcceptedJobContactDto>
}
export interface OfferRepository {
 list(requestId?: string): Promise<OfferDto[]>
 submit(input: {requestId: string; amount: number; priceType: 'FIXED' | 'ESTIMATE'; message: string}): Promise<void>
 accept(offerId: string): Promise<void>
 acceptedBusinessContact(requestId: string): Promise<Pick<Business,'name'|'phone'|'email'>>
}
export interface BusinessRepository { list(): Promise<PublicBusinessDto[]> }
export type { AuthRepository } from '../../types/auth'
