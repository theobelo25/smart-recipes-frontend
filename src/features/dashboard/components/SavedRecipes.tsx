"use client";
import { cn } from "@/src/shared/lib";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import { useRecipeStore } from "../../recipes/stores/recipes.store";
import { useEffect } from "react";
import Link from "next/link";
import { SavedRecipesTable } from "../../recipes/components/SavedRecipesTable";

export function SavedRecipes({ className }: { className: string }) {
  const hydrateRecentRecipes = useRecipeStore((s) => s.hydrateRecent);
  const recentRecipes = useRecipeStore((s) => s.recentRecipes);

  useEffect(() => {
    hydrateRecentRecipes();
  }, [hydrateRecentRecipes]);
  return (
    <Card className={cn(className, "justify-start gap-2")}>
      <CardHeader className="flex justify-between h-12 items-center">
        <CardTitle>Saved Recipes</CardTitle>
      </CardHeader>
      <CardContent>
        {recentRecipes.length > 0 ? (
          <SavedRecipesTable recipes={recentRecipes} />
        ) : (
          <p>Add some pantry items and generate a recipe to save!</p>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {recentRecipes.length > 0 && <Link href={"/saved"}>View all</Link>}
      </CardFooter>
    </Card>
  );
}
