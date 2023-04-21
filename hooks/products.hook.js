import API, { API2 } from "@/api/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export function useGetProduct(id) {
  return useQuery(["getProduct", id], () => API.get(`/products/${id}`), {
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}

export function useGetAllProducts() {
  return useQuery(["getProducts"], () => API.get(`/products`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}



export function useGetProducts() {
  return useQuery(["getAdminProducts"], () => API.get(`/products`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API.post("/products", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"])
    },
  })
}
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => API.delete(`/products/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"])
    },
  })
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation((data) => API.patch(`/products`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"])
    },
  })
}
