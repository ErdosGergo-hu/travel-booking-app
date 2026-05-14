import { api } from "../api/api";
import type { User } from "../context/AuthContext";

export type ResponseData = {
  accessToken: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
  tokenType: string;
};

export async function registerRequest(
  username: string,
  email: string,
  password: string,
): Promise<ResponseData> {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function loginRequest(
  email: string,
  password: string,
): Promise<ResponseData> {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function logoutRequest() {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    console.warn("Backend logout failed, clearing local tokens anyway", e);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
