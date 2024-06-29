import * as React from 'react';
import 'styles/globals.css';
import outfit from 'styles/fonts';
import ThemeProvider from '@providers/ThemeProvider';

<<<<<<< HEAD
export const metadata: Metadata = {
  title: 'yappi',
  description: 'Your personal productivity assistant',
};

=======
>>>>>>> 68a1a15 (DEAR-100: add multiple root layouts based on route groups)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit`}>
<<<<<<< HEAD
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
=======
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="flex items-center justify-center">
>>>>>>> 68a1a15 (DEAR-100: add multiple root layouts based on route groups)
            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
