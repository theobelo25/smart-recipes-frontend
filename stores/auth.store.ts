import { create } from "zustand";

import { User } from "@/types/user.types";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isInitialized: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setInitialized: (value: boolean) => void;
  signout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isInitialized: false,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setInitialized: (value) => set({ isInitialized: value }),
  signout: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));
