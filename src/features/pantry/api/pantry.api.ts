import { authAxios } from "../../auth";
import { AddPantryItemDto, UpdatePantryItemDto } from "../types";

export const getPantryItems = async () => {
  const { data } = await authAxios.get("/pantry");
  return data;
};

export const getRecentPantryItems = async () => {
  const { data } = await authAxios.get("/pantry/recent");
  return data;
};

export const addPantryItem = async (addPantryItemDto: AddPantryItemDto) => {
  const { data } = await authAxios.post("/pantry", addPantryItemDto);
  return data;
};

export const updatePantryItem = async (
  pantryItemId: string,
  updatePantryItemDto: UpdatePantryItemDto,
) => {
  return await authAxios.patch(`/pantry/${pantryItemId}`, updatePantryItemDto);
};

export const deletePantryItem = async (pantryItemId: string) => {
  return await authAxios.delete(`/pantry/${pantryItemId}`);
};
