import { createContext } from "react";
import type { UserFormValues } from "../components/auth/UserForm";

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl: string;
  finishedAuctions?: number;
  activeListings?: number;
  earnings?: number;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    avatarUrl: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userFormValues: UserFormValues) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
