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
    expires: new Date(Date.now() + tokens.expiresIn * 1000),
  });
}

export function getAuthTokens() {
  return {
    accessToken: Cookies.get("accessToken"),
  };
}

export function clearAuthTokens() {
  Cookies.remove("accessToken");
}
