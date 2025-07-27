import { useQueryClient } from "@tanstack/react-query";
import { decodeJwt } from "jose";
import { createContext, type ReactNode, useCallback, useEffect } from "react";
import { useCheckAuth } from "@/hooks/use-check-auth";
import { useLoginMutation } from "@/hooks/use-login";
import { useAuthStore } from "@/lib/auth-store";
import { clearAuthTokens, setAuthTokens } from "@/lib/storage";
import type { User, UserType } from "@/types/user";

type UserPayload = {
  sub: string;
  email: string;
  companyId: string;
  actionCompanyId: string;
  userType: UserType;
  iat: number;
  exp: number;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const {
    user,
    isAuthenticated,
    loading,
    error,
    setUser,
    setLoading,
    setError,
    clearAuth,
  } = useAuthStore();

  const { data: authUser, isLoading: isCheckingAuth } = useCheckAuth(user);

  const loginMutation = useLoginMutation();

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      await loginMutation.mutateAsync(input, {
        onSuccess: (data) => {
          const payload = decodeJwt(data.accessToken) as unknown as UserPayload;

          setAuthTokens({
            accessToken: data.accessToken,
            expiresIn: payload.exp,
          });

          setUser({
            id: payload.sub,
            email: payload.email,
            actionCompanyId: payload.actionCompanyId,
            companyId: payload.companyId,
            userType: payload.userType,
          });
          setError(null);
          queryClient.invalidateQueries();
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Erro ao fazer login";
          setError(message);
        },
      });
    },
    [loginMutation, queryClient, setError, setUser],
  );

  const logout = useCallback(async () => {
    clearAuth();
    clearAuthTokens();
    queryClient.clear();
  }, [clearAuth, queryClient]);

  useEffect(() => {
    if (authUser && !user) {
      setUser(authUser.user);
    }
  }, [authUser, user, setUser]);

  useEffect(() => {
    const isLoading = isCheckingAuth || loginMutation.isPending;
    if (loading !== isLoading) {
      setLoading(isLoading);
    }
  }, [isCheckingAuth, loginMutation.isPending, loading, setLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { type AuthContextType, AuthContext, AuthProvider };
