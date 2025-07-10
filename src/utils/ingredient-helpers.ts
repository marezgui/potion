export const getIngredientEmoji = (ingredientId: string): string => {
  const emojiMap: Record<string, string> = {
    argent: '🥈',
    'bave-lama': '🦙',
    'epine-herisson': '🦔',
    'plume-griffon': '🦅',
    'helium-liquide': '🌬️',
    'poil-yeti': '🦣',
    or: '🥇',
    'azote-liquide': '❄️',
    'queue-ecureuil': '🐿️',
    'crin-licorne': '🦄',
    'jus-horglup': '🧪',
    'noix-coco': '🥥',
    yttrium: '⚗️',
    mandragore: '🌱',
  };
  return emojiMap[ingredientId] || '🔮';
};

export const formatIngredientName = (ingredientId: string): string => {
  return ingredientId.replace('-', ' ');
};

export const getIngredientDisplayInfo = (ingredientId: string) => {
  return {
    emoji: getIngredientEmoji(ingredientId),
    name: formatIngredientName(ingredientId),
  };
};
