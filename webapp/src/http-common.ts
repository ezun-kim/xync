import axios, { AxiosInstance } from "axios";
import store from "@/store";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(config => {
    const isAuthenticated = store.getters["isAuthenticated"]
    if (isAuthenticated) {
      config.headers.common["Authorization"] = store.getters["getAccessToken"]
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
apiClient.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"


export default apiClient;
