import axios from "axios";
import { showServerErrorToast } from "./server-error-toast";

export const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    showServerErrorToast(error);
    return Promise.reject(error);
  },
);
