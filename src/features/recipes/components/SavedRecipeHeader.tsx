"use client";

import { Button } from "@/src/shared/ui/button";
import { CardHeader, CardTitle } from "@/src/shared/ui/card";
import { deleteRecipe } from "../api/recipes.api";
import { Recipe } from "../types";
import { useRouter } from "next/navigation";
import { ConfirmDeleteRecipeDialog } from "./ConfirmDeleteRecipeDialog";

export default function SavedRecipeHeader({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const handleConfirmDelete = async () => {
    await deleteRecipe(recipe.id);
    router.push("/saved");
  };

  return (
    <CardHeader className="flex flex-col gap-4 items-start sm:flex-row sm:justify-between sm:items-center">
      <CardTitle>{recipe.title}</CardTitle>
      <ConfirmDeleteRecipeDialog
        recipeTitle={recipe.title}
        onConfirm={handleConfirmDelete}
        trigger={
          <Button variant="outline" type="button">
            Delete Recipe
          </Button>
        }
      />
    </CardHeader>
  );
}
