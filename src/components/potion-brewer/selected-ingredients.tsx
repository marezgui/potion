'use client';

import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { getIngredientEmoji } from '../../utils/ingredient-helpers';
import { MAX_SELECTED_INGREDIENTS } from './constants';
import { cardVariants } from './animations';
import type { Ingredient } from '../../types/game';

type SelectedIngredientsProps = {
  selectedIngredients: Ingredient[];
  onClear: () => void;
};

export const SelectedIngredients = ({
  selectedIngredients,
  onClear,
}: SelectedIngredientsProps) => {
  return (
    <motion.div variants={cardVariants}>
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Ingrédients Sélectionnés</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-semibold">
                {selectedIngredients.length}/{MAX_SELECTED_INGREDIENTS}
              </Badge>
              {selectedIngredients.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[80px] flex items-center justify-center">
            {selectedIngredients.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <div className="text-3xl mb-2">🫙</div>
                <p className="text-sm">
                  Sélectionnez jusqu&apos;à {MAX_SELECTED_INGREDIENTS}{' '}
                  ingrédients pour commencer
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center">
                {selectedIngredients.map((ingredient, index) => (
                  <motion.div
                    key={ingredient.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center p-3 bg-white rounded-lg border border-purple-200"
                  >
                    <div className="text-3xl mb-2">
                      {getIngredientEmoji(ingredient.id)}
                    </div>
                    <div className="text-sm font-medium text-center">
                      {ingredient.name.replace('-', ' ')}
                    </div>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Qté: {ingredient.quantity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
