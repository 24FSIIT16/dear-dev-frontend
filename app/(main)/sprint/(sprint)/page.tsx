'use client';

import * as React from 'react';
import { useAuth } from '@providers/AuthProvider';
import { Sprint } from '@/types/SprintType';
import useSWRClient from '@hooks/useSWRClient';
import Error from '@components/Error/Error';
import Loading from '@components/Loading/Loading';
import Separator from '@components/ui/Separator/Separator';
import { Button } from '@components/ui/Buttons/Button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/Dialog/Dialog';
import SprintTable from './components/SprintTable/SprintTable';
import { columns } from './components/SprintTable/columns';
import CreateSprintWidget from '../components/Sprint/CreateSprintWidget';
import StartFirstSprintDialog from './components/StartFirstSprintDialog';

const SprintPage: React.FC = () => {
  const { userId } = useAuth();
  const { data, isLoading, error, mutate } = useSWRClient<Sprint[]>(`/v1/sprint/createdBy/${userId}`);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const hasActiveSprints = (sprints: Sprint[]): boolean => sprints.some((sprint) => sprint.active);
  const activeSprintExists = data ? hasActiveSprints(data) : false;

  const handleSprintStartSuccess = () => {
    setIsDialogOpen(false);
    mutate();
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Error errorMessage="It seems there was a problem loading your sprints." action="/sprint" showContact={false} />
    );

  return (
    <div>
      {data && data.length <= 0 && <CreateSprintWidget />}
      {data && data.length > 0 && (
        <>
          {activeSprintExists ? (
            <>
              <h1>Ein Sprint ist gestartet</h1>
              <Separator className="my-8" />
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2>Start a sprint</h2>
                  <p className="text-sm font-thin">
                    No sprint is started yet for one of your teams, you can start a sprint now.
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>Start Sprint</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <StartFirstSprintDialog onSuccess={handleSprintStartSuccess} />
                  </DialogContent>
                </Dialog>
              </div>
              <Separator className="my-8" />
            </>
          )}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2>Manage</h2>
              <p className="text-sm font-thin">Overview of your created sprints.</p>
            </div>
            <SprintTable<Sprint> columns={columns} data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default SprintPage;
