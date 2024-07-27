'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/types/UserType';
import { Session } from 'next-auth';

interface ExtendedSession extends Session {
  token?: string;
  accessToken?: string;
  user?: User;
  userId?: string;
  isLoading?: boolean;
  error?: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = React.createContext<ExtendedSession | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [token, setToken] = React.useState<string>('');
  const [user, setUser] = React.useState<User>();
  const [userId, setUserId] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const sessionData = session as ExtendedSession;

  const fetchUser = async (id: string, bearerToken: string) => {
    const response = await fetch(`${API_BASE_URL}/v1/user/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const data = await response.json();
    return data as User;
  };

  React.useEffect(() => {
    if (sessionData) {
      setToken(sessionData.accessToken as string);
      setUserId(sessionData.user?.id ?? undefined);
      if (sessionData.user?.id && sessionData.accessToken) {
        setIsLoading(true);
        fetchUser(sessionData.user.id, sessionData.accessToken)
          .then((data) => {
            setUser(data);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            setError('Error fetching user');
          });
      }
    }
  }, [sessionData]);

  const contextValue = React.useMemo(
    () => ({
      accessToken: token,
      token,
      expires: '',
      user,
      userId: userId ?? undefined,
      isLoading,
      error,
    }),
    [token, user, userId, isLoading, error]
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
