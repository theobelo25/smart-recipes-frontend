import { z } from "zod";

export enum IngredientCategory {
  VEGETABLE = "vegetable",
  FRUIT = "fruit",
  MEAT = "meat",
  DAIRY = "dairy",
  GRAIN = "grain",
  SPICE = "spice",
  OTHER = "other",
}

export type Ingredient = {
  id: string;
  name: string;
  slug: string;
  category: IngredientCategory;
  createdAt: Date;
  updatedAt: Date;
};

export const CreateIngredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  description: z
    .string()
    .trim()
    .min(8, "Description must be at least 6 characters.")
    .max(500, "Description must be at most 500 characters"),
  category: z.enum(IngredientCategory),
});

export const UpdateIngredientSchema = CreateIngredientSchema.partial();

export type CreateIngredientDto = z.infer<typeof CreateIngredientSchema>;
export type UpdateIngredientDto = z.infer<typeof UpdateIngredientSchema>;
