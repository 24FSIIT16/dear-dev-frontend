'use client';

import * as React from 'react';
import useSWRClient from '@hooks/useSWRClient';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import { User } from '@/types/UserType';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert/Alert';
import { Megaphone } from 'lucide-react';
import WorkItemHappiness from '@components/Surveys/WorkItemHappiness';
import OverallHappiness from '@components/Surveys/OverallHappiness';
import Feedback from '@components/Surveys/Feedback';
import OverallHappinessWeather from '@components/Surveys/OverallHappinessWeather';

const Home: React.FC = () => {
  const { userId } = useAuth();
  const { data: user, isLoading, error } = useSWRClient<User>(`/v1/user/${userId}`);

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div className="space-y-4">
      <div className="flex w-full">
        <h1>{user ? `Welcome, ${user?.name}` : 'Welcome'}</h1>
      </div>
      <Alert variant="informative">
        <Megaphone className="h-4 w-4" />
        <AlertTitle>We think you forgot something?</AlertTitle>
        <AlertDescription>You have not tracked your Happines since 2 days.</AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-10">
        <OverallHappiness />
        <OverallHappinessWeather />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <WorkItemHappiness />
        <Feedback />
      </div>
    </div>
  );
};

export default Home;
