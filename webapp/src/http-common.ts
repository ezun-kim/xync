import axios, { AxiosInstance } from "axios";
import store from "@/store";

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(config => {
    const isAuthenticated = store.getters["isAuthenticated"]
    if (isAuthenticated) {
      config.headers.common["Authorization"] = `Bearer ${store.getters["accessToken"].token}`
    }
    console.log("header token : ", store.getters["accessToken"].token)
    return config
  },
  error => {
    Promise.reject(error)
  }
)
http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"


export default http;
