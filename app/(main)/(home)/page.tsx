'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@providers/AuthProvider';
import { Activity, Bike, Component, CircleSlash2, Target, Users, Annoyed, Frown, Laugh, Smile } from 'lucide-react';
import {
  calculateDaysLeftInSprint,
  calculateDaysWithoutHappiness,
  formatSprintEndDate,
  joinEmotions,
} from '@/lib/dashboardUtils';
import { WorkKindAndTeamName } from '@/types/WorkKindType';
import { DashboardDTO } from '@/types/DashboardType';
import { Emotion } from '@/types/EmotionType';
import useSWRClient from '@hooks/useSWRClient';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import NumberWidget from './components/NumberWidget';
import TeamWidget from './components/TeamWidget';
import SprintDateWidget from './components/SprintDateWidget';
import { HappinessSurvey, WorktypeSurvey, EmotionSurvey, Widget, AlertWidget, SprintWidget } from './components';

const Home: React.FC = () => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const { data: emotions } = useSWRClient<Emotion[]>('/v1/emotions');
  const { data: workKinds } = useSWRClient<WorkKindAndTeamName[]>('/v1/workkinds/team');
  const { data, mutate } = useSWRClient<DashboardDTO>('/v1/dashboard/data');
  const {
    lastSubmissionDateOfHappiness,
    activeSprintEndDate,
    mostTrackedEmotions,
    mostTrackedWorkKind,
    numberOfDaysWithHappinessSurvey,
    numberOfHappinessSurveysToday,
    numberOfTeamMembers,
    numberOfTeams,
    averageHappinessScore,
  } = data ?? {};

  const getIconBasedOnScore = (averageScore: number | null) => {
    if (!averageScore) return null;

    if (averageScore <= 5) {
      return <Frown className="h-16 w-16 group-hover:animate-spin" />;
    }
    if (averageScore <= 11) {
      return <Annoyed className="h-16 w-16 group-hover:animate-spin" />;
    }
    if (averageScore <= 17) {
      return <Smile className="h-16 w-16 group-hover:animate-spin" />;
    }
    return <Laugh className="h-16 w-16 group-hover:animate-spin" />;
  };

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2 md:row-span-2">
            <HappinessSurvey reloadDashboardData={mutate} user={user} />
          </div>
          <div className="md:row-span-2">
            <AlertWidget days={calculateDaysWithoutHappiness(lastSubmissionDateOfHappiness ?? '')} />
          </div>
          <div className="md:row-span-1">
            <Widget
              icon={<CircleSlash2 className="h-5 w-5" />}
              content={getIconBasedOnScore(averageHappinessScore ?? null)}
              description="Average Happiness"
            />
          </div>
          <div className="md:col-span-2 md:row-span-1">
            <SprintWidget
              icon={<Bike className="h-5 w-5" />}
              days={calculateDaysLeftInSprint(activeSprintEndDate ?? '')}
              description="Days left in the sprint"
            />
          </div>
          <div className="space-y-4 md:row-span-4 md:grid md:gap-4 md:space-y-0">
            <NumberWidget number={numberOfHappinessSurveysToday} description="Happiness survey submitted today" />
            <TeamWidget
              icon={<Target className="h-4 w-4" />}
              number={numberOfTeams ?? 0}
              description="Number of teams you are part of"
            />
            <Widget
              icon={<Component className="h-5 w-5" />}
              content={mostTrackedWorkKind || '-'}
              description={mostTrackedWorkKind ? 'Most tracked worktype' : 'No worktype tracked'}
            />
          </div>
          <div className="space-y-4 md:col-span-2 md:row-span-4 md:space-y-0">
            <WorktypeSurvey reloadDashboardData={mutate} workKinds={workKinds ?? []} user={user} />
          </div>
          <div className="md:col-span-3">
            <SprintDateWidget
              date={formatSprintEndDate(activeSprintEndDate)}
              description="End date of current sprint"
            />
          </div>
          <div className="md:col-span-2">
            <EmotionSurvey reloadDashboardData={mutate} emotions={emotions ?? []} user={user} />
          </div>
          <div className="md:col-span-1">
            <Widget
              icon={<Activity className="h-5 w-5" />}
              content={joinEmotions(mostTrackedEmotions ?? []) || '-'}
              description={mostTrackedEmotions?.length !== 0 ? 'Most tracked emotions' : 'No emotions tracked'}
            />
          </div>
          <div className="md:col-span-1">
            <NumberWidget
              number={numberOfDaysWithHappinessSurvey}
              description="Days with tracked happiness this year"
            />
          </div>
          <div className="md:col-span-2">
            <TeamWidget
              icon={<Users className="h-4 w-4" />}
              number={numberOfTeamMembers ?? 0}
              description="Team members over all teams"
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
