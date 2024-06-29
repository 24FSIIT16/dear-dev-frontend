import * as React from 'react';
import 'styles/globals.css';
import outfit from 'styles/fonts';
import ThemeProvider from '@providers/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="flex items-center justify-center">
            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
