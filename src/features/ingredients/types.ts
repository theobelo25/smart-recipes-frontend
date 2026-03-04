import { z } from "zod";

export type Ingredient = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export const CreateIngredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
});

export const UpdateIngredientSchema = CreateIngredientSchema.partial();

export type CreateIngredientDto = z.infer<typeof CreateIngredientSchema>;
export type UpdateIngredientDto = z.infer<typeof UpdateIngredientSchema>;
