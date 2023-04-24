import axios from "axios";
import { store } from "@/slices"
let url = "/api"

const API = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "multipart/form-data",
    Accept: "Application/json",
  },
})

export const API2 = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    Accept: "Application/json",
  },
})

export const logStore = () => {
  console.log("STORE", store.getState().user?.value?.token)
}

API.interceptors.request.use((req) => {
  if (store.getState().user) {
    req.headers.Authorization = `Bearer ${store.getState().user?.value?.token}`
  }
  return req
})
API2.interceptors.request.use((req) => {
  if (store.getState().user) {
    req.headers.Authorization = `Bearer ${store.getState().user?.value?.token}`
  }
  return req
})

export default API;
