import { SigninForm } from "@/src/features/auth";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-bg">
      <main className="flex min-h-screen w-full max-w-3xl flex-row items-center justify-center py-32 px-16 sm:items-start">
        <SigninForm />
      </main>
    </div>
  );
}
