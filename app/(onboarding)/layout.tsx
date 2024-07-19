import * as React from 'react';
import type { Metadata } from 'next';
import 'styles/globals.css';
import outfit from 'styles/fonts';
import ThemeProvider from '@providers/ThemeProvider';
import NextAuthProvider from '@providers/NextAuthProvider';
import { AuthProvider } from '@providers/AuthProvider';

export const metadata: Metadata = {
  title: 'yappi',
  description: 'Your personal productivity assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit`}>
        <NextAuthProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <main>
                <div>{children}</div>
              </main>
            </ThemeProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
