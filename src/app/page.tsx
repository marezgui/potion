'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FlaskConicalIcon, PackageIcon } from 'lucide-react';
import { PageHeader } from '@/components/layout/page-header';
import { HomeFeatures } from '@/components/home/home-features';
import { HomeStats } from '@/components/home/home-stats';
import { HomeCta } from '@/components/home/home-cta';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HomePage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.section variants={itemVariants}>
        <PageHeader
          icon="🧙‍♂️"
          title="Brassage de Potions Magiques"
          description="Maîtrisez l'art du brassage de potions et découvrez les secrets de l'alchimie magique dans cette aventure envoûtante pleine de mystères."
        >
          <div className="flex gap-4 justify-center mb-12">
            <Link href="/brew">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <FlaskConicalIcon className="mr-2" />
                Commencer le Brassage
              </Button>
            </Link>
            <Link href="/inventory">
              <Button size="lg" variant="outline">
                <PackageIcon className="mr-2" />
                Voir l&apos;Inventaire
              </Button>
            </Link>
          </div>
        </PageHeader>
      </motion.section>
      <motion.section variants={itemVariants}>
        <HomeFeatures />
      </motion.section>
      <motion.section variants={itemVariants}>
        <HomeStats />
      </motion.section>
      <motion.section variants={itemVariants}>
        <HomeCta />
      </motion.section>
    </motion.div>
  );
}
