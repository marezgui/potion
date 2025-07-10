import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { SparklesIcon } from 'lucide-react';

export const HomeCta = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl">
              Pr&ecirc;t &agrave; devenir un Ma&icirc;tre Alchimiste&nbsp;?
            </CardTitle>
            <CardDescription className="text-purple-100">
              Votre aventure magique commence maintenant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/brew">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-purple-50"
              >
                <SparklesIcon className="mr-2" />
                Commencer l&apos;Aventure
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
