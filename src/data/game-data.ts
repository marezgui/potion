import type { Ingredient, Recipe } from '../types/game';

export const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: 'argent', name: 'Argent', quantity: 5 },
  { id: 'bave-lama', name: 'Bave de lama', quantity: 5 },
  { id: 'epine-herisson', name: 'Épine de hérisson', quantity: 5 },
  { id: 'plume-griffon', name: 'Plume de griffon', quantity: 5 },
  { id: 'helium-liquide', name: 'Hélium liquide', quantity: 5 },
  { id: 'poil-yeti', name: 'Poil de yéti', quantity: 5 },
  { id: 'or', name: 'Or', quantity: 5 },
  { id: 'azote-liquide', name: 'Azote liquide', quantity: 5 },
  { id: 'queue-ecureuil', name: "Queue d'écureuil", quantity: 5 },
  { id: 'crin-licorne', name: 'Crin de licorne', quantity: 5 },
  { id: 'jus-horglup', name: 'Jus de Horglup', quantity: 5 },
  { id: 'noix-coco', name: 'Noix de coco', quantity: 5 },
  { id: 'yttrium', name: 'Yttrium', quantity: 5 },
  { id: 'mandragore', name: 'Mandragore', quantity: 5 },
];

export const RECIPES: Recipe[] = [
  {
    id: 'invisibilite',
    name: "Potion d'invisibilité",
    ingredients: ['noix-coco', 'yttrium', 'mandragore'],
    description: 'Permet de devenir invisible pendant une courte durée.',
  },
  {
    id: 'amour',
    name: "Potion d'amour",
    ingredients: ['bave-lama', 'plume-griffon', 'helium-liquide'],
    description: "Inspire l'amour et l'affection chez celui qui la boit.",
  },
  {
    id: 'jeunesse',
    name: 'Potion de jeunesse',
    ingredients: ['or', 'crin-licorne', 'azote-liquide'],
    description: 'Restaure la jeunesse et la vitalité.',
  },
  {
    id: 'immortalite',
    name: "Potion d'immortalité",
    ingredients: ['poil-yeti', 'jus-horglup', 'argent'],
    description: "Confère l'immortalité à celui qui la consomme.",
  },
  {
    id: 'clairvoyance',
    name: 'Potion de Clairvoyance',
    ingredients: ['epine-herisson', 'jus-horglup', 'noix-coco'],
    description: "Permet de voir l'avenir et de prédire les événements.",
  },
  {
    id: 'force',
    name: 'Potion de Force',
    ingredients: ['poil-yeti', 'or', 'argent'],
    description: 'Augmente considérablement la force physique.',
  },
  {
    id: 'vitesse',
    name: 'Potion de Vitesse',
    ingredients: ['helium-liquide', 'plume-griffon', 'azote-liquide'],
    description: 'Permet de se déplacer à une vitesse surhumaine.',
  },
  {
    id: 'guerison',
    name: 'Potion de Guérison',
    ingredients: ['crin-licorne', 'mandragore', 'bave-lama'],
    description: 'Soigne instantanément toutes les blessures.',
  },
  {
    id: 'transformation',
    name: 'Potion de Transformation',
    ingredients: ['queue-ecureuil', 'yttrium', 'epine-herisson'],
    description: 'Permet de changer de forme à volonté.',
  },
];



export const findRecipeByIngredients = (
  ingredients: string[],
): Recipe | undefined => {
  return RECIPES.find((recipe) => {
    const sortedRecipeIngredients = [...recipe.ingredients].sort();
    const sortedInputIngredients = [...ingredients].sort();

    return (
      sortedRecipeIngredients.length === sortedInputIngredients.length &&
      sortedRecipeIngredients.every(
        (ingredient, index) => ingredient === sortedInputIngredients[index],
      )
    );
  });
};
