import { useApiMutation } from "@/lib/react-query-utils";

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
  return useApiMutation<ResponseType, RequestType>("POST", "/auth/login");
}
