import { useState } from 'react';
import { brewingStages, MAX_SELECTED_INGREDIENTS } from './constants';
import type { Ingredient, BrewPotionResponse } from '@/types/game';
import { brewPotion as brewPotionApi } from '@/lib/api/potions';

export const usePotionBrewing = (
  onPotionBrewed: (response: BrewPotionResponse) => void,
) => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [brewingProgress, setBrewingProgress] = useState(0);
  const [lastResult, setLastResult] = useState<BrewPotionResponse | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showCauldron, setShowCauldron] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showPotionBottle, setShowPotionBottle] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const handleIngredientSelect = (ingredient: Ingredient) => {
    console.log('🎯 PotionBrewer - handleIngredientSelect called:', {
      ingredient: ingredient.name,
      currentSelected: selectedIngredients.map((ing) => ing.name),
      selectedCount: selectedIngredients.length,
    });

    const isAlreadySelected = selectedIngredients.some(
      (ing) => ing.id === ingredient.id,
    );

    if (isAlreadySelected) {
      console.log('🔄 Deselecting ingredient:', ingredient.name);
      setSelectedIngredients(
        selectedIngredients.filter((ing) => ing.id !== ingredient.id),
      );
    } else {
      if (selectedIngredients.length < MAX_SELECTED_INGREDIENTS) {
        console.log('➕ Adding ingredient:', ingredient.name);
        setSelectedIngredients([...selectedIngredients, ingredient]);
      } else {
        console.log('❌ Cannot add ingredient (max reached):', ingredient.name);
      }
    }
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  const animateBrewing = async () => {
    setShowCauldron(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowParticles(true);

    for (let i = 0; i < brewingStages.length; i++) {
      setCurrentStage(i);
      const stage = brewingStages[i];
      const startProgress = (i / brewingStages.length) * 100;
      const endProgress = ((i + 1) / brewingStages.length) * 100;

      const duration = stage.duration;
      const steps = 20;
      const stepDuration = duration / steps;

      for (let step = 0; step <= steps; step++) {
        const progress =
          startProgress + ((endProgress - startProgress) * step) / steps;
        setBrewingProgress(progress);
        await new Promise((resolve) => setTimeout(resolve, stepDuration));
      }
    }
  };

  const animateExplosion = async () => {
    setIsExploding(true);
    setShowExplosion(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowCauldron(false);
    setShowParticles(false);
    setShowExplosion(false);
    setIsExploding(false);
  };

  const animateSuccess = async () => {
    setShowCauldron(false);
    setShowParticles(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setShowPotionBottle(true);
  };

  const brewPotion = async () => {
    if (selectedIngredients.length === 0 || isLoading) return;

    try {
      setIsLoading(true);
      setShowResult(false);
      setLastResult(null);
      setBrewingProgress(0);
      setCurrentStage(0);

      animateBrewing();

      const result = await brewPotionApi(selectedIngredients.map((ing) => ing.id));

      await new Promise((resolve) => setTimeout(resolve, 4700));

      if (result.success) {
        await animateSuccess();
      } else {
        await animateExplosion();
      }

      setLastResult(result);
      setShowResult(true);
      onPotionBrewed(result);

      if (result.success) {
        setSelectedIngredients([]);
      }

      setTimeout(() => {
        setShowResult(false);
        setShowPotionBottle(false);
      }, 5000);
    } catch (error) {
      console.error('Error brewing potion:', error);
      await animateExplosion();
      const errorResult: BrewPotionResponse = {
        success: false,
        message: "Une erreur s'est produite lors du brassage",
      };
      setLastResult(errorResult);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
