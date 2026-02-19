import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z\\s-]+$/, {
      message: "Name must contain only alphabetic characters",
    })
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
});

export type EditProfileDto = z.infer<typeof editProfileSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/, {
        message:
          "Password must at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character from the following !@#$%^&*.",
      })
      .min(8, "Password must be at least 6 characters.")
      .max(35, "Password must be at mist 35 characters"),
    newPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/, {
        message:
          "Password must at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character from the following !@#$%^&*.",
      })
      .min(8, "Password must be at least 6 characters.")
      .max(35, "Password must be at mist 35 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 6 characters.")
      .max(35, "Password must be at mist 35 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
