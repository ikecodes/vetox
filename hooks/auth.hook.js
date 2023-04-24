import API, { API2 } from "@/apiService/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetMessages() {
  return useQuery(["getAdminMessages"], () => API2.get(`/messages`), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 20,
  })
}
export const useSignUp = () => {
  return useMutation((data) => API2.post("/auth/sign-up", data))
}
export const useSignIn = () => {
  return useMutation((data) => API2.post("/auth/sign-in", data))
}
