import { readGameState, resetGameState, rechargeGameState, writeGameState } from '../database';
import type { Ingredient } from '../../types/game';
import type { InventoryUpdateRequest } from '../api/schemas';

export class InventoryService {
  static getInventory(): Ingredient[] {
    const gameState = readGameState();
    return gameState.inventory;
  }

  static resetInventory(): Ingredient[] {
    const resetState = resetGameState();
    return resetState.inventory;
  }

  static rechargeInventory(): Ingredient[] {
    const rechargedState = rechargeGameState();
    return rechargedState.inventory;
  }

  static updateInventoryItem(ingredientId: string, delta: number): Ingredient[] {
    const state = readGameState();
    const ingredient = state.inventory.find(item => item.id === ingredientId);
    
    if (!ingredient) {
      throw new Error(`Ingredient ${ingredientId} not found`);
    }

    ingredient.quantity = Math.max(0, ingredient.quantity + delta);
    writeGameState(state);
    
    return state.inventory;
  }

  static handleInventoryAction(request: InventoryUpdateRequest): { inventory: Ingredient[]; message: string } {
    switch (request.action) {
      case 'reset':
        return {
          inventory: this.resetInventory(),
          message: 'Inventory reset successfully'
        };

      case 'recharge':
        return {
          inventory: this.rechargeInventory(),
          message: 'Inventory recharged successfully'
        };

      case 'update':
        if (!request.ingredientId || typeof request.delta !== 'number') {
          throw new Error('ingredientId and delta are required for update');
        }
        return {
          inventory: this.updateInventoryItem(request.ingredientId, request.delta),
          message: 'Inventory updated successfully'
        };

      default:
        throw new Error('Invalid action. Only "reset", "recharge", "update" are supported.');
    }
  }
} 