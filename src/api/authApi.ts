import { api } from "../api/api";
import type { User } from "../context/AuthContext";

export async function loginRequest(
  email: string,
  password: string,
): Promise<User> {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  console.log("login resp: ", response);
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data.user;
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
