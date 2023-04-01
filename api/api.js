import axios from "axios";

let url = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5000/api/v1";

const API = axios.create({
  baseURL: url,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

export default API;
