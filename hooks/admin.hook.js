import API from "@/apiService/api"
import { useQuery } from "@tanstack/react-query"

export function useGetDashboard() {
  return useQuery(["getAdminDashboard"], () => API.get(`/admin/dashboard`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
