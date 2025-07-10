import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollTextIcon, SparklesIcon } from 'lucide-react';

export const RecipesGuide = () => {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <ScrollTextIcon />
            Guide du Grimoire
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Découverte</Badge>
              <span>Nouvelles recettes trouvées</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">Commune</Badge>
              <span>Recettes faciles à préparer</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="destructive">Rare</Badge>
              <span>Recettes difficiles à découvrir</span>
            </div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="text-amber-500" />
              <span>Effets magiques puissants</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
