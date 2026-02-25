import { authAxios } from "../../auth";
import { CreateIngredientDto, UpdateIngredientDto } from "../types";

export const createIngredient = async (
  createIngredientDto: CreateIngredientDto,
) => {
  return await authAxios.post("/ingredients", createIngredientDto);
};

export const findAllIngredients = async () => {
  return await authAxios.get("/ingredients");
};

export const getIngredientBySlug = async (slug: string) => {
  return await authAxios.post(`/ingredients/${slug}`);
};

export const updateIngredient = async (
  ingredientId: string,
  updateIngredientDto: UpdateIngredientDto,
) => {
  return await authAxios.patch(
    `/ingredients/${ingredientId}`,
    updateIngredientDto,
  );
};

export const deleteIngredient = async (ingredientId: string) => {
  return await authAxios.delete(`/ingredients/${ingredientId}`);
};
