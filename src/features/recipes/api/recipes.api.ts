import { authAxios } from "../../auth";
import { GenerateRecipeDto, Recipe, SaveGeneratedRecipeDto } from "../types";

export async function generateRecipe(generateRecipeDto: GenerateRecipeDto) {
  const { data } = await authAxios.post("/recipes/generate", generateRecipeDto);
  return data;
}

export async function saveRecipe(
  saveGeneratedRecipeDto: SaveGeneratedRecipeDto,
) {
  const { data } = await authAxios.post(
    "/recipes/generated",
    saveGeneratedRecipeDto,
  );
  return data;
}

export async function getRecipe(slug: string): Promise<Recipe> {
  const res = await authAxios.get<Recipe>(`/recipes/${slug}`);
  return res.data;
}

export async function getRecipes(): Promise<Recipe[]> {
  const res = await authAxios.get<Recipe[]>("/recipes");
  return res.data;
}

export async function getRecentRecipes(): Promise<Recipe[]> {
  const res = await authAxios.get<Recipe[]>("/recipes/recent");
  return res.data;
}

export async function deleteRecipe(id: string): Promise<void> {
  await authAxios.delete(`/recipes/${id}`);
}
