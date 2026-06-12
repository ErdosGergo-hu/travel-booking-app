import { useEffect, useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  type ResponseData,
} from "../api/authApi";
import { api } from "../api/api";
import type { UserFormValues } from "../components/auth/UserForm";
import { updateProfileRequest } from "../api/userApi";

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
    avatarUrl: string,
  ): Promise<void> {
    const data: ResponseData = await registerRequest(
      username,
      email,
      password,
      avatarUrl,
    );
    setAuthInfo(data);
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

  async function updateProfile(userFormValues: UserFormValues): Promise<void> {
    try {
      const data = await updateProfileRequest(userFormValues);
      console.log("Profile updated: ", data);
      setUser(data);
    } catch (error) {
      console.error("Profile update failed: ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
