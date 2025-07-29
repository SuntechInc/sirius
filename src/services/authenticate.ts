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

export async function authenticate(data: RequestType) {
  const res = await api.post<ResponseType>("/auth/login", data);

  return res.data;
}
