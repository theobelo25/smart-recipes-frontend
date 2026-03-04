import { z } from "zod";
import { Ingredient } from "../ingredients/types";

export type PantryItem = {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
};

export const AddPantryItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  quantity: z.float32(),
  unit: z.string(),
});

export const UpdatePantryItemSchema = AddPantryItemSchema.partial();

export type AddPantryItemDto = z.infer<typeof AddPantryItemSchema>;
export type UpdatePantryItemDto = z.infer<typeof UpdatePantryItemSchema>;
