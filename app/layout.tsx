import type { Metadata } from 'next';
import 'styles/globals.css';
import outfit from 'styles/fonts';

export const metadata: Metadata = {
  title: 'yappi',
  description: 'Your personal productivity assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-outfit`}>{children}</body>
    </html>
  );
}
