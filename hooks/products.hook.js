import API, { API2 } from "@/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useGetProducts() {
  return useQuery(["getAdminProducts"], () => API.get(`/products`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API2.post("/products", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"])
    },
  })
}
