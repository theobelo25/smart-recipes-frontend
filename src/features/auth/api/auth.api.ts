import { baseAxios } from "@/src/shared/lib/axios";
import { LoginDto, SignupDto } from "../types";
import axios from "axios";

export const signup = async (signupDto: SignupDto) => {
  const { data } = await baseAxios.post("/auth/signup", signupDto);
  return data;
};

export const signin = async (loginDto: LoginDto) => {
  const { data } = await baseAxios.post("/auth/signin", loginDto);
  return data;
};

export const signout = async () => {
  await axios.post("/auth/signout");
};

export const refresh = async () => {
  const { data } = await baseAxios.post("/auth/refresh");
  return data;
};
