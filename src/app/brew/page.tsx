'use client';

import { useState, useEffect } from 'react';
import { PotionBrewer } from '@/components/potion-brewer/potion-brewer';
import { toast } from 'sonner';
import type { BrewPotionResponse } from '@/types/game';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  FlaskConicalIcon,
  SparklesIcon,
  TargetIcon,
  RotateCcwIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BrewInstructions } from '@/components/brew/brew-instructions';
import { AnimatedSection } from '@/components/layout/animated-section';
import { getDiscoveredProgress } from '@/lib/api/potions';
import { resetInventory } from '@/lib/api/inventory';

export default function BrewPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(0);

  const handlePotionBrewed = (response: BrewPotionResponse) => {
    setRefreshTrigger((prev) => prev + 1);

    if (response.success && response.data?.potion) {
      toast.success(`✨ ${response.data.potion.name} créé avec succès !`, {
        description: response.message,
        action: {
          label: 'Voir les Recettes',
          onClick: () => {
            window.location.href = '/recipes';
          },
        },
      });
    } else {
      toast.error('Aucune recette trouvée', {
        description:
          response.message ||
          "Essayez une combinaison différente d'ingrédients !",
      });
    }
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const totalDiscovered = await getDiscoveredProgress();
        setDiscoveredCount(totalDiscovered);
      } catch (e) {
        console.error('Error fetching discovered recipes:', e);
      }
    };
    fetchProgress();
  }, [refreshTrigger]);

  const resetGame = async () => {
    try {
      await resetInventory();
      setRefreshTrigger((prev) => prev + 1);
      toast.success('Jeu réinitialisé avec succès !', {
        description: 'Votre aventure magique recommence !',
      });
    } catch (error) {
      console.error('Error resetting game:', error);
      toast.error('Échec de la réinitialisation du jeu');
    }
  };

  const discoveryProgress = (discoveredCount / 9) * 100;

  return (
    <>
      <AnimatedSection
        className="container mx-auto px-4 py-8"
        delay={0}
        duration={0.6}
      >
        <PageHeader
          icon="🧙‍♂️"
          title="Laboratoire de Brassage"
          description="Combinez des ingrédients magiques pour créer des potions extraordinaires"
        >
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
              <TargetIcon className="text-purple-600" />
              <span className="text-sm font-medium">Progression</span>
              <Progress value={discoveryProgress} className="w-20 h-2" />
              <span className="text-xs text-muted-foreground">
                {Math.round(discoveryProgress)}%
              </span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <TargetIcon className="mr-2" />
                  Objectifs
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>🎯 Objectifs du Jeu</DialogTitle>
                  <DialogDescription className="space-y-3">
                    <p>
                      Bienvenue dans le monde de l&apos;alchimie magique ! Votre
                      objectif est de découvrir les 9 recettes de potions
                      légendaires.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <FlaskConicalIcon className="text-purple-500" />
                        <span className="text-sm">9 Recettes à découvrir</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <SparklesIcon className="text-blue-500" />
                        <span className="text-sm">15 Ingrédients magiques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TargetIcon className="text-amber-500" />
                        <span className="text-sm">
                          364 Combinaisons possibles
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RotateCcwIcon className="text-green-500" />
                        <span className="text-sm">Temps illimité</span>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" onClick={resetGame}>
              <RotateCcwIcon className="mr-2" />
              Réinitialiser
            </Button>
          </div>
        </PageHeader>
      </AnimatedSection>

      <AnimatedSection
        className="container mx-auto px-4 mb-6"
        delay={0.2}
        duration={0.5}
      >
        <BrewInstructions />
      </AnimatedSection>

      <AnimatedSection
        className="container mx-auto px-4 pb-8"
        delay={0.4}
        duration={0.5}
      >
        <PotionBrewer onPotionBrewed={handlePotionBrewed} />
      </AnimatedSection>
    </>
  );
}
