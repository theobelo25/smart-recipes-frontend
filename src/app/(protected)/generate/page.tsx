"use client";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { usePantryStore } from "@/src/features/pantry/stores/pantry.store";
import GeneratedRecipe from "@/src/features/recipes/components/GeneratedRecipe";
import { useRecipeStore } from "@/src/features/recipes/stores/recipes.store";
import { Button } from "@/src/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import { Checkbox } from "@/src/shared/ui/checkbox";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/src/shared/ui/field";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PantryItemTable } from "@/src/features/pantry/components/PantryItemTable";

export default function GenerateRecipesPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const pantryItems = usePantryStore((s) => s.pantryItems);
  const hydratePantryItems = usePantryStore((s) => s.hydrate);
  const generateRecipe = useRecipeStore((s) => s.generateRecipe);
  const error = useRecipeStore((s) => s.error);
  const generatedRecipe = useRecipeStore((s) => s.generatedRecipe);
  const saveGeneratedRecipe = useRecipeStore((s) => s.saveGeneratedRecipe);

  const allSelected = selectedIds.length === pantryItems.length;
  const noneSelected = selectedIds.length === 0;
  const selectAllState: CheckedState = allSelected
    ? true
    : noneSelected
      ? false
      : "indeterminate";

  useEffect(() => {
    hydratePantryItems();
  }, [hydratePantryItems]);

  const handleGenerateClick = async () => {
    const ingredientsToSend =
      selectedIds.length === pantryItems.length || selectedIds.length === 0
        ? pantryItems
        : pantryItems.filter((i) => selectedIds.includes(i.id));

    const ingredientList = ingredientsToSend.map((pi) => pi.ingredient.name);
    generateRecipe({ ingredients: ingredientList });
  };

  const handleSaveClick = async () => {
    if (!generatedRecipe) return;

    const slug = (await saveGeneratedRecipe(generatedRecipe))?.slug;
    if (slug) router.push(`/saved/${slug}`);
  };

  return (
    <section className="px-64 grid grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Your Pantry</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PantryItemTable
            pantryItems={pantryItems}
            isGeneratePage={true}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </CardContent>
        <CardFooter>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                checked={selectAllState}
                onCheckedChange={(value) => {
                  if (value === true) {
                    setSelectedIds(pantryItems.map((item) => item.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
              <FieldContent>
                <FieldLabel>Use full pantry</FieldLabel>
                <FieldDescription>
                  Include every item in your pantry when generating your recipe.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Generate a recipe!</CardTitle>
          <Button variant={"default"} onClick={handleGenerateClick}>
            Generate Recipe!
          </Button>
        </CardHeader>
        <CardContent>
          {error.length ? (
            <p>{error}</p>
          ) : generatedRecipe ? (
            <GeneratedRecipe recipe={generatedRecipe} />
          ) : (
            ""
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {error.length ? (
            <p>Opps! Try again!</p>
          ) : generatedRecipe ? (
            <p>Enjoy!</p>
          ) : (
            "Click to generate your recipe!"
          )}
          <Button variant={"outline"} type="button" onClick={handleSaveClick}>
            Save Recipe
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
