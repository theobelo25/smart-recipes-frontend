import { create } from "zustand";
import { AddPantryItemDto, PantryItem } from "../types";
import {
  addPantryItem,
  deletePantryItem,
  getPantryItems,
  getRecentPantryItems,
} from "../api/pantry.api";

interface PantryState {
  pantryItems: PantryItem[];
  recentPantryItems: PantryItem[];
  isLoading: boolean;
  error: string;

  addPantryItem: (addPantryItemDto: AddPantryItemDto) => void;
  hydrate: () => void;
  hydrateRecent: () => void;
  removePantryItem: (id: string) => void;
}

export const usePantryStore = create<PantryState>((set, get) => ({
  pantryItems: [],
  recentPantryItems: [],
  isLoading: false,
  error: "",

  addPantryItem: async (addPantryItemDto: AddPantryItemDto) => {
    const prev = get().pantryItems;
    try {
      const newPantryItem = await addPantryItem(addPantryItemDto);
      set({ pantryItems: [newPantryItem, ...prev] });
    } catch (error) {
      console.error(error);
    }
  },
  hydrate: async () => {
    set({ isLoading: true });
    try {
      const pantryItems = await getPantryItems();
      set({ pantryItems });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load pantry." });
    } finally {
      set({ isLoading: false });
    }
  },
  hydrateRecent: async () => {
    set({ isLoading: true });
    try {
      const recentPantryItems = await getRecentPantryItems();
      set({ recentPantryItems });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to load pantry." });
    } finally {
      set({ isLoading: false });
    }
  },
  removePantryItem: async (id) => {
    const prev = get().pantryItems;

    set({ pantryItems: prev.filter((i) => i.id !== id) });

    try {
      await deletePantryItem(id);
    } catch {
      set({ pantryItems: prev });
    }
  },
}));
