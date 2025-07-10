import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { FlaskConicalIcon, PackageIcon, BookOpenIcon } from 'lucide-react';

const features = [
  {
    icon: FlaskConicalIcon,
    title: 'Brassage Magique',
    description:
      'Combinez des ingrédients mystiques pour créer des potions puissantes',
    href: '/brew',
  },
  {
    icon: PackageIcon,
    title: 'Inventaire Organisé',
    description: 'Gérez vos ingrédients et suivez vos ressources magiques',
    href: '/inventory',
  },
  {
    icon: BookOpenIcon,
    title: 'Recettes Secrètes',
    description: 'Découvrez et collectionnez les recettes ancestrales',
    href: '/recipes',
  },
];

export const HomeFeatures = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fonctionnalités du Jeu</h2>
          <p className="text-muted-foreground">
            Découvrez tout ce que ce monde magique a à offrir
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title}>
              <Link href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
