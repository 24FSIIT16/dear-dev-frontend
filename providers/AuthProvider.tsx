'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import User from '@/types/UserType';
import { Session } from 'next-auth';

interface ExtendedSession extends Session {
  token?: string;
  accessToken?: string;
  user?: User;
  userId?: string;
}

const AuthContext = React.createContext<ExtendedSession | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [token, setToken] = React.useState<string>('');
  const [user, setUser] = React.useState<User>();
  const [userId, setUserId] = React.useState<string>();

  const sessionData = session as ExtendedSession;

  React.useEffect(() => {
    if (sessionData) {
      setToken(sessionData.accessToken as string);
      setUserId(sessionData.user?.id ?? undefined);
      setUser(sessionData.user as User);
    }
  }, [sessionData]);

  const contextValue = React.useMemo(
    () => ({
      accessToken: token,
      token,
      expires: '',
      user: user ?? undefined,
      userId: userId ?? undefined,
    }),
    [token, user, userId]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
