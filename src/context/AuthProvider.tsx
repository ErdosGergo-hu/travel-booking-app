import { useEffect, useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  type ResponseData,
} from "../api/authApi";
import { api } from "../api/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem("accessToken");

  const fetchMe = async () => {
    const response = await api.get<User>("/auth/me");
    setUser(response.data);
  };

  const setAuthInfo = (data: ResponseData) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("Token: ", token);
      console.log("User: ", user);
      if (!token || user) {
        return;
      }

      await fetchMe();
    };

    initAuth();
  }, [token, user]);

  async function register(
    username: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const data: ResponseData = await registerRequest(
        username,
        email,
        password,
      );
      setAuthInfo(data);
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  }

  async function login(email: string, password: string): Promise<void> {
    try {
      const data: ResponseData = await loginRequest(email, password);
      setAuthInfo(data);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  }

  async function logout(): Promise<void> {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
