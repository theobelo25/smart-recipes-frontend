"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useRecipeStore } from "../stores/recipes.store";
import { GeneratedRecipe as GeneratedRecipeType } from "../types";

export default function GeneratedRecipe({
  recipe,
}: {
  recipe: GeneratedRecipeType;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState(recipe.title);
  const updateGeneratedRecipeTitle = useRecipeStore(
    (s) => s.updateGeneratedRecipeTitle,
  );

  const handleStartEdit = () => {
    setDraftTitle(recipe.title);
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    const trimmed = draftTitle.trim();
    if (trimmed) {
      updateGeneratedRecipeTitle(trimmed);
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setDraftTitle(recipe.title);
    setIsEditingTitle(false);
  };

  return (
    <article>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {isEditingTitle ? (
          <>
            <Input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") handleCancelEdit();
              }}
              className="flex-1 min-w-[200px] text-lg font-semibold"
              autoFocus
              aria-label="Recipe name"
            />
            <Button type="button" size="sm" onClick={handleSaveTitle}>
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleStartEdit}
              aria-label="Edit recipe name"
            >
              <PencilIcon className="size-4" />
              Edit name
            </Button>
          </>
        )}
      </div>
      <p>{`Prep Time: ${recipe.prepMinutes}mins`}</p>
      <p>{`Cook Time: ${recipe.cookMinutes}mins`}</p>
      <p>{`Servings: ${recipe.servings}`}</p>
      <hr className="my-4" />
      <div className="flex gap-8">
        <div>
          <h4>Pantry Ingredients</h4>
          <ul>
            {recipe.ingredients.map((i) => (
              <li key={i.name}>
                {i.quantity} {i.unit} {i.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {recipe.extras && (
            <>
              <h4>Other Ingredients</h4>
              <ul>
                {recipe.extras.map((i) => (
                  <li key={i.name}>
                    {i.quantity} {i.unit} {i.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <hr className="my-4" />
      <ul>
        {recipe.instructions.map((s: string, index: number) => {
          const stepNum = index + 1;
          return <li key={s}>{`${stepNum}. ${s}`}</li>;
        })}
      </ul>
    </article>
  );
}
