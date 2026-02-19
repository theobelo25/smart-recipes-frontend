import { baseAxios } from "@/src/shared/lib/axios";
import { authAxios } from "../interceptors/auth.interceptors";
import { SigninDto, SigninResponse, SignupDto } from "../types";

export const signup = async (signupDto: SignupDto) => {
  const { data } = await baseAxios.post("/auth/signup", signupDto, {
    withCredentials: true,
  });
  return data;
};

export const signin = async (signinDto: SigninDto): Promise<SigninResponse> => {
  const response = await baseAxios.post("/auth/signin", signinDto, {
    withCredentials: true,
  });

  return response.data;
};

export const signout = async () => {
  await baseAxios.post("/auth/signout");
};

export const refresh = async () => {
  const { data } = await authAxios.post("/auth/refresh");
  return data;
};
