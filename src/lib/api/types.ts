import type { Recipe, Potion, Ingredient } from '@/types/game';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type InventoryData = Ingredient[];

export type DiscoveredRecipesData = {
  discoveredRecipes: Recipe[];
  createdPotions: Potion[];
  totalDiscovered: number;
  totalCreated: number;
}

export type BrewPotionData = {
  potion?: Potion;
  recipe?: Recipe;
}

export type InventoryResponse = ApiResponse<InventoryData>;
export type DiscoveredRecipesResponse = ApiResponse<DiscoveredRecipesData>;
export type BrewPotionResponse = ApiResponse<BrewPotionData>; 