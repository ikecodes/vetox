import API, { API2 } from "@/apiService/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetReviews(id) {
  return useQuery(["getReviews", id], () => API2.get(`/reviews/${id}`), {
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useCreateReview = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API2.post("/reviews", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getReviews"])
    },
  })
}
export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => API2.delete(`/reviews/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getReviews"])
    },
  })
}
