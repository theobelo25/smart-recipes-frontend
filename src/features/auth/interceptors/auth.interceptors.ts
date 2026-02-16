import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refresh } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/**
 * -----------------------------
 * REFRESH LOCK STATE
 * -----------------------------
 */
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

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
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /**
     * If already refreshing → queue this request
     */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return authAxios(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    /**
     * Start refresh
     */
    isRefreshing = true;

    try {
      const { accessToken } = await refresh();

      useAuthStore.getState().setAccessToken(accessToken);

      processQueue(null, accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return authAxios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      useAuthStore.getState().signout();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
