'use client';

import * as React from 'react';
import { useAuth } from '@providers/AuthProvider';
import { Sprint } from '@/types/SprintType';
import useSWRClient from '@hooks/useSWRClient';
import Error from '@components/Error/Error';
import Loading from '@components/Loading/Loading';
import CreateSprintWidget from '../components/Sprint/CreateSprintWidget';
import SprintTable from './components/SprintTable/SprintTable';
import { columns } from './components/SprintTable/columns';

const SprintPage: React.FC = () => {
  const { userId } = useAuth();
  const { data, isLoading, error } = useSWRClient<Sprint[]>(`/v1/sprint/createdBy/${userId}`);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error errorMessage="It seems there was a problem loading your sprints." action="/sprint" showContact={false} />
    );

  return <div>{data ? <SprintTable<Sprint> columns={columns} data={data} /> : <CreateSprintWidget />}</div>;
};

export default SprintPage;
