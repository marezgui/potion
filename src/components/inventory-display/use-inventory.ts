import { useState, useEffect, useCallback } from 'react';
import type { Ingredient } from '@/types/game';
import { getInventory } from '@/lib/api/inventory';

export const useInventory = () => {
  const [inventory, setInventory] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const refetchInventory = useCallback(() => {
    const fetchWithoutLoading = async () => {
      try {
        setError(null);
        const data = await getInventory();
        setInventory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };
    fetchWithoutLoading();
  }, []);

  return {
    inventory,
    isLoading,
    error,
    refetchInventory,
  };
};
