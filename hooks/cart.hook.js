import API, { API2 } from "@/api/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetCarts() {
  return useQuery(["getCarts"], () => API2.get(`/cart`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useCreateCart = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API2.post("/cart", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCarts"])
    },
  })
}
export const useDeleteCart = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => API2.delete(`/cart/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCarts"])
    },
  })
}
