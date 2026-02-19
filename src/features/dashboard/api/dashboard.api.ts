import { authAxios } from "../../auth";
import { baseAxios } from "@/src/shared/lib";
import { ChangePasswordDto, EditProfileDto } from "../types";

export const getProfile = async () => {
  const { data } = await authAxios.get("/users/me");
  return data;
};

export const editProfile = async (
  editProfileDto: EditProfileDto,
  token: string | null,
) => {
  const response = await baseAxios.patch(
    "/users/edit-profile",
    editProfileDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

export const changePassword = async (
  changePasswordDto: ChangePasswordDto,
  token: string | null,
) => {
  const response = await baseAxios.patch(
    "/users/change-password",
    changePasswordDto,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};
