import { create } from "zustand";
import {
  CreateRecipeDto,
  GeneratedRecipe,
  GenerateRecipeDto,
  Recipe,
  SaveGeneratedRecipeDto,
} from "../types";
import {
  deleteRecipe,
  generateRecipe,
  getRecentRecipes,
  getRecipes,
  saveRecipe,
} from "../api/recipes.api";

interface RecipeState {
  recipes: Recipe[];
  recentRecipes: Recipe[];
  generatedRecipe: GeneratedRecipe | null;
  activeRecipe: Recipe | null;
  isLoading: boolean;
  isGenerating: boolean;
  error: string;

  generateRecipe: (generateRecipeDto: GenerateRecipeDto) => void;
  saveGeneratedRecipe: (recipe: GeneratedRecipe) => Promise<Recipe | null>;
  hydrate: () => void;
  hydrateRecent: () => void;
  removeRecipe: (id: string) => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: [],
  recentRecipes: [],
  generatedRecipe: null,
  activeRecipe: null,
  isLoading: false,
  isGenerating: false,
  error: "",

  generateRecipe: async (generateRecipeDto) => {
    set({ error: "", isGenerating: true });

    try {
      const data = await generateRecipe(generateRecipeDto);
      set({ generatedRecipe: data });
    } catch (error: unknown) {
      console.log(error);
      set({ error: "Unable to generate recipe..." });
    } finally {
      set({ isGenerating: false });
    }
  },
  saveGeneratedRecipe: async (generatedRecipe): Promise<Recipe | null> => {
    set({ error: "" });

    try {
      const savedRecipe = await saveRecipe(generatedRecipe);
      console.log(savedRecipe);

      return savedRecipe;
    } catch (error: unknown) {
      set({ error: "Unable to save recipe..." });
      return null;
    }
  },
  hydrate: async () => {
    set({ isLoading: true, error: "" });
    try {
      const recipes = await getRecipes();
      set({ recipes });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load recipes." });
    } finally {
      set({ isLoading: false });
    }
  },
  hydrateRecent: async () => {
    set({ isLoading: true, error: "" });
    try {
      const recentRecipes = await getRecentRecipes();
      set({ recentRecipes });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load recipes." });
    } finally {
      set({ isLoading: false });
    }
  },
  removeRecipe: async (id: string) => {
    const prev = get().recipes;

    // optimistic
    set({ recipes: prev.filter((r) => r.id !== id) });

    try {
      await deleteRecipe(id);
    } catch (error) {
      console.error(error);
      set({ recipes: prev, error: "Failed to delete recipe." });
    }
  },
}));
