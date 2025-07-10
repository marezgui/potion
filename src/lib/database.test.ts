import { 
  readGameState, 
  writeGameState, 
  resetGameState,
  clearDatabase
} from './database';

describe('Game Database', () => {
  beforeEach(() => {
    clearDatabase();
  });

  it('initializes with default game state', () => {
    const gameState = readGameState();
    
    expect(gameState.inventory).toBeInstanceOf(Array);
    expect(gameState.inventory.length).toBeGreaterThan(0);
    expect(gameState.discoveredRecipes).toEqual([]);
    expect(gameState.createdPotions).toEqual([]);
  });

  it('saves and loads game state', () => {
    const initialState = readGameState();
    
    const modifiedState = {
      ...initialState,
      inventory: [...initialState.inventory]
    };
    modifiedState.inventory[0].quantity = 999;
    
    writeGameState(modifiedState);
    const loadedState = readGameState();
    
    expect(loadedState.inventory[0].quantity).toBe(999);
  });

  it('prevents data mutation', () => {
    const state1 = readGameState();
    const state2 = readGameState();
    
    state1.inventory[0].quantity = 12345;
    
    expect(state2.inventory[0].quantity).not.toBe(12345);
  });

  it('resets to initial state', () => {
    const state = readGameState();
    
    state.discoveredRecipes.push({
      id: 'test',
      name: 'Test Recipe',
      ingredients: ['herb1', 'herb2'],
      description: 'A test recipe'
    });
    writeGameState(state);
    
    const resetState = resetGameState();
    expect(resetState.discoveredRecipes).toHaveLength(0);
  });
}); 