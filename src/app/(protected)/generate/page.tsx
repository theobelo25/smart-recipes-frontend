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
import AddPantryItemDialog from "@/src/features/pantry/components/AddPantryItemDialog";
import { PantryItemTable } from "@/src/features/pantry/components/PantryItemTable";
import { LoadingSpinner } from "@/src/shared/components/LoadingSpinner";

export default function GenerateRecipesPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const pantryItems = usePantryStore((s) => s.pantryItems);
  const hydratePantryItems = usePantryStore((s) => s.hydrate);
  const generateRecipe = useRecipeStore((s) => s.generateRecipe);
  const generatedRecipe = useRecipeStore((s) => s.generatedRecipe);
  const isGenerating = useRecipeStore((s) => s.isGenerating);
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
    <div className="flex flex-col items-center w-full bg-bg">
      <main className="flex w-full flex-col items-center justify-center px-6 sm:px-8 md:px-10 xl:px-24 sm:items-start">
        <section className="grid grid-cols-1 gap-8 w-full xl:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-col gap-4 items-start sm:flex-row sm:justify-between sm:items-center">
              <CardTitle>
                <h3>Your Pantry</h3>
              </CardTitle>
              <AddPantryItemDialog stayOnPageAfterAdd />
            </CardHeader>
            <CardContent className="overflow-x-auto">
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
                    <FieldLabel>Use Full Pantry</FieldLabel>
                    <FieldDescription>
                      Include every item in your pantry when generating your
                      recipe.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-col gap-4 items-start sm:flex-row sm:justify-between sm:items-center">
              <CardTitle>Generate a recipe!</CardTitle>
              <Button variant="outline" onClick={handleGenerateClick}>
                {generatedRecipe ? "Generate New Recipe" : "Generate Recipe!"}
              </Button>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <LoadingSpinner inline />
                </div>
              ) : generatedRecipe ? (
                <GeneratedRecipe recipe={generatedRecipe} />
              ) : null}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 items-stretch sm:flex-row sm:justify-between sm:items-center">
              {generatedRecipe ? (
                <p>Enjoy!</p>
              ) : (
                "Click to generate your recipe!"
              )}
              {generatedRecipe && (
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={handleSaveClick}
                >
                  Save Recipe
                </Button>
              )}
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
