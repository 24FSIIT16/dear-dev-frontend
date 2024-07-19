'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert/Alert';
import { DollarSign, Laugh, Megaphone } from 'lucide-react';
import WorkKindSurvey from '@components/Surveys/WorkKindSurvey';
import HappinessSurvey from '@components/Surveys/HappinessSurvey';
import Feedback from '@components/Surveys/Feedback';
import BasicSmallCard from '@components/Cards/Basic';
import { SubmitHappinessScoreDTO } from '@/types/SurveyType';
import useSurveyClient from '@hooks/useSurveyClient';
import { toast } from '@components/ui/Toast/use-toast';
import { Button } from '@components/ui/Buttons/Button';

const Home: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const { submitHappinessScore } = useSurveyClient();

  React.useEffect(() => {
    if (!isLoading && user && !user.hasTeam) {
      router.push('/onboarding');
    }
  }, [isLoading, user, router]);

  const handleHappinessSubmit = async (score: number) => {
    const happinessScore: SubmitHappinessScoreDTO = {
      score,
      userId: user?.id,
    };
    try {
      await submitHappinessScore(happinessScore).then(() => {
        router.refresh();
        toast({
          title: 'Success!',
          description: `Survey Submitted`,
        });
      });
    } catch (error: any) {
      toast({
        title: 'Error!',
        description: `Something went wrong. Please try again: ` + error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div>
      {user && user.hasTeam ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BasicSmallCard
              header={{
                title: 'Your Overall Happiness',
              }}
              content={{
                mainContent: (
                  <Button
                    variant="mood"
                    disabled={true}
                    size="mood"
                    className="bg-primaryGreen-dark flex items-center justify-center"
                  >
                    <Laugh className="h-12 w-12 text-primaryGreen-main" />
                  </Button>
                ),
              }}
            />
            <BasicSmallCard
              header={{
                title: 'Current Sprint',
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
            <HappinessSurvey onSubmit={handleHappinessSubmit} />
            <BasicSmallCard
              header={{
                title: 'Next Week',
                icon: <DollarSign />,
              }}
              content={{
                mainContent: 'dfsdfdfsadsasddf',
                subContent: 'sdfsdfsdf',
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <WorkKindSurvey />
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
