import { readGameState, writeGameState } from '../database';
import { findRecipeByIngredients } from '../../data/game-data';
import type { Potion, Recipe, Ingredient } from '../../types/game';

export interface BrewResult {
  success: boolean;
  potion?: Potion;
  recipe?: Recipe;
  message: string;
}

export interface DiscoveredData {
  discoveredRecipes: Recipe[];
  createdPotions: Potion[];
  totalDiscovered: number;
  totalCreated: number;
}

export class PotionsService {
  static validateBrewingIngredients(ingredients: string[]): void {
    if (!ingredients || !Array.isArray(ingredients)) {
      throw new Error('Ingredients array is required');
    }

    if (ingredients.length !== 3) {
      throw new Error('Exactly 3 ingredients are required');
    }

    const uniqueIngredients = [...new Set(ingredients)];
    if (uniqueIngredients.length !== ingredients.length) {
      throw new Error('Duplicate ingredients are not allowed');
    }
  }

  static checkIngredientAvailability(ingredients: string[], inventory: Ingredient[]): void {
    for (const ingredientId of ingredients) {
      const ingredient = inventory.find(item => item.id === ingredientId);

      if (!ingredient) {
        throw new Error(`Ingredient "${ingredientId}" not found in inventory`);
      }

      if (ingredient.quantity <= 0) {
        throw new Error(`Insufficient quantity for ingredient "${ingredient.name}"`);
      }
    }
  }

  static consumeIngredients(ingredients: string[], inventory: Ingredient[]): void {
    for (const ingredientId of ingredients) {
      const ingredient = inventory.find(item => item.id === ingredientId);
      if (ingredient) {
        ingredient.quantity -= 1;
      }
    }
  }

  static createPotion(recipe: Recipe, ingredients: string[]): Potion {
    return {
      id: `${recipe.id}-${Date.now()}`,
      recipeId: recipe.id,
      name: recipe.name,
      createdAt: new Date(),
      ingredients,
    };
  }

  static brewPotion(ingredients: string[]): BrewResult {
    this.validateBrewingIngredients(ingredients);

    const gameState = readGameState();

    this.checkIngredientAvailability(ingredients, gameState.inventory);

    const recipe = findRecipeByIngredients(ingredients);
    if (!recipe) {
      return {
        success: false,
        message: 'No valid recipe found for these ingredients. Try a different combination!'
      };
    }

    this.consumeIngredients(ingredients, gameState.inventory);

    const isAlreadyDiscovered = gameState.discoveredRecipes.some(
      discoveredRecipe => discoveredRecipe.id === recipe.id
    );

    if (!isAlreadyDiscovered) {
      gameState.discoveredRecipes.push(recipe);
    }

    const newPotion = this.createPotion(recipe, ingredients);
    gameState.createdPotions.push(newPotion);

    writeGameState(gameState);

    return {
      success: true,
      potion: newPotion,
      recipe,
      message: isAlreadyDiscovered
        ? `Successfully brewed ${recipe.name}!`
        : `Congratulations! You discovered a new recipe: ${recipe.name}!`
    };
  }

  static getDiscoveredData(): DiscoveredData {
    const gameState = readGameState();

    return {
      discoveredRecipes: gameState.discoveredRecipes,
      createdPotions: gameState.createdPotions,
      totalDiscovered: gameState.discoveredRecipes.length,
      totalCreated: gameState.createdPotions.length,
    };
  }
} 