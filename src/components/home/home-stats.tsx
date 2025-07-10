import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '../ui/progress';

export const HomeStats = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Statistiques du Jeu</CardTitle>
            <CardDescription>
              Vos accomplissements magiques en un coup d&apos;œil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">9</div>
                <div className="text-sm text-muted-foreground">
                  Recettes à Découvrir
                </div>
                <Progress value={0} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                <div className="text-sm text-muted-foreground">
                  Ingrédients Magiques
                </div>
                <Progress value={100} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">∞</div>
                <div className="text-sm text-muted-foreground">
                  Possibilités
                </div>
                <Progress value={75} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
