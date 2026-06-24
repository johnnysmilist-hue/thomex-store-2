"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

const AUTH_STORAGE_KEY = "thomex_auth_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    try {
      const users = JSON.parse(localStorage.getItem("thomex_users") || "[]");
      const found = users.find((u: User & { password: string }) => u.email === email && u.password === password);
      if (!found) return false;

      const { password: _, ...userWithoutPassword } = found;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return true;
    } catch {
      return false;
    }
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    try {
      const users = JSON.parse(localStorage.getItem("thomex_users") || "[]");
      if (users.some((u: User) => u.email === data.email)) return false;

      const newUser: User & { password: string } = {
        id: "user_" + Date.now(),
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        createdAt: new Date().toISOString(),
        password: data.password,
      };

      users.push(newUser);
      localStorage.setItem("thomex_users", JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}