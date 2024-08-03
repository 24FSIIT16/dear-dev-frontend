'use client';

import Error from '@components/Error/Error';
import Loading from '@components/Loading/Loading';
import useSWRClient from '@hooks/useSWRClient';
import { useAuth } from '@providers/AuthProvider';
import * as React from 'react';
import CreateSprintWidget from '../components/Sprint/CreateSprintWidget';

const SprintPage: React.FC = () => {
  const { userId } = useAuth();
  const { data, isLoading, error } = useSWRClient(`/v1/sprint/createdBy/${userId}`);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error errorMessage="It seems there was a problem loading your sprints." action="/sprint" showContact={false} />
    );

  return <div>{data ? <CreateSprintWidget /> : <h1>Data</h1>}</div>;
};

export default SprintPage;
