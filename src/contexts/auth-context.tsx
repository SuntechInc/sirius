import { clearAuthTokens, getAuthTokens, setAuthTokens } from "@/lib/storage";
import type { User, UserType } from "@/types/user";
import { decodeJwt } from "jose";
import * as React from "react";

type JWTPayload = {
  sub: string;
  email: string;
  userType: UserType;
  companyId: string;
  actionCompanyId: string;
  exp: number;
};

interface AuthContextType {
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const { accessToken } = getAuthTokens();

    if (accessToken) {
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

    return null;
  });
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    clearAuthTokens();
    setUser(null);
  }, []);

  const login = React.useCallback(
    async (accessToken: string, refreshToken?: string) => {
      try {
        const decodedToken = decodeJwt<JWTPayload>(accessToken);

        // Check if token is already expired
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token is expired");
        }

        setAuthTokens({
          accessToken,
          refreshToken,
          expiresIn: decodedToken.exp,
        });

        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          userType: decodedToken.userType,
          companyId: decodedToken.companyId,
          actionCompanyId: decodedToken.actionCompanyId,
        });
      } catch (error) {
        clearAuthTokens();
        setUser(null);
        throw error;
      }
    },
    []
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { type AuthContextType, AuthContext, AuthProvider };
