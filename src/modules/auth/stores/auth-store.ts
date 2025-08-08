import { create } from "zustand";
import Cookies from "js-cookie";
import type { User } from "@/lib/auth";

function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const userCookie = Cookies.get("user");
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie) as User;
  } catch {
    return null;
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get("auth-token") || null;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: getUser(),
  token: getToken(),
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  signOut: () => {
    Cookies.remove("user");
    Cookies.remove("access_token");
    set({ user: null, token: null });
  },
}));
