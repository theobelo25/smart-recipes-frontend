"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "@/src/features/auth";

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
import { useAuthStore, signinSchema, SigninDto } from "@/src/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
export function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const form = useForm<SigninDto>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SigninDto) {
    try {
      const { accessToken } = await signin(data);
      setAccessToken(accessToken);
      const redirectParam = searchParams.get("redirect");
      const redirectTo =
        redirectParam && redirectParam.startsWith("/")
          ? redirectParam
          : "/dashboard";

      router.replace(redirectTo);
      router.refresh();
    } catch {
      console.error("Invalid credentials");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <h1>Signin</h1>
        </CardTitle>
        <CardDescription>
          Log in to your account to keep finding recipes!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
                    type="password"
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <p className="block w-full">
            Don&apos;t have an account? <Link href="/signup">Signup</Link>{" "}
            instead!
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
            form="signin-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
