import axios from "axios";
import { getAuthTokens } from "./storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback;
};

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
  (error) => {
    if (error.response?.status === 401) {
      logoutCallback?.();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
