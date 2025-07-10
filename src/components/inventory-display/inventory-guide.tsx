import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { TargetIcon, ZapIcon } from 'lucide-react';

export const InventoryGuide = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <TargetIcon />
            Guide de l&apos;Inventaire
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">5</Badge>
              <span>Ingrédients disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">0</Badge>
              <span>En rupture de stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Sélectionné</Badge>
              <span>Prêt pour le brassage</span>
            </div>
            <div className="flex items-center gap-2">
              <ZapIcon className="text-amber-500" />
              <span>Consommé lors du brassage</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
