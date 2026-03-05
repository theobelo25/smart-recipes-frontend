import { ChangePasswordForm } from "@/src/features/dashboard/components";

export default function ChangePasswordPage() {
  return (
    <div className="flex flex-col items-center w-full bg-bg">
      <main className="flex w-full flex-col items-center justify-center px-6 sm:px-8 md:px-10 xl:px-24">
        <section className="grid grid-cols-1 gap-8 w-full max-w-2xl">
          <ChangePasswordForm />
        </section>
      </main>
    </div>
  );
}
