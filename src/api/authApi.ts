import { api } from "../api/api";

export async function login(email: string, password: string): Promise<void> {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  console.log("response data: ", response.data);
  sessionStorage.setItem("user", JSON.stringify(response.data.user));
  return response.data;
}

export async function logout() {
  console.log("Logout started");
  try {
    await api.post("/auth/logout");
  } catch (e) {
    console.warn("Backend logout failed, clearing local tokens anyway", e);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
  }
}
