'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { useAuth } from '@providers/AuthProvider';
import { Activity, Bike, Component, CircleSlash2, Annoyed } from 'lucide-react';
import useDashboardClient from '@hooks/useDashboardClient';
import { toast } from 'sonner';
import { WorkKind } from '@/types/WorkKindType';
import useWorkKindClient from '@hooks/useWorkKindClient';
import { DashboardDTO } from '@/types/DashboardType';
import useEmotionClient from '@hooks/useEmotionClient';
import { Emotion } from '@/types/EmotionType';
import { HappinessSurvey, WorktypeSurvey, EmotionSurvey, Widget, AlertWidget, SprintWidget } from './components';

const Home: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const { getDashboardData } = useDashboardClient();
  const { getWorkKinds } = useWorkKindClient();
  const { getEmotions } = useEmotionClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      toast.error('Error fetching average score');
    }
  };

  const fetchWorkKinds = async () => {
    if (!user) return;
    try {
      const response = await getWorkKinds(user.id);
      setWorkKinds(response.data);
      setIsLoadingWorkKinds(false);
    } catch (errorLoadingWorkKinds) {
      toast.error('Error fetching worktypes');
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
      toast.error('Error fetching emotions');
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
          <HappinessSurvey fetchDashboardData={fetchDashboardData} user={user} />
          <WorktypeSurvey fetchDashboardData={fetchDashboardData} workKinds={workKinds} user={user} />
          <EmotionSurvey fetchDashboardData={fetchDashboardData} emotions={emotions} user={user} />
          <AlertWidget days={12} />
          <SprintWidget icon={<Bike className="h-5 w-5" />} content="4" description="Days left in the sprint" />
          <Widget icon={<Activity className="h-5 w-5" />} content="Bored, Lonely" description="Most tracked emotions" />
          <Widget icon={<Component className="h-5 w-5" />} content="Coding" description="Most tracked worktype" />
          <Widget
            icon={<CircleSlash2 className="h-5 w-5" />}
            content={<Annoyed className="h-16 w-16 group-hover:animate-spin" />}
            description="Average Happiness"
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
