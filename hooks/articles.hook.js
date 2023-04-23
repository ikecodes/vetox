import API, { API2 } from "@/api/api"
import { articlesPagination } from "@/jotai/articles.state"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAtomValue } from "jotai"

export function useGetAllArticles() {
  const { page, pageSize } = useAtomValue(articlesPagination)
  // let filters = new URLSearchParams(filter)
  return useQuery({
    queryKey: [
      "getAllArticles",
      page,
      pageSize,
      // filter.categorySlug,
      // filter.subCategorySlug,
    ],
    queryFn: () =>
      API.get(`/articles/all-articles?page=${page}&pageSize=${pageSize}`),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}

export function useGetFeaturedArticles() {
  return useQuery(["getAdminArticles"], () => API.get(`/articles/featured`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}

export function useGetArticle(id) {
  return useQuery(["getArticle", id], () => API.get(`/articles/${id}`), {
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}


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
