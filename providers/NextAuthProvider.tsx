import * as React from 'react';
import { SessionProvider } from 'next-auth/react';

interface NextAuthProviderProps {
  children: React.ReactNode;
}

const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);

export default NextAuthProvider;
