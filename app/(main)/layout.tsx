import * as React from 'react';
import type { Metadata } from 'next';
import outfit from 'styles/fonts';
import 'styles/globals.css';
import Navigation from '@components/Navigation/Navigation';
import Header from '@components/Header/Header';
import ThemeProvider from '@providers/ThemeProvider';
import Toaster from '@components/ui/Toast/Toaster';
import NextAuthProvider from '@providers/NextAuthProvider';
import { AuthProvider } from '@providers/AuthProvider';

export const metadata: Metadata = {
  title: 'yappi',
  description: 'Your personal productivity assistant',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit`}>
        <NextAuthProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Navigation />
              <Header />
              <Toaster />
              <main className="mt-10 flex justify-center">
                <div className="ml-20 w-full max-w-7xl px-4">{children}</div>
              </main>
            </ThemeProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
