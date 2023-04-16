import axios from "axios";

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
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default API;
