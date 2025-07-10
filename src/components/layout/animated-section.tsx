'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.5,
  staggerChildren,
}: AnimatedSectionProps) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ...(staggerChildren && {
          staggerChildren,
        }),
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
