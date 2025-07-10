'use client';

import { useState } from 'react';
import { PackageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryDisplay } from '@/components/inventory-display/inventory-display';
import { PageHeader } from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { RotateCcwIcon, BatteryIcon } from 'lucide-react';
import { InventoryGuide } from '@/components/inventory-display/inventory-guide';
import { toast } from 'sonner';
import { AnimatedSection } from '@/components/layout/animated-section';
import { resetInventory, rechargeInventory } from '@/lib/api/inventory';

export default function InventoryPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const resetGame = async () => {
    try {
      await resetInventory();
      setRefreshTrigger((prev) => prev + 1);
      toast.success('Inventaire réinitialisé avec succès !', {
        description: 'Tous vos ingrédients ont été restaurés !',
      });
    } catch (error) {
      console.error('Error resetting inventory:', error);
      toast.error("Échec de la réinitialisation de l'inventaire");
    }
  };

  const randomStock = async () => {
    try {
      await rechargeInventory();
      setRefreshTrigger((prev) => prev + 1);
      toast.success('Random Stock appliqué !', {
        description: 'Nouvelles quantités aléatoires assignées !',
      });
    } catch (error) {
      console.error('Error applying random stock:', error);
      toast.error('Échec du Random Stock');
    }
  };

  return (
    <>
      <AnimatedSection
        className="container mx-auto px-4 py-8"
        delay={0}
        duration={0.6}
      >
        <PageHeader
          icon="📦"
          title="Inventaire Magique"
          description="Gérez vos ingrédients précieux et organisez votre collection"
        >
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Button variant="destructive" onClick={resetGame}>
              <RotateCcwIcon className="mr-2" />
              Restaurer
            </Button>
            <Button variant="secondary" onClick={randomStock}>
              <BatteryIcon className="mr-2" />
              Random Stock
            </Button>
          </div>
        </PageHeader>
      </AnimatedSection>

      <AnimatedSection className="container mx-auto px-4 pb-8">
        <div className="space-y-6">
          <Card className="bg-white/60 backdrop-blur-sm border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <PackageIcon className="w-6 h-6 text-blue-600" />
                Votre Inventaire Magique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InventoryDisplay refreshTrigger={refreshTrigger} />
            </CardContent>
          </Card>

          <InventoryGuide />
        </div>
      </AnimatedSection>
    </>
  );
}
