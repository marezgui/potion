'use client';

import { motion } from 'framer-motion';
import { Zap, Loader2, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { InventoryDisplay } from '../inventory-display/inventory-display';
import { BrewingAnimation } from './brewing-animation';
import { BrewingResult } from './brewing-result';
import { usePotionBrewing } from './use-potion-brewing';
import { containerVariants, cardVariants } from './animations';
import type { BrewPotionResponse } from '../../types/game';

type PotionBrewerProps = {
  onPotionBrewed: (response: BrewPotionResponse) => void;
};

export const PotionBrewer = ({ onPotionBrewed }: PotionBrewerProps) => {
  const {
    selectedIngredients,
    isLoading,
    currentStage,
    brewingProgress,
    lastResult,
    showResult,
    showCauldron,
    showParticles,
    showPotionBottle,
    isExploding,
    showExplosion,
    handleIngredientSelect,
    clearSelection,
    brewPotion,
  } = usePotionBrewing(onPotionBrewed);

  const canBrew = selectedIngredients.length >= 3;
  const isOptimal = selectedIngredients.length === 3;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 ring-2 ring-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Zap className="text-purple-600 w-6 h-6" />
              </div>
              🧪 Laboratoire de Brassage
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                Principal
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <BrewingAnimation
              isLoading={isLoading}
              currentStage={currentStage}
              brewingProgress={brewingProgress}
              showCauldron={showCauldron}
              showParticles={showParticles}
              showPotionBottle={showPotionBottle}
              showExplosion={showExplosion}
              isExploding={isExploding}
            />

            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={brewPotion}
                disabled={!canBrew || isLoading}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-10 py-4 text-lg shadow-md"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Brassage en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" />
                    Brasser la Potion
                  </>
                )}
              </Button>

              {!canBrew && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <HelpCircle className="w-4 h-4" />
                  Sélectionnez au moins 3 ingrédients pour commencer
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {selectedIngredients.length >= 3 ? (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  ) : (
                    <HelpCircle className="text-gray-400 w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">
                    Sélectionnez 3 ingrédients dans l&apos;inventaire ci-dessous
                  </span>
                </div>
                <Badge
                  variant={
                    selectedIngredients.length >= 3 ? 'default' : 'secondary'
                  }
                >
                  {selectedIngredients.length}/3
                </Badge>
              </div>

              {isOptimal && (
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-200"
                >
                  ✨ Combinaison optimale !
                </Badge>
              )}
            </div>

            {selectedIngredients.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Ingrédients sélectionnés:
                </span>
                <div className="flex gap-2">
                  {selectedIngredients.map((ingredient) => (
                    <Badge
                      key={ingredient.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {ingredient.name.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="h-6 px-2 text-xs"
                >
                  Effacer tout
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-white/60 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Sparkles className="text-blue-600" />
              </div>
              Ingrédients Disponibles
              <Badge variant="outline" className="text-xs">
                Cliquez pour sélectionner
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InventoryDisplay
              onIngredientSelect={handleIngredientSelect}
              selectedIngredients={selectedIngredients.map((ing) => ing.id)}
              showSelectionMode={true}
            />
          </CardContent>
        </Card>
      </motion.div>

      <BrewingResult showResult={showResult} lastResult={lastResult} />
    </motion.div>
  );
};
