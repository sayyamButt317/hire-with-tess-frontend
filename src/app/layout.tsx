import type { Metadata } from 'next';
import { Roboto, Open_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/Utils/Providers/ReactQueryprovider';
import React from 'react';
import { Toaster } from 'sonner';

const roboto = Roboto({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  adjustFontFallback: true,
});

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${openSans.variable} ${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Toaster
          richColors
          closeButton
          toastOptions={{
            unstyled: false,
            classNames: {
              toast: '!bg-background !text-foreground !border',
              title: '!font-medium',
              description: '!text-muted-foreground',
            },
          }}
        />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
