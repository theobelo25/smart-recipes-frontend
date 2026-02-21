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
import { EditProfileDto, editProfileSchema } from "../types";
import { useAuthStore } from "../../auth";
import { editProfile } from "../api/dashboard.api";

export function EditProfileForm() {
  const router = useRouter();
  const { setUser, user } = useAuthStore((s) => s);

  const form = useForm<EditProfileDto>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username,
    },
  });

  async function onSubmit(data: EditProfileDto) {
    try {
      const response = await editProfile(data);

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
          <h2>Edit Profile</h2>
        </CardTitle>
        <CardDescription>
          Make changes to your display name and avatar!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Name</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
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
