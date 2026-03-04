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

export function SavedRecipesTable({
  recipes,
  isRecipePage = false,
}: {
  recipes: Recipe[];
  isRecipePage?: boolean;
}) {
  const router = useRouter();
  const removeRecipe = useRecipeStore((s) => s.removeRecipe);
  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    removeRecipe(id);
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Name</TableHead>
          {isRecipePage && <TableHead>Description</TableHead>}
          {isRecipePage && (
            <TableHead className="w-20 text-center">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes?.map((pi) => (
          <TableRow
            key={pi.id}
            onClick={() => {
              router.push(`/saved/${pi.slug}`);
            }}
          >
            <TableCell className="font-medium">{pi.title}</TableCell>
            {isRecipePage && <TableCell>{pi.description}</TableCell>}
            {isRecipePage && (
              <TableCell className="w-20 text-center">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={(e) => handleDeleteClick(e, pi.id)}
                >
                  -
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
