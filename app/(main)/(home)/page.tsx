'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert/Alert';
import { DollarSign, Megaphone } from 'lucide-react';
import WorkKindSurvey from '@components/Surveys/WorkKindSurvey';
import HappinessSurvey from '@components/Surveys/HappinessSurvey';
import Feedback from '@components/Surveys/Feedback';
import HappinessWeatherSurvey from '@components/Surveys/HappinessWeatherSurvey';
import BasicSmallCard from '@components/Cards/Basic';

const Home: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && user && !user.hasTeam) {
      router.push('/onboarding');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div>
      {user && user.hasTeam ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BasicSmallCard
              header={{
                title: 'Overall Happiness',
                icon: <DollarSign />,
              }}
              content={{
                mainContent: 'dfsdfsdfdfsdf',
                subContent: 'sdfsdfsdf',
              }}
            />
            <BasicSmallCard
              header={{
                title: 'Next Week',
                icon: <DollarSign />,
              }}
              content={{
                mainContent: 'dfsdfdfsdf',
                subContent: 'sdfsdfsdf',
              }}
            />
            <div className="col-span-2">
              <div className="flex h-full">
                <Alert variant="informative">
                  <Megaphone />
                  <AlertTitle>We think you forgot something?</AlertTitle>
                  <AlertDescription>You have not tracked your Happiness since 2 days.</AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <HappinessSurvey />
            <HappinessWeatherSurvey />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WorkKindSurvey />
            <Feedback />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
