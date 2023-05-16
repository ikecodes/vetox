import API from "@/apiService/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetHeros() {
  return useQuery(["getHeros"], () => API.get(`/hero`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useCreateHero = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API.post("/hero", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getHeros"])
    },
  })
}
export const useDeleteHero = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => API.delete(`/hero/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getHeros"])
    },
  })
}
export const useUpdateHero = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API.patch(`/hero`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getHeros"])
    },
  })
}
