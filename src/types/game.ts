export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
};

export type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  description?: string;
};

export type Potion = {
  id: string;
  recipeId: string;
  name: string;
  createdAt: Date;
  ingredients: string[];
};

export type GameState = {
  inventory: Ingredient[];
  discoveredRecipes: Recipe[];
  createdPotions: Potion[];
};

export type BrewPotionRequest = {
  ingredients: string[];
};

export type BrewPotionResponse = {
  success: boolean;
  data?: {
    potion?: Potion;
    recipe?: Recipe;
  };
  message?: string;
  error?: string;
};

export type InventoryUpdateRequest = {
  action: 'reset' | 'recharge' | 'update';
  ingredientId?: string;
  delta?: number;
  ingredients?: Ingredient[];
};
