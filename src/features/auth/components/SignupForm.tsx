"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "@/src/features/auth";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/ui/field";
import { Input } from "@/src/shared/ui/input";
import { Button } from "@/src/shared/ui/button";
import { useAuthStore, signupSchema, SignupDto } from "@/src/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const form = useForm<SignupDto>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupDto) {
    try {
      const { accessToken } = await signup(data);
      setAccessToken(accessToken);
      const redirectParam = searchParams.get("redirect");
      const redirectTo =
        redirectParam && redirectParam.startsWith("/")
          ? redirectParam
          : "/dashboard";

      router.replace(redirectTo);

      // optional but can help ensure middleware/cookie state is re-evaluated:
      router.refresh();
    } catch {
      console.error("Invalid credentials");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h1>Signup</h1>
        </CardTitle>
        <CardDescription>
          Create an account to start generating recipes!
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
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
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
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm password"
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
          <p className="block w-full">
            Already have an account? <Link href="/signin">Signin</Link> instead!
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={form.formState.isSubmitting}
          >
            Reset
          </Button>
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
