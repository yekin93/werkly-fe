export type ServiceRequestStatus = 'OPEN' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED'
export type OfferStatus = 'SUBMITTED' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'
export type OfferPriceType = 'FIXED' | 'ESTIMATE'
export interface User { id: string; role: 'CUSTOMER' | 'BUSINESS'; name: string }
export interface Business { id: string; userId: string; name: string; email: string; phone: string }
export interface BusinessProfile { id: string; name: string; categoryId: string; description: string; location: string }
export type PublicBusinessDto = BusinessProfile
export interface ServiceCategory { id: string; name: string; icon: string; description: string }
export interface ServiceRegion { id: string; name: string; postalCodes: string[]; active: boolean; areaLabel: string }
export interface ServiceRequestAttachment { id: string; name: string; type: string; size: number }
export interface ServiceRequestPreviewDto { id: string; title: string; description: string; categoryId: string; regionId: string; urgency: string; status: ServiceRequestStatus; attachments: ServiceRequestAttachment[] }
export interface ServiceRequest extends ServiceRequestPreviewDto { customerId: string; fullName: string; email: string; phone: string; address: string }
export type CustomerServiceRequestDto = ServiceRequest
export interface Offer { id: string; requestId: string; businessId: string; amount: number; priceType: OfferPriceType; message: string; status: OfferStatus }
export interface OfferDto extends Offer { business: PublicBusinessDto }
export interface OfferAcceptance { id: string; requestId: string; offerId: string; businessId: string }
export interface AcceptedJobContactDto { fullName: string; email: string; phone: string; address: string }
export interface DemoSession { role: 'CUSTOMER' | 'BUSINESS'; userId: string; businessId?: string }
export interface CreateRequestInput { categoryId: string; regionId: string; postalCode: string; title: string; description: string; urgency: string; attachments?: ServiceRequestAttachment[] }
