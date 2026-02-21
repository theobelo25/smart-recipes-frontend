import {
  GenerateRecipes,
  MealPlans,
  PantryItems,
  SavedRecipes,
  ShoppingList,
} from "@/src/features/dashboard/components";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center w-full bg-bg">
      <main className="flex w-full flex-col items-center justify-center px-64 sm:items-start">
        <section className="grid grid-cols-12 gap-8 w-full">
          <SavedRecipes className="col-span-4" />
          <PantryItems className="col-span-4" />
          <GenerateRecipes className="col-span-4" />
          <MealPlans className="col-span-8" />
          <ShoppingList className="col-span-4" />
        </section>
      </main>
    </div>
  );
}
