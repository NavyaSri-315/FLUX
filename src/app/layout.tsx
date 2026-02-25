import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'FLUX - Cross-Border Payment Optimization',
  description:
    'Cheaper, faster, and more transparent international payments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} bg-background text-foreground antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
