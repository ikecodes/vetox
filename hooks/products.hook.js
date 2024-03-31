import API, { API2 } from "@/apiService/api";
import { productsPagination } from "@/jotai/products.state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export function useGetAllProducts() {
  const { page, pageSize, ...filter } = useAtomValue(productsPagination);
  let filters = new URLSearchParams(filter);
  return useQuery({
    queryKey: [
      "getAllProducts",
      page,
      pageSize,
      filter.categorySlug,
      filter.subCategorySlug,
    ],
    queryFn: () =>
      API.get(
        `/products/all-products?page=${page}&pageSize=${pageSize}&${filters.toString()}`
      ),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  });
}

export function useGetFeaturedProducts() {
  return useQuery(
    ["getFeaturedProducts"],
    () => API.get(`/products/featured`),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 20,
    }
  );
}

export function useGetProduct(id) {
  return useQuery(["getProduct", id], () => API.get(`/products/${id}`), {
    refetchOnWindowFocus: false,
    enabled: !!id,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  });
}

export function useGetProducts() {
  return useQuery(["getAdminProducts"], () => API.get(`/products`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  });
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => API.post("/products", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"]);
      queryClient.invalidateQueries(["getFeaturedProducts"]);
    },
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => API.delete(`/products/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"]);
    },
  });
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => API.patch(`/products`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAdminProducts"]);
    },
  });
};
