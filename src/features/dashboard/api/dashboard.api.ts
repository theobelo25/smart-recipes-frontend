import { authAxios } from "../../auth";
import { ChangePasswordDto, EditProfileDto } from "../types";

export const editProfile = async (editProfileDto: EditProfileDto) => {
  const response = await authAxios.patch("/users/me", editProfileDto);
  return response;
};

export const changePassword = async (changePasswordDto: ChangePasswordDto) => {
  const response = await authAxios.patch(
    "/auth/change-password",
    changePasswordDto,
  );
  return response;
};
