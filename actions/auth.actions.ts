import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

interface ILoginUser {
  email: string;
  password: string;
}

export async function loginUser(data: ILoginUser) {
  try {
    const response = await fetch("http://localhost:3333/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
