import { PantryItems, SavedRecipes } from "@/src/features/dashboard/components";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center w-full bg-bg">
      <main className="flex w-full flex-col items-center justify-center px-6 sm:px-8 md:px-10 xl:px-24 sm:items-start">
        <section className="grid grid-cols-1 gap-8 w-full xl:grid-cols-2">
          <SavedRecipes className="col-span-12 xl:col-span-1" />
          <PantryItems className="col-span-12 xl:col-span-1" />
        </section>
      </main>
    </div>
  );
}
