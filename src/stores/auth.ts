import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "@/types/auth";

interface AuthStore {
  user: User | null;
  token: string | null;
  profile_picture: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  signOut: () => void;
  setProfilePicture: (profile_picture: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      profile_picture: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setProfilePicture: (profile_picture) => set({ profile_picture }),
      signOut: () => set({ user: null, token: null }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
