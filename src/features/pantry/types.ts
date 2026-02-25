import { z } from "zod";
import { Ingredient, IngredientCategory } from "../ingredients/types";

export type PantryItem = {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
};

export const AddPantryItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  category: z.enum(IngredientCategory),
  quantity: z.float32(),
  unit: z.string(),
  notes: z.string(),
});

export const UpdatePantryItemSchema = AddPantryItemSchema.partial();

export type AddPantryItemDto = z.infer<typeof AddPantryItemSchema>;
export type UpdatePantryItemDto = z.infer<typeof UpdatePantryItemSchema>;
