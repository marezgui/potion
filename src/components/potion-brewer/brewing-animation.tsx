'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '../ui/progress';
import {
  cauldronVariants,
  particleVariants,
  potionBottleVariants,
} from './animations';
import { brewingStages } from './constants';

type BrewingAnimationProps = {
  isLoading: boolean;
  currentStage: number;
  brewingProgress: number;
  showCauldron: boolean;
  showParticles: boolean;
  showPotionBottle: boolean;
  showExplosion: boolean;
  isExploding: boolean;
};

export const BrewingAnimation = ({
  isLoading,
  currentStage,
  brewingProgress,
  showCauldron,
  showParticles,
  showPotionBottle,
  showExplosion,
  isExploding,
}: BrewingAnimationProps) => {
  return (
    <div className="space-y-6">
      <div className="relative min-h-[300px] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-xl overflow-hidden">
        <AnimatePresence>
          {showCauldron && (
            <motion.div
              key="cauldron"
              variants={cauldronVariants}
              initial="hidden"
              animate={isExploding ? 'exploding' : 'visible'}
              exit="exit"
              className="relative"
            >
              <div className="text-6xl">🔮</div>

              {showParticles && (
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={particleVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute text-2xl"
                      style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: '-0.5rem',
                        marginTop: '-0.5rem',
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showExplosion && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl animate-pulse">💥</div>
          </div>
        )}

        <AnimatePresence>
          {showPotionBottle && (
            <motion.div
              key="potion-bottle"
              variants={potionBottleVariants}
              initial="hidden"
              animate="visible"
              className="absolute"
            >
              <div className="text-6xl">🧪</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl animate-pulse">✨</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showCauldron && !showPotionBottle && !isLoading && (
          <div className="text-center text-white/70">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-lg">Prêt pour le brassage magique !</p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {brewingStages[currentStage]?.name || 'Finalisation...'}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(brewingProgress)}%
            </span>
          </div>
          <Progress value={brewingProgress} className="h-2" />
          <div className="flex justify-center">
            <span className="text-2xl animate-pulse">
              {brewingStages[currentStage]?.icon || '🔮'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
