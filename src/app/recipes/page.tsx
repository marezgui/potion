'use client';

import { DiscoveredRecipes } from '@/components/discovered-recipes/discovered-recipes';
import { PageHeader } from '@/components/layout/page-header';
import { RecipesGuide } from '@/components/discovered-recipes/recipes-guide';
import { AnimatedSection } from '@/components/layout/animated-section';

export default function RecipesPage() {
  return (
    <>
      <AnimatedSection
        className="container mx-auto px-4 py-8"
        delay={0}
        duration={0.6}
      >
        <PageHeader
          icon="📖"
          title="Grimoire des Recettes"
          description="Découvrez et consultez toutes vos recettes de potions magiques"
        />
      </AnimatedSection>

      <AnimatedSection className="container mx-auto px-4 pb-8">
        <div className="space-y-6">
          <DiscoveredRecipes />
          <RecipesGuide />
        </div>
      </AnimatedSection>
    </>
  );
}
