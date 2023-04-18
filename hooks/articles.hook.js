import API, { API2 } from "@/api/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetArticles() {
  return useQuery(["getAdminArticles"], () => API.get(`/articles`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API.post("/articles", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminArticles"])
    },
  })
}
export const useDeleteArticle = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => API.delete(`/articles/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminArticles"])
    },
  })
}
export const useUpdateArticle = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API.patch(`/articles`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminArticles"])
    },
  })
}
