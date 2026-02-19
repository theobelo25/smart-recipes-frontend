import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth.store";

export const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/**
 * -----------------------------
 * REQUEST INTERCEPTOR
 * -----------------------------
 */
authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * -----------------------------
 * RESPONSE INTERCEPTOR
 * -----------------------------
 */
authAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    if (!originalRequest) return Promise.reject(error);

    // never try to refresh if the refresh endpoint itself fails
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // only handle 401s once per request
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const mgr = useAuthStore.getState().authManager;

      // If manager isn't ready yet, fail fast (app likely not initialized)
      if (!mgr) return Promise.reject(error);

      const newToken = await mgr.refreshNow();
      if (!newToken) return Promise.reject(error);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return authAxios(originalRequest);
    } catch (refreshError) {
      // AuthManager typically clears token itself on failure.
      // If you want belt-and-suspenders, you can also call signout here:
      // useAuthStore.getState().signout();
      return Promise.reject(refreshError);
    }
  },
);
