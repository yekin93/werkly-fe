import type { OfferDto } from '../../../types/domain'
export function compareOffers(offers: OfferDto[], order: 'price' | 'name'): OfferDto[] {
  return [...offers].sort((a, b) => order === 'price'
    ? a.amount - b.amount
    : a.business.name.localeCompare(b.business.name, 'de-AT'))
}
