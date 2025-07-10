import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '../components/ui/sonner';
import { Navigation } from '../components/navigation/navigation';
import { PageDecorations } from '../components/layout/page-decorations';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Magical Potion Crafting Game',
  description: 'Discover powerful potions by combining magical ingredients',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative">
          <PageDecorations />
          <div className="relative z-10">{children}</div>
        </main>
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
