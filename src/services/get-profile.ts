import { api } from "@/lib/api";
import type { User } from "@/types/user";

type ResponseType = User;

export async function getProfile() {
  const res = await api.get<ResponseType>("/auth/profile");

  return res.data;
}
