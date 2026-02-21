import { authAxios } from "../../auth";
import { ChangePasswordDto, EditProfileDto } from "../types";

export const editProfile = async (editProfileDto: EditProfileDto) => {
  const response = await authAxios.patch("/users/edit-profile", editProfileDto);
  return response;
};

export const changePassword = async (changePasswordDto: ChangePasswordDto) => {
  const response = await authAxios.patch(
    "/users/change-password",
    changePasswordDto,
  );
  return response;
};
