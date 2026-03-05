import axios from "axios";
import { showServerErrorToast } from "./server-error-toast";
import { API_BASE_URL } from "./env";

export const baseAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    showServerErrorToast(error);
    return Promise.reject(error);
  },
);
