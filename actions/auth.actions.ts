import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  userId: string;
  accessToken: string;
}

export const signup = async (data: SignupData) => {
  try {
    const { data: response } = await api.post<AuthResponse>(
      "/auth/signup",
      data,
      { withCredentials: true },
    );

    // Save access token and user in Zustand store
    const { accessToken, userId } = response;
    useAuthStore.getState().setAccessToken(accessToken);
    useAuthStore.getState().setUser({ id: userId });

    return userId;
  } catch (err: unknown) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data?.message ?? err.message);
    } else if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected error", err);
    }

    throw err;
  }
};

export async function signin(data: LoginData) {
  try {
    const { data: response } = await api.post<AuthResponse>(
      "/auth/signin",
      data,
    );

    const { accessToken, userId } = response;
    useAuthStore.getState().setAccessToken(accessToken);
    useAuthStore.getState().setUser({ id: userId });
  } catch (error) {
    console.error(error);
  }
}

export async function signout() {
  try {
    useAuthStore.getState().signout();

    const { data: response } = await api.post<AuthResponse>(
      "/auth/signout",
      {},
      { withCredentials: true },
    );

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
