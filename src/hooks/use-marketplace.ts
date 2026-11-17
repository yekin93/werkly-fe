import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { repositories } from '../services/repositories'
export const useCategories = () => useQuery({queryKey:['categories'],queryFn:()=>repositories.requests.categories()})
export const useRequests = () => useQuery({queryKey:['requests'],queryFn:()=>repositories.requests.list()})
export const useOffers = (id?: string) => useQuery({queryKey:['offers',id],queryFn:()=>repositories.offers.list(id)})
export const useBusinesses = () => useQuery({queryKey:['businesses'],queryFn:()=>repositories.business.list()})
export function useMarketplaceMutation<T>(action: (value: T)=>Promise<unknown>) { const client=useQueryClient();return useMutation({mutationFn:action,onSuccess:()=>client.invalidateQueries()}) }
