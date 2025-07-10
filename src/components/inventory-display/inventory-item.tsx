'use client';

import { Badge } from '../ui/badge';
import { getIngredientEmoji } from '../../utils/ingredient-helpers';
import type { Ingredient } from '../../types/game';
import { Button } from '../ui/button';

type InventoryItemProps = {
  ingredient: Ingredient;
  isSelected: boolean;
  isAvailable: boolean;
  isSelectable: boolean;
  onClick: () => void;
  onUpdate?: (id: string, delta: number) => void;
};

export const InventoryItem = ({
  ingredient,
  isSelected,
  isAvailable,
  isSelectable,
  onClick,
  onUpdate,
}: InventoryItemProps) => {
  const getBadgeVariant = () => {
    if (isSelected) return 'default';
    if (!isAvailable) return 'destructive';
    return 'secondary';
  };

  const getCardClassName = () => {
    const baseClasses =
      'relative p-4 rounded-lg border-2 transition-all duration-200';

    if (isSelected) {
      return `${baseClasses} border-purple-400 bg-purple-50 shadow-lg ring-2 ring-purple-200`;
    }

    if (isSelectable) {
      return `${baseClasses} border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 hover:shadow-md cursor-pointer`;
    }

    if (!isAvailable) {
      return `${baseClasses} border-gray-200 bg-gray-50 opacity-60`;
    }

    return `${baseClasses} border-gray-200 bg-white`;
  };

  return (
    <div className={getCardClassName()} onClick={onClick}>
      <div className="text-center">
        <div className="text-4xl mb-2">{getIngredientEmoji(ingredient.id)}</div>

        <h4 className="font-medium text-sm text-gray-800 mb-1 capitalize">
          {ingredient.name.replace('-', ' ')}
        </h4>

        <Badge
          variant={getBadgeVariant()}
          className="text-xs font-semibold px-2 py-1"
        >
          {ingredient.quantity}
        </Badge>

        {!isSelected && onUpdate && (
          <div className="flex justify-center gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdate(ingredient.id, -1)}
              disabled={ingredient.quantity <= 0}
            >
              -
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdate(ingredient.id, 1)}
            >
              +
            </Button>
          </div>
        )}

        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>
    </div>
  );
};
