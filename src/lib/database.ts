import type { GameState } from '../types/game';
import { INITIAL_INGREDIENTS } from '../data/game-data';


let gameStateStore: GameState | null = null;
let isInitialized = false;

const getRandomQuantity = () => Math.floor(Math.random() * 5) + 3;

const createInitialState = (): GameState => ({
  inventory: INITIAL_INGREDIENTS.map((ingredient) => ({
    ...ingredient,
    quantity: getRandomQuantity(),
  })),
  discoveredRecipes: [],
  createdPotions: [],
});

export const initializeDatabase = (): void => {
  if (isInitialized) {
    return;
  }

  try {
    gameStateStore = createInitialState();
    isInitialized = true;
    console.log('In-memory database initialized with random state');
  } catch (error) {
    console.error('Error initializing in-memory database:', error);
    throw new Error('Failed to initialize database');
  }
};

export const readGameState = (): GameState => {
  if (!isInitialized || !gameStateStore) {
    initializeDatabase();
  }

  if (!gameStateStore) {
    throw new Error('Failed to initialize game state');
  }

  return {
    ...gameStateStore,
    inventory: gameStateStore.inventory.map(item => ({ ...item })),
    discoveredRecipes: gameStateStore.discoveredRecipes.map(recipe => ({ ...recipe })),
    createdPotions: gameStateStore.createdPotions.map(potion => ({
      ...potion,
      createdAt: new Date(potion.createdAt),
    })),
  };
};

export const writeGameState = (state: GameState): void => {
  if (!isInitialized) {
    initializeDatabase();
  }

  try {
    gameStateStore = {
      ...state,
      inventory: state.inventory.map(item => ({ ...item })),
      discoveredRecipes: state.discoveredRecipes.map(recipe => ({ ...recipe })),
      createdPotions: state.createdPotions.map(potion => ({ ...potion })),
    };
  } catch (error) {
    console.error('Error writing game state to memory:', error);
    throw new Error('Failed to save game data');
  }
};

export const resetGameState = (): GameState => {
  try {
    const initialState: GameState = {
      inventory: INITIAL_INGREDIENTS.map((ingredient) => ({ ...ingredient })),
      discoveredRecipes: [],
      createdPotions: [],
    };

    writeGameState(initialState);
    return readGameState();
  } catch (error) {
    console.error('Error resetting game state:', error);
    throw new Error('Failed to reset game data');
  }
};

export const rechargeGameState = (): GameState => {
  try {
    const state = readGameState();
    state.inventory = INITIAL_INGREDIENTS.map((ingredient) => ({
      ...ingredient,
      quantity: getRandomQuantity(),
    }));
    writeGameState(state);
    return readGameState();
  } catch (error) {
    console.error('Error recharging game state:', error);
    throw new Error('Failed to recharge game data');
  }
};

export const isDatabaseInitialized = (): boolean => isInitialized;

export const clearDatabase = (): void => {
  gameStateStore = null;
  isInitialized = false;
};

export const getStoreDirect = (): GameState | null => gameStateStore;
