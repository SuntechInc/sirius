import axios from "axios";
import { getAuthTokens, setAuthTokens, clearAuthTokens } from "@/lib/storage";
import { refreshAccessToken } from "@/services/refresh-token";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const { accessToken } = getAuthTokens();

    const isLoginRoute = config.url?.includes("/auth/login");
    const isRefreshRoute = config.url?.includes("/auth/refresh");

    if (accessToken && !isLoginRoute && !isRefreshRoute) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Para rotas de login, não tentar refresh token
    const isLoginRoute = originalRequest.url?.includes("/auth/login");
    if (isLoginRoute) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getAuthTokens();
        if (refreshToken) {
          const { accessToken, expiresIn } =
            await refreshAccessToken(refreshToken);
          setAuthTokens({ accessToken, refreshToken, expiresIn });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }

        // Se não há refresh token, apenas limpar os tokens
        // O redirecionamento será tratado pelo componente
        clearAuthTokens();
      } catch {
        // Se o refresh falhar, apenas limpar os tokens
        // O redirecionamento será tratado pelo componente
        clearAuthTokens();
      }
    }

    return Promise.reject(error);
  }
);
