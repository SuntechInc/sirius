import Cookies from "js-cookie";
import type { AuthTokens } from "@/types/auth";

const COOKIE_OPTIONS = {
  secure: import.meta.env.PROD,
  sameSite: "strict" as const,
  path: "/",
};

export function setAuthTokens(tokens: AuthTokens) {
  Cookies.set("accessToken", tokens.accessToken, {
    ...COOKIE_OPTIONS,
    expires: new Date(tokens.expiresIn * 1000),
  });

  if (tokens.refreshToken) {
    Cookies.set("refreshToken", tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      expires: 30, // 30 days for refresh token
    });
  }
}

export function getAuthTokens() {
  return {
    accessToken: Cookies.get("accessToken"),
    refreshToken: Cookies.get("refreshToken"),
  };
}

export function clearAuthTokens() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}
