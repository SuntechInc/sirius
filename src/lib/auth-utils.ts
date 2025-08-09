import { decodeJwt } from "jose";
import type { User, UserType } from "@/types/user";
import { clearAuthTokens, getAuthTokens } from "@/lib/storage";

type JWTPayload = {
  sub: string;
  email: string;
  userType: UserType;
  companyId: string;
  actionCompanyId: string;
  exp: number;
};

export function validateTokenAndGetUser(): User | null {
  const { accessToken } = getAuthTokens();

  if (!accessToken) {
    return null;
  }

  try {
    const decodedToken = decodeJwt<JWTPayload>(accessToken);

    // Check if token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
      clearAuthTokens();
      return null;
    }

    return {
      id: decodedToken.sub,
      email: decodedToken.email,
      userType: decodedToken.userType,
      companyId: decodedToken.companyId,
      actionCompanyId: decodedToken.actionCompanyId,
    };
  } catch {
    clearAuthTokens();
    return null;
  }
}

export function isTokenExpired(): boolean {
  const { accessToken } = getAuthTokens();

  if (!accessToken) {
    return true;
  }

  try {
    const decodedToken = decodeJwt<JWTPayload>(accessToken);
    return decodedToken.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}
