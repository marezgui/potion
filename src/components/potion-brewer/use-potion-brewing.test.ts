import { act, renderHook } from '@testing-library/react';
import { usePotionBrewing } from './use-potion-brewing';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('usePotionBrewing Hook', () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    mockCallback.mockReset();
  });

  it('starts with empty ingredients', () => {
    const { result } = renderHook(() => usePotionBrewing(mockCallback));
    
    expect(result.current.selectedIngredients).toHaveLength(0);
  });

  it('can add and remove ingredients', () => {
    const { result } = renderHook(() => usePotionBrewing(mockCallback));
    const ingredient = { id: 'herb', name: 'Magic Herb', quantity: 1 };

    act(() => {
      result.current.handleIngredientSelect(ingredient);
    });
    expect(result.current.selectedIngredients).toHaveLength(1);

    act(() => {
      result.current.handleIngredientSelect(ingredient);
    });
    expect(result.current.selectedIngredients).toHaveLength(0);
  });

  it('limits to 3 ingredients maximum', () => {
    const { result } = renderHook(() => usePotionBrewing(mockCallback));
    const ingredients = [
      { id: '1', name: 'Herb 1', quantity: 1 },
      { id: '2', name: 'Herb 2', quantity: 1 },
      { id: '3', name: 'Herb 3', quantity: 1 },
      { id: '4', name: 'Herb 4', quantity: 1 },
    ];

    ingredients.forEach(ingredient => {
      act(() => {
        result.current.handleIngredientSelect(ingredient);
      });
    });

    expect(result.current.selectedIngredients).toHaveLength(3);
  });

  it('brews potion successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ 
      success: true, 
      data: { potion: { name: 'Health Potion' } }
    }));

    jest.spyOn(global, 'setTimeout').mockImplementation((callback) => {
      callback();
      return 0 as unknown as NodeJS.Timeout;
    });

    const { result } = renderHook(() => usePotionBrewing(mockCallback));
    
    act(() => {
      result.current.handleIngredientSelect({ id: '1', name: 'Herb', quantity: 1 });
    });

    await act(async () => {
      await result.current.brewPotion();
    });

    expect(fetchMock).toHaveBeenCalledWith('/api/potions/brew', expect.any(Object));
    expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    expect(result.current.selectedIngredients).toHaveLength(0);

    jest.restoreAllMocks();
  });
});
