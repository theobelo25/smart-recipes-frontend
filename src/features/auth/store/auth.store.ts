import { create } from "zustand";
import { User } from "../types";
import { AuthManager } from "@/src/shared/lib/auth/auth.manager";

interface AuthState {
  accessToken: string | null;
  authManager: AuthManager | null;
  isInitialized: boolean;
  user: User | null;

  setAccessToken: (token: string | null) => void;
  setAuthManager: (mgr: AuthManager) => void;
  setInitialized: (value: boolean) => void;
  setUser: (value: User | null) => void;
  signout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  authManager: null,
  isInitialized: false,
  user: null,

  setAccessToken: (token) => {
    set({ accessToken: token });
    get().authManager?.onTokenUpdated(token);
  },
  setAuthManager: (mgr) => set({ authManager: mgr }),
  setInitialized: (value) => set({ isInitialized: value }),
  setUser: (value) => set({ user: value }),
  signout: () => {
    set({
      accessToken: null,
      user: null,
      isInitialized: true,
    });
    get().authManager?.clear();
  },
}));
