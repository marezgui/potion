'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import type { BrewPotionResponse } from '../../types/game';

type BrewingResultProps = {
  showResult: boolean;
  lastResult: BrewPotionResponse | null;
};

export const BrewingResult = ({
  showResult,
  lastResult,
}: BrewingResultProps) => {
  return (
    <AnimatePresence>
      {showResult && lastResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`border-2 ${
              lastResult.success
                ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-300'
                : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {lastResult.success ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <Zap className="text-red-600" />
                )}
                {lastResult.success ? 'Succès !' : 'Échec'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lastResult.success && lastResult.data?.potion && (
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <div className="text-3xl">🧪</div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {lastResult.data.potion.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lastResult.data.recipe?.description ||
                          'Une potion magique mystérieuse'}
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-sm">{lastResult.message}</p>

                {lastResult.success && (
                  <div className="text-center">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      +50 XP
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
