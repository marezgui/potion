import type { BrewPotionResponse } from '@/types/game';
import type { DiscoveredRecipesData } from './types';
import { apiGet, apiPostRaw } from './client';

export const brewPotion = async (ingredients: string[]): Promise<BrewPotionResponse> => {
  try {
    return await apiPostRaw<BrewPotionResponse>('/api/potions/brew', { ingredients });
  } catch (error) {
    console.error('Error brewing potion:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors du brassage",
    };
  }
}

export const getDiscoveredRecipes = async (): Promise<DiscoveredRecipesData> => {
  return apiGet<DiscoveredRecipesData>('/api/potions/discovered');
}

export const getDiscoveredProgress = async (): Promise<number> => {
  const data = await apiGet<{ totalDiscovered: number }>('/api/potions/discovered');
  return data.totalDiscovered || 0;
} 