import { z } from "zod";

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^[a-zA-Z\s]*$/, {
        message: "Name must contain only letters.",
      })
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be at most 50 characters."),
    email: z.email("Invalid email address.").trim(),
    password: z
      .string()
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/, {
        message:
          "Password must at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character from the following !@#$%^&*.",
      })
      .min(8, "Password must be at least 6 characters.")
      .max(35, "Password must be at mist 35 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 6 characters.")
      .max(35, "Password must be at mist 35 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupDto = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.email("Invalid email address.").trim(),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,32}$/, {
      message:
        "Password must at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character from the following !@#$%^&*.",
    })
    .min(8, "Password must be at least 6 characters.")
    .max(35, "Password must be at mist 35 characters"),
});

export type SigninDto = z.infer<typeof signinSchema>;

export type SigninResponse = {
  accessToken: string;
  user: User;
};
