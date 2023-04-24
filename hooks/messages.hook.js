import API, { API2 } from "@/apiService/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetMessages() {
  return useQuery(["getAdminMessages"], () => API2.get(`/messages`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useCreateMessage = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API2.post("/messages", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminMessages"])
    },
  })
}
export const useDeleteMessage = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => API2.delete(`/messages/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminMessages"])
    },
  })
}
