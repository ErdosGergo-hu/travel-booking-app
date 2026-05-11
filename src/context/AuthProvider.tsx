import { useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import { loginRequest, logoutRequest } from "../api/authApi";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string): Promise<void> {
    try {
      const response = await loginRequest(email, password);
      setUser(response);
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
