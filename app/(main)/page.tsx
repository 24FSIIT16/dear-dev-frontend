'use client';

import * as React from 'react';
import useApi from '@hooks/useApi';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import User from '@/types/UserType';

const Home: React.FC = () => {
  const { userId } = useAuth();
  const { data: user, isLoading, error } = useApi<User>(`/v1/user/${userId}`, 'GET');

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div>
      <h1>{user ? `Welcome back, ${user?.name}` : 'Welcome'}</h1>
    </div>
  );
};

export default Home;
