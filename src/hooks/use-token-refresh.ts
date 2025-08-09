import { useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getAuthTokens, setAuthTokens } from "@/lib/storage";
import { refreshAccessToken } from "@/services/refresh-token";

export function useTokenRefresh() {
  const { logout } = useAuth();

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const { refreshToken } = getAuthTokens();

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const { accessToken, expiresIn } = await refreshAccessToken(refreshToken);

      setAuthTokens({
        accessToken,
        refreshToken,
        expiresIn,
      });

      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      await logout();
      return false;
    }
  }, [logout]);

  return { refreshToken };
}
