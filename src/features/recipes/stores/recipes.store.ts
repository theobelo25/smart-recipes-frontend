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

  generateRecipe: (generateRecipeDto: GenerateRecipeDto) => void;
  updateGeneratedRecipeTitle: (title: string) => void;
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

  generateRecipe: async (generateRecipeDto) => {
    set({ isGenerating: true });

    try {
      const data = await generateRecipe(generateRecipeDto);
      set({ generatedRecipe: data });
    } catch {
      // Error shown via toast in axios interceptor
    } finally {
      set({ isGenerating: false });
    }
  },
  updateGeneratedRecipeTitle: (title: string) => {
    const current = get().generatedRecipe;
    if (current) set({ generatedRecipe: { ...current, title } });
  },
  saveGeneratedRecipe: async (generatedRecipe): Promise<Recipe | null> => {
    try {
      const savedRecipe = await saveRecipe(generatedRecipe);
      return savedRecipe;
    } catch {
      // Error shown via toast in axios interceptor
      return null;
    }
  },
  hydrate: async () => {
    set({ isLoading: true });
    try {
      const recipes = await getRecipes();
      set({ recipes });
    } catch (error) {
      console.error(error);
      // Error shown via toast in axios interceptor
    } finally {
      set({ isLoading: false });
    }
  },
  hydrateRecent: async () => {
    set({ isLoading: true });
    try {
      const recentRecipes = await getRecentRecipes();
      set({ recentRecipes });
    } catch (error) {
      console.error(error);
      // Error shown via toast in axios interceptor
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
      set({ recipes: prev });
      // Error shown via toast in axios interceptor
    }
  },
}));
