import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "@/lib/api";
import { getAuthTokens } from "@/lib/storage";
import type { User } from "@/types/user";

type ResponseType = {
  message: string;
  user: User;
};

export function useCheckAuth(user: User | null) {
  return useQuery<ResponseType, AxiosError>({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { accessToken } = getAuthTokens();

      if (!accessToken) {
        throw new Error("No tokens");
      }

      if (accessToken) {
        const res = await api.get<ResponseType>("/auth/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return res.data;
      }

      throw new Error("No valid tokens");
    },
    enabled: !user && !!getAuthTokens().accessToken,
    retry: false,
    staleTime: Infinity,
  });
}
