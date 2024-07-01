import * as React from 'react';
import type { Metadata } from 'next';
import 'styles/globals.css';
import outfit from 'styles/fonts';
import ThemeProvider from '@providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'yappi',
  description: 'Your personal productivity assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
