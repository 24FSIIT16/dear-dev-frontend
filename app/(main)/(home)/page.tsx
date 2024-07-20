'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import { Bike, CircleSlash, Megaphone, Shapes, ShipWheel } from 'lucide-react';
import HappinessSurvey from '@/(main)/(home)/components/HappinessSurvey';
import Feedback from '@components/Surveys/Feedback';
import BasicSmallCard from '@components/Cards/BasicCard';
import useDashboardClient from '@hooks/useDashboardClient';
import { toast } from '@components/ui/Toast/use-toast';
import AverageHappinessButton from '@components/Buttons/AverageHappinessButton';
import { WorkKind } from '@/types/WorkKindType';
import useWorkKindClient from '@hooks/useWorkKindClient';
import Progress from '@components/ui/Progress/Progress';
import WorkKindSurvey from '@/(main)/(home)/components/WorkKindSurvey';
import { DashboardDTO } from '@/types/DashboardType';

const Home: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const { getDashboardData } = useDashboardClient();
  const { getWorkKinds } = useWorkKindClient();
  const [dashboardData, setDashboardData] = React.useState<DashboardDTO>();
  const [workKinds, setWorkKinds] = React.useState<WorkKind[]>([]);
  const [isLoadingWorkKinds, setIsLoadingWorkKinds] = React.useState<boolean>();

  // todo display this alert card only if there were no entries in the last 2 days*/

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const response = await getDashboardData(user.id);
      setDashboardData(response.data);
    } catch (authError) {
      toast({
        title: 'Error!',
        description: `Fetching average score `,
        variant: 'destructive',
      });
    }
  };

  const fetchWorkKinds = async () => {
    if (!user) return;
    try {
      const response = await getWorkKinds(user.id);
      setWorkKinds(response.data);
      setIsLoadingWorkKinds(false);
    } catch (errorLoadingWorkKinds) {
      toast({
        title: 'Error!',
        description: `Fetching workKinds `,
        variant: 'destructive',
      });
      setIsLoadingWorkKinds(false);
    }
  };

  React.useEffect(() => {
    if (!isLoading && user && !user.hasTeam) {
      router.push('/onboarding');
    } else {
      fetchWorkKinds().then((r) => r);
    }
  }, [isLoading, user, router]);

  React.useEffect(() => {
    fetchDashboardData().then((r) => r);
  }, [user]);

  if (isLoading || isLoadingWorkKinds) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div>
      {user && user.hasTeam ? (
        <div className="space-y-4">
          <BasicSmallCard
            header={{
              title: 'We think you forgot something?!',
              icon: <Megaphone />,
            }}
            content={{
              mainContent: 'No Happiness tracking since 2 days.',
            }}
            borderColor="border-primaryBlue-main"
            fontColor="text-primaryBlue-main"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BasicSmallCard
              header={{
                title: 'Average Happiness',
                icon: <CircleSlash />,
              }}
              content={{
                mainContent: <AverageHappinessButton score={dashboardData?.averageScore ?? 0} />,
              }}
            />
            <BasicSmallCard
              header={{
                title: 'Current Sprint',
                icon: <ShipWheel />,
              }}
              content={{
                mainContent: <Progress value={85} aria-label="12% increase" />,
                subContent: '4 days left',
              }}
            />
            <BasicSmallCard
              header={{
                title: 'Team Velocity',
                icon: <Bike />,
              }}
              content={{
                mainContent: (
                  <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                    53
                    <span className="text-muted-foreground text-sm font-normal">story points</span>
                  </div>
                ),
                subContent: 'sdfsdfsdf',
              }}
            />
            <BasicSmallCard
              header={{
                title: 'Most Tracked Worktypes',
                icon: <Shapes />,
              }}
              content={{
                mainContent: dashboardData?.mostVotedWorkKind?.workKindName,
                subContent: 'tracked 37 times in the last 5 Months',
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <HappinessSurvey fetchDashboardData={fetchDashboardData} user={user} />
            <BasicSmallCard
              header={{
                title: 'Survey',
              }}
              content={{
                mainContent: 'Emotions',
                subContent: 'sdfsdfsdf',
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WorkKindSurvey fetchDashboardData={fetchDashboardData} workKinds={workKinds} user={user} />
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
