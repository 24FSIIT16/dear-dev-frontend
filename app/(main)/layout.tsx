import * as React from 'react';
import type { Metadata } from 'next';
import outfit from 'styles/fonts';
import 'styles/globals.css';
import Navigation from '@components/Navigation/Navigation';
import Header from '@components/Header/Header';
import ThemeProvider from '@providers/ThemeProvider';
import { Toaster } from '@components/ui/Sonner/Sonner';
import NextAuthProvider from '@providers/NextAuthProvider';
import { AuthProvider } from '@providers/AuthProvider';
import { CircleCheck, CircleX } from 'lucide-react';

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
              <Toaster
                position="top-right"
                icons={{
                  success: <CircleCheck className="h-5 w-5" />,
                  error: <CircleX className="h-5 w-5" />,
                }}
              />
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
