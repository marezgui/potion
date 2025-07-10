import type { Ingredient } from '@/types/game';
import { apiGet, apiPost } from './client';

export const getInventory = async (): Promise<Ingredient[]> => {
  return apiGet<Ingredient[]>('/api/inventory');
}

export const updateInventory = async (ingredientId: string, delta: number): Promise<void> => {
  await apiPost('/api/inventory', { 
    action: 'update', 
    ingredientId, 
    delta 
  });
}

export const resetInventory = async (): Promise<void> => {
  await apiPost('/api/inventory', { action: 'reset' });
}

export const rechargeInventory = async (): Promise<void> => {
  await apiPost('/api/inventory', { action: 'recharge' });
} 