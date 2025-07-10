'use client';

import { useState, useEffect } from 'react';
import { getIngredientEmoji } from '@/utils/ingredient-helpers';
import type { Recipe, Potion } from '@/types/game';
import { getDiscoveredRecipes } from '@/lib/api/potions';

type DiscoveredRecipesProps = {
  refreshTrigger?: number;
};

type RecipeWithStats = Recipe & {
  createdCount: number;
  lastCreated?: Date;
  isNew?: boolean;
};

export const DiscoveredRecipes = ({
  refreshTrigger = 0,
}: DiscoveredRecipesProps) => {
  const [recipes, setRecipes] = useState<RecipeWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscoveredRecipes = async () => {
    try {
      console.log('🔍 DiscoveredRecipes - Starting fetch...');
      setIsLoading(true);
      setError(null);

      const data = await getDiscoveredRecipes();

      const recipesWithStats: RecipeWithStats[] = (
        data.discoveredRecipes || []
      ).map((recipe: Recipe) => {
        const potionsForRecipe = (data.createdPotions || []).filter(
          (potion: Potion) => potion.recipeId === recipe.id,
        );

        const createdCount = potionsForRecipe.length;
        const lastCreated =
          potionsForRecipe.length > 0
            ? new Date(
                Math.max(
                  ...potionsForRecipe.map((p: Potion) =>
                    new Date(p.createdAt).getTime(),
                  ),
                ),
              )
            : undefined;

        return {
          ...recipe,
          createdCount,
          lastCreated,
          isNew:
            createdCount === 1 &&
            lastCreated &&
            Date.now() - lastCreated.getTime() < 10000,
        };
      });

      console.log('✅ Processed recipes:', recipesWithStats.length);
      setRecipes(recipesWithStats);
    } catch (err) {
      console.error('❌ Error fetching discovered recipes:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      console.log('🏁 DiscoveredRecipes - Fetch completed');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscoveredRecipes();

    const fallbackTimer = setTimeout(() => {
      console.log('⏰ Fallback timer: Forcing loading to false');
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="text-4xl mb-4">🔄</div>
        <p>Chargement des recettes...</p>
        <p className="text-sm text-gray-500 mt-2">
          Debug mode - Vérifiez la console pour les logs
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center border-2 border-red-200 bg-red-50 rounded-lg">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Erreur de chargement
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recipes.length > 0 ? (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-4 bg-white border-2 border-purple-200 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                {recipe.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
              <div className="flex gap-2 mb-2">
                {recipe.ingredients.map((ingredientId) => (
                  <span
                    key={ingredientId}
                    className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
                  >
                    {getIngredientEmoji(ingredientId)} {ingredientId}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Créé {recipe.createdCount} fois
                {recipe.lastCreated && (
                  <span className="ml-2">
                    - Dernière création:{' '}
                    {new Date(recipe.lastCreated).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center border-2 border-gray-200 rounded-lg">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Aucune recette découverte
          </h3>
          <p className="text-gray-500">
            Commencez à expérimenter avec différents ingrédients !
          </p>
        </div>
      )}
    </div>
  );
};
