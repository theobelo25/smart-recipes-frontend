"use client";
import ActiveRecipe from "@/src/features/recipes/components/ActiveRecipe";
import { SavedRecipesTable } from "@/src/features/recipes/components/SavedRecipesTable";
import { useRecipeStore } from "@/src/features/recipes/stores/recipes.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { useEffect } from "react";

export default function SavedRecipesPage() {
  const recipes = useRecipeStore((s) => s.recipes);
  const hydrateRecipeItems = useRecipeStore((s) => s.hydrate);

  useEffect(() => {
    hydrateRecipeItems();
  }, [hydrateRecipeItems]);

  return (
    <div className="flex flex-col items-center w-full bg-bg">
      <main className="flex w-full flex-col items-center justify-center px-6 sm:px-8 md:px-10 xl:px-24 sm:items-start">
        <section className="grid grid-cols-1 gap-8 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <h3>Saved Recipes</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <SavedRecipesTable recipes={recipes} isRecipePage={true} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
