'use client';

import * as React from 'react';
import { useAuth } from '@providers/AuthProvider';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import useSWRClient from '@hooks/useSWRClient';
import { Team } from '@/types/TeamType';
import { columns } from '../components/TeamTable/columns';
import TeamTable from '../components/TeamTable/TeamTable';

const TeamPage: React.FC = () => {
  const { userId } = useAuth();
  const { data, isLoading, error } = useSWRClient<Team[]>(`/v1/team/user/${userId}`);

  if (isLoading) return <Loading />;
  if (error)
    return <Error errorMessage="It seems there was a problem loading your teams." action="/team" showContact />;

  return (
    <div>
      {data ? (
        <div className="space-y-4">
          <TeamTable<Team> columns={columns} data={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TeamPage;
