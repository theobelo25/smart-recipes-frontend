"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui/table";
import { Recipe } from "../types";
import { Button } from "@/src/shared/ui/button";
import { useRecipeStore } from "../stores/recipes.store";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmDeleteRecipeDialog } from "./ConfirmDeleteRecipeDialog";

export function SavedRecipesTable({
  recipes,
  isRecipePage = false,
}: {
  recipes: Recipe[];
  isRecipePage?: boolean;
}) {
  const router = useRouter();
  const removeRecipe = useRecipeStore((s) => s.removeRecipe);

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
    e.stopPropagation();
    router.push(`/saved/${slug}`);
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Name</TableHead>
          {isRecipePage && (
            <TableHead className="hidden md:table-cell">Description</TableHead>
          )}
          {isRecipePage && (
            <TableHead className="w-20 text-center">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes?.map((pi) => (
          <TableRow
            key={pi.id}
            className="cursor-pointer"
            onClick={() => {
              router.push(`/saved/${pi.slug}`);
            }}
          >
            <TableCell className="font-medium">{pi.title}</TableCell>
            {isRecipePage && (
              <TableCell className="hidden max-w-md whitespace-normal md:table-cell">
                {pi.description}
              </TableCell>
            )}
            {isRecipePage && (
              <TableCell className="w-20 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={(e) => handleEditClick(e, pi.slug)}
                    aria-label="Edit recipe"
                  >
                    <Pencil className="size-4" aria-hidden />
                  </Button>
                  <ConfirmDeleteRecipeDialog
                    recipeTitle={pi.title}
                    onConfirm={async () => {
                      await removeRecipe(pi.id);
                      router.push("/saved");
                    }}
                    trigger={
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Remove recipe"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    }
                  />
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
