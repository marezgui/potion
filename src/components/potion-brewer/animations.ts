export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const cauldronVariants = {
  hidden: {
    scale: 0,
    y: 100,
    opacity: 0,
    rotate: -10,
  },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
  exploding: {
    scale: [1, 1.5, 0.8],
    rotate: [0, 10, -10, 0],
    opacity: [1, 0.8, 0],
    transition: {
      duration: 1.5,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -50,
    transition: { duration: 0.5 },
  },
};

export const particleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 1, 1, 0],
    scale: [0, 1, 1.2, 0],
    y: [0, -50, -100, -150],
    x: [
      0,
      Math.random() * 40 - 20,
      Math.random() * 60 - 30,
      Math.random() * 80 - 40,
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut' as const,
    },
  },
};

export const potionBottleVariants = {
  hidden: {
    scale: 0,
    y: 50,
    opacity: 0,
    rotate: 15,
  },
  visible: {
    scale: [0, 1.3, 1],
    y: [50, -20, 0],
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut' as const,
    },
  },
};
