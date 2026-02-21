import { baseAxios } from "@/src/shared/lib/axios";
import { SigninDto, SigninResponse, SignupDto } from "../types";

export const signup = async (signupDto: SignupDto) => {
  const { data } = await baseAxios.post("/auth/signup", signupDto);
  return data;
};

export const signin = async (signinDto: SigninDto): Promise<SigninResponse> => {
  const { data } = await baseAxios.post("/auth/signin", signinDto);
  return data;
};

export const signout = async () => {
  await baseAxios.post("/auth/signout");
};

export const refresh = async () => {
  const { data } = await baseAxios.post("/auth/refresh");
  return data;
};
