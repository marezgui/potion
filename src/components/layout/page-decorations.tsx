const MAGIC_EMOJIS = [
  '✨',
  '🧪',
  '⚗️',
  '🔮',
  '🌟',
  '💫',
  '🎭',
  '🎪',
  '🎨',
  '🎯',
  '🏆',
  '👑',
  '⭐',
  '💎',
  '🌙',
  '☀️',
  '🌈',
  '🦄',
  '🧙',
  '🔥',
  '💧',
  '🌿',
  '🍃',
  '🌸',
  '🌺',
  '🌻',
  '🌷',
  '🌹',
  '🦋',
  '🐝',
  '📚',
  '📜',
  '🔍',
  '🗝️',
  '🎲',
  '🎰',
  '🎊',
  '🎉',
  '🎁',
  '🎀',
  '📦',
  '🎪',
  '🎨',
  '🎭',
  '🎸',
  '🎺',
  '🎷',
  '🎻',
  '🎹',
  '🥁',
];

const getRandomEmoji = () =>
  MAGIC_EMOJIS[Math.floor(Math.random() * MAGIC_EMOJIS.length)];

export function PageDecorations() {
  const topLeft = getRandomEmoji();
  const topRight = getRandomEmoji();
  const bottomLeft = getRandomEmoji();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 text-6xl opacity-10 transition-all duration-1000">
        {topLeft}
      </div>
      <div className="absolute top-40 right-20 text-4xl opacity-10 transition-all duration-1000">
        {topRight}
      </div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-10 transition-all duration-1000">
        {bottomLeft}
      </div>
    </div>
  );
}
