import axios from "axios";
import { clearAuthTokens, getAuthTokens } from "./storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthTokens();

    const isLoginRoute = config.url?.includes("/auth/login");

    if (accessToken && !isLoginRoute) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      clearAuthTokens();

      window.location.href = "/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default api;
