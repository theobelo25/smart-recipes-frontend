"use client";
import { Button } from "@/src/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/ui/field";
import { Input } from "@/src/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { ChangePasswordDto, changePasswordSchema } from "../types";
import { useAuthStore } from "../../auth";
import { changePassword } from "../api/dashboard.api";

export function ChangePasswordForm() {
  const router = useRouter();
  const { accessToken, setUser } = useAuthStore((s) => s);

  const form = useForm<ChangePasswordDto>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(data: ChangePasswordDto) {
    try {
      const response = await changePassword(data, accessToken);

      setUser(response.data);

      router.replace("/dashboard");
      router.refresh();
    } catch {
      console.error("Invalid credentials");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h2>Change Password</h2>
        </CardTitle>
        <CardDescription>Update your password!</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="oldPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
                  <Input
                    {...field}
                    id="oldPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Old password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <Input
                    {...field}
                    id="newPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="New password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmNewPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmNewPassword">
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmNewPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm new password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="signup-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing up..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
