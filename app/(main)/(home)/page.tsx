'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import { ShipWheel } from 'lucide-react';
import HappinessSurvey from '@/(main)/(home)/components/HappinessSurvey';
import Widget from '@components/Cards/Widget';
import useDashboardClient from '@hooks/useDashboardClient';
import { toast } from '@components/ui/Toast/use-toast';
import { WorkKind } from '@/types/WorkKindType';
import useWorkKindClient from '@hooks/useWorkKindClient';
import WorkKindSurvey from '@/(main)/(home)/components/WorkKindSurvey';
import { DashboardDTO } from '@/types/DashboardType';
import useEmotionClient from '@hooks/useEmotionClient';
import { Emotion } from '@/types/EmotionType';
import EmotionSurvey from '@/(main)/(home)/components/EmotionSurvey';
import WidgetRow from '@/(main)/(home)/components/WidgetRow';
import InactivityAlert from '@/(main)/(home)/components/InactivityAlert';
import FeedbackSurvey from '@/(main)/(home)/components/FeedbackSurvey';
import AverageHappinessButton from '@components/Buttons/AverageHappinessButton';

const Home: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const { getDashboardData } = useDashboardClient();
  const { getWorkKinds } = useWorkKindClient();
  const { getEmotions } = useEmotionClient();
  const [dashboardData, setDashboardData] = React.useState<DashboardDTO>();
  const [workKinds, setWorkKinds] = React.useState<WorkKind[]>([]);
  const [emotions, setEmotions] = React.useState<Emotion[]>([]);
  const [isLoadingWorkKinds, setIsLoadingWorkKinds] = React.useState<boolean>();
  const [isLoadingEmotions, setIsLoadingEmotions] = React.useState<boolean>();

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

  const fetchEmotions = async () => {
    if (!user) return;
    try {
      const response = await getEmotions();
      setEmotions(response.data);
      setIsLoadingEmotions(false);
    } catch (errorLoadingWorkKinds) {
      toast({
        title: 'Error!',
        description: `Fetching emotions `,
        variant: 'destructive',
      });
      setIsLoadingEmotions(false);
    }
  };

  React.useEffect(() => {
    if (!isLoading && user && !user.hasTeam) {
      router.push('/onboarding');
    } else {
      fetchWorkKinds().then((r) => r);
      fetchEmotions().then((r) => r);
    }
  }, [isLoading, user, router]);

  React.useEffect(() => {
    fetchDashboardData().then((r) => r);
  }, [user]);

  if (isLoading || isLoadingWorkKinds || isLoadingEmotions) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div>
      {user && user.hasTeam ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <InactivityAlert />
            <WidgetRow dashboardData={dashboardData} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <HappinessSurvey fetchDashboardData={fetchDashboardData} user={user} />
              <EmotionSurvey fetchDashboardData={fetchDashboardData} emotions={emotions} user={user} />
              <FeedbackSurvey />
            </div>
            <div className="space-y-4">
              <WorkKindSurvey fetchDashboardData={fetchDashboardData} workKinds={workKinds} user={user} />
              <div className="grid grid-cols-2 gap-4">
                <Widget
                  header={{
                    title: 'Current Velocity',
                    icon: <ShipWheel />,
                  }}
                  content={{
                    mainContent: 53,
                    subContent: 'Story Points',
                  }}
                />
                <Widget
                  header={{
                    title: 'Noch irgendwas..',
                    icon: <ShipWheel />,
                  }}
                  content={{
                    mainContent: <AverageHappinessButton score={15} />,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
