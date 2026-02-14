"use client";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth.store";

//
// --------------------
// INIT AXIOS
// --------------------
//
export const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true, // VERY IMPORTANT (refresh cookie)
});

// Raw instance bypassing interceptors
export const apiRaw = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true,
});

//
// --------------------
// REQUEST INTERCEPTOR
// --------------------
//
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//
// --------------------
// RESPONSE INTERCEPTOR (Refresh Logic)
// --------------------
//
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    console.log("Res Interceptor Start", useAuthStore.getState());
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }
      console.log("Res Interceptor Middle", useAuthStore.getState());
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post("/auth/refresh");

        const newAccessToken = response.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    console.log("Res Interceptor End", useAuthStore.getState());
    return Promise.reject(error);
  },
);
