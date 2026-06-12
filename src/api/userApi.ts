import type { UserFormValues } from "../components/auth/UserForm";
import { api } from "./api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/user";

export async function updateProfileRequest(user: UserFormValues) {
  const response = await api.put(BASE_URL, user);
  return response.data;
}

export async function getDashboardUsers() {
  const response = await api.get(BASE_URL + "/dashboard");
  return response.data;
}

export async function getUserProfileStat(userId: number) {
  const response = await api.get(BASE_URL + `/profile/${userId}`);
  return response.data;
}
