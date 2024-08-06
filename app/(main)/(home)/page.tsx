'use client';

import * as React from 'react';
import { useAuth } from '@providers/AuthProvider';
import { Activity, Bike, Component, CircleSlash2, Target, Users } from 'lucide-react';
import {
  calculateDaysLeftInSprint,
  calculateDaysWithoutHappiness,
  formatSprintEndDate,
  getIconBasedOnScore,
  joinEmotions,
} from '@/lib/dashboardUtils';
import { WorkKind } from '@/types/WorkKindType';
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
  const { data: emotions } = useSWRClient<Emotion[]>('/v1/emotions');
  const { data: workKinds } = useSWRClient<WorkKind[]>(`/v1/workkinds/user/${user?.id}`);
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

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading your account." action="/" showContact />;

  return (
    <div>
      {user && user.hasTeam ? (
        <div className="space-y-4">
          <HappinessSurvey reloadDashboardData={mutate} user={user} />
          <WorktypeSurvey reloadDashboardData={mutate} workKinds={workKinds ?? []} user={user} />
          <EmotionSurvey reloadDashboardData={mutate} emotions={emotions ?? []} user={user} />
          <AlertWidget days={calculateDaysWithoutHappiness(lastSubmissionDateOfHappiness ?? '')} />
          <SprintWidget
            icon={<Bike className="h-5 w-5" />}
            days={calculateDaysLeftInSprint(activeSprintEndDate ?? '')}
            description="Days left in the sprint"
          />
          <Widget
            icon={<Activity className="h-5 w-5" />}
            content={joinEmotions(mostTrackedEmotions ?? [])}
            description="Most tracked emotions"
          />
          <Widget
            icon={<Component className="h-5 w-5" />}
            content={mostTrackedWorkKind}
            description="Most tracked worktype"
          />
          <NumberWidget number={numberOfDaysWithHappinessSurvey} description="Days with tracked happiness this year" />
          <NumberWidget number={numberOfHappinessSurveysToday} description="Happiness survey submitted today" />
          <TeamWidget
            icon={<Target className="h-4 w-4" />}
            number={numberOfTeams ?? 0}
            description="Number of teams you are part of"
          />
          <TeamWidget
            icon={<Users className="h-4 w-4" />}
            number={numberOfTeamMembers ?? 0}
            description="Team members over all teams"
          />
          <SprintDateWidget date={formatSprintEndDate(activeSprintEndDate)} description="End date of current sprint" />
          <Widget
            icon={<CircleSlash2 className="h-5 w-5" />}
            content={getIconBasedOnScore(averageHappinessScore ?? null)}
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
