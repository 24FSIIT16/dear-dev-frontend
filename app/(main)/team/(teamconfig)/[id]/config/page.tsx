'use client';

import * as React from 'react';
import useSWRClient from '@hooks/useSWRClient';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { TeamConfigType } from '@/types/TeamConfigType';
import TeamConfigForm from './components/TeamConfigForm';

interface TeamConfigPageProps {
  params: {
    id: string;
  };
}

const defaultConfig: TeamConfigType = {
  teamName: '',
  workKinds: [],
  happinessSurvey: true,
  workKindSurvey: true,
  emotionSurvey: true,
};

const TeamConfigPage: React.FC<TeamConfigPageProps> = ({ params }) => {
  const { id: teamId } = params;
  const { data, isLoading, error } = useSWRClient<TeamConfigType>(`/v1/team/${teamId}/config`);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error errorMessage="It seems there was a problem loading the team configuration." action="/team" showContact />
    );

  return <TeamConfigForm config={data || defaultConfig} />;
};

export default TeamConfigPage;
