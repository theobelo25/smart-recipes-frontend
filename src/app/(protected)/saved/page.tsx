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
    <section className="px-64">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Saved Recipes</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SavedRecipesTable recipes={recipes} isRecipePage={true} />
        </CardContent>
      </Card>
    </section>
  );
}
