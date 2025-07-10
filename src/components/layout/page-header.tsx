'use client';

import { motion } from 'framer-motion';
import React from 'react';

type PageHeaderProps = {
  icon: string;
  title: string;
  description: string;
  animated?: boolean;
  children?: React.ReactNode;
};

export const PageHeader = ({
  icon,
  title,
  description,
  animated = false,
  children,
}: PageHeaderProps) => {
  const IconWrapper = animated ? motion.div : 'div';
  const iconProps = animated
    ? {
        initial: { scale: 0.8 },
        animate: { scale: 1 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <div className="text-center mb-8 pt-6">
      <IconWrapper className="text-6xl mb-4" {...iconProps}>
        {icon}
      </IconWrapper>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      {children}
    </div>
  );
};
