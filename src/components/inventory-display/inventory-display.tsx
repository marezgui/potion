'use client';

import { InventoryItem } from './inventory-item';
import {
  InventoryLoading,
  InventoryError,
  InventoryEmpty,
} from './inventory-states';
import { useInventory } from './use-inventory';
import type { Ingredient } from '@/types/game';
import { useEffect } from 'react';
import { updateInventory } from '@/lib/api/inventory';

type InventoryDisplayProps = {
  onIngredientSelect?: (ingredient: Ingredient) => void;
  selectedIngredients?: string[];
  showSelectionMode?: boolean;
  refreshTrigger?: number;
};

export const InventoryDisplay = ({
  onIngredientSelect,
  selectedIngredients = [],
  showSelectionMode = false,
  refreshTrigger,
}: InventoryDisplayProps) => {
  const { inventory, isLoading, error, refetchInventory } = useInventory();

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      refetchInventory();
    }
  }, [refreshTrigger, refetchInventory]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    if (showSelectionMode && onIngredientSelect && ingredient.quantity > 0) {
      onIngredientSelect(ingredient);
    }
  };

  const handleUpdate = async (id: string, delta: number) => {
    try {
      await updateInventory(id, delta);
      refetchInventory();
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const getIngredientStatus = (ingredient: Ingredient) => {
    const isSelected = selectedIngredients.includes(ingredient.id);
    const isAvailable = ingredient.quantity > 0;
    const isSelectable = showSelectionMode && isAvailable;

    return {
      isSelected,
      isAvailable,
      isSelectable,
    };
  };

  if (isLoading) {
    return <InventoryLoading />;
  }

  if (error) {
    return <InventoryError error={error} onRetry={refetchInventory} />;
  }

  if (inventory.length === 0) {
    return <InventoryEmpty />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {inventory.map((ingredient) => {
        const { isSelected, isAvailable, isSelectable } =
          getIngredientStatus(ingredient);

        return (
          <InventoryItem
            key={ingredient.id}
            ingredient={ingredient}
            isSelected={isSelected}
            isAvailable={isAvailable}
            isSelectable={isSelectable}
            onClick={() => handleIngredientClick(ingredient)}
            onUpdate={!showSelectionMode ? handleUpdate : undefined}
          />
        );
      })}
    </div>
  );
};
