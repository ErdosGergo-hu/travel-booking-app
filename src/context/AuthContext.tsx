import { createContext } from "react";

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl: string;
  finishedAuctions?: number;
  currentAuctions?: number;
  earnings?: number;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
