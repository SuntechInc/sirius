import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "@/lib/api";

type ResponseType = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

type RequestType = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  return useMutation<ResponseType, AxiosError, RequestType>({
    mutationFn: async (json) => {
      const res = await api.post<ResponseType>("/auth/login", json);

      return res.data;
    },
  });
}
