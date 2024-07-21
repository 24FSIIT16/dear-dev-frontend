'use client';

import * as React from 'react';
import useSWRClient from '@hooks/useSWRClient';
import { TeamWithMembers } from '@/types/TeamType';
import Loading from '@components/Loading/Loading';
import Error from '@components/Error/Error';
import { TeamMemberWithUser } from '@/types/TeamMemberType';
import TeamMemberTable from '../../../components/TeamMembersTable/TeamMemberTable';
import { columns } from '../../../components/TeamMembersTable/columns';

interface TeamMembersPageProps {
  params: {
    id: string;
  };
}

const TeamMembersPage: React.FC<TeamMembersPageProps> = ({ params }) => {
  const { id: teamId } = params;
  const { data, isLoading, error } = useSWRClient<TeamWithMembers>(`/v1/team-member/${teamId}`);

  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage="It seems there was a problem loading members." action="/team" showContact />;

  return (
    <div>
      {data ? (
        <div>
          <TeamMemberTable<TeamMemberWithUser> columns={columns} data={data.members} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TeamMembersPage;
