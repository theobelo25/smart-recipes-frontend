import { z } from "zod";

export const generateRecipeSchema = z.object({
  ingredients: z.array(z.string().trim().min(1).max(100)).min(1).max(20),
});

export type GenerateRecipeDto = z.infer<typeof generateRecipeSchema>;

export const IngredientSchema = z
  .object({
    ingredient: z.object({
      name: z.string(),
    }),
    quantity: z.string(),
    unit: z.string(),
  })
  .strict();

export type Ingredient = z.infer<typeof IngredientSchema>;

export const RecipeSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    servings: z.number().int().optional(),
    prepMinutes: z.number().int().optional(),
    cookMinutes: z.number().int().optional(),
    ingredients: z.array(IngredientSchema),
    instructions: z.string(),
  })
  .strict();

export type Recipe = z.infer<typeof RecipeSchema>;

export type CreateRecipeDto = {
  title: string;
  description?: string;
  instructions: string;
  servings?: number;
  prepMinutes?: number;
  cookMinutes?: number;
  sourceUrl?: string;
  sourceName?: string;
  ingredients?: Ingredient[];
};

export type GeneratedRecipe = {
  title: string;
  description: string;

  // AI output uses an array of steps
  instructions: string[];

  // required in your AI schema
  servings: number;
  prepMinutes: number;
  cookMinutes: number;

  // AI schema allows null (and/or omitted)
  sourceUrl?: string | null;
  sourceName?: string | null;

  // pantry ingredients (IDs only; names can be derived server-side for preview)
  ingredients: Array<{
    ingredientId: string;
    quantity?: number;
    unit?: string;
    sortOrder?: number;
    name?: string;
  }>;

  // optional non-pantry additions
  extras?: Array<{
    name: string;
    quantity?: number;
    unit?: string;
  }>;
};

export const GeneratedRecipeIngredientSchemaZ = z
  .object({
    ingredientId: z.string().min(1),
    quantity: z.number().optional(),
    unit: z.string().min(1).max(50).optional(),
    sortOrder: z.number().int().min(0).optional(),
    name: z.string().min(1).optional(),
  })
  .strict();

export const GeneratedExtraSchemaZ = z
  .object({
    name: z.string().min(1).max(120),
    quantity: z.number().optional(),
    unit: z.string().min(1).max(50).optional(),
  })
  .strict();

export const SaveGeneratedRecipeSchemaZ = z
  .object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(2000),

    instructions: z.array(z.string().min(1).max(2000)).min(1).max(200),

    servings: z.number().int().min(1).max(50),
    prepMinutes: z
      .number()
      .int()
      .min(0)
      .max(24 * 60),
    cookMinutes: z
      .number()
      .int()
      .min(0)
      .max(24 * 60),

    sourceUrl: z.string().min(1).nullable().optional(),
    sourceName: z.string().min(1).max(200).nullable().optional(),

    ingredients: z.array(GeneratedRecipeIngredientSchemaZ).min(1),

    extras: z.array(GeneratedExtraSchemaZ).max(50).optional(),
  })
  .strict();

export type SaveGeneratedRecipeDto = z.infer<typeof SaveGeneratedRecipeSchemaZ>;
