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
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const { accessToken } = getAuthTokens();

    if (accessToken) {
      const decodedToken = decodeJwt<JWTPayload>(accessToken);

      return {
        id: decodedToken.sub,
        email: decodedToken.email,
        userType: decodedToken.userType,
        companyId: decodedToken.companyId,
        actionCompanyId: decodedToken.actionCompanyId,
      };
    }

    return null;
  });
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    clearAuthTokens();
    setUser(null);
  }, []);

  const login = React.useCallback(async (accessToken: string) => {
    const decodedToken = decodeJwt<JWTPayload>(accessToken);

    setAuthTokens({
      accessToken,
      expiresIn: decodedToken.exp,
    });

    setUser({
      id: decodedToken.sub,
      email: decodedToken.email,
      userType: decodedToken.userType,
      companyId: decodedToken.companyId,
      actionCompanyId: decodedToken.actionCompanyId,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { type AuthContextType, AuthContext, AuthProvider };
