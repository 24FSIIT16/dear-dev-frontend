/* eslint-disable @typescript-eslint/no-unsafe-argument */

'use client';

import * as React from 'react';
import { useAuth } from '@providers/AuthProvider';
import { ActiveSprint, Sprint } from '@/types/SprintType';
import useSWRClient from '@hooks/useSWRClient';
import Error from '@components/Error/Error';
import Loading from '@components/Loading/Loading';
import Separator from '@components/ui/Separator/Separator';
import { Button } from '@components/ui/Buttons/Button';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/Dialog/Dialog';
import { toast } from 'sonner';
import axios from 'axios';
import useSprintConfigClient from '@hooks/useSprintConfigClient';
import SprintTable from './components/SprintTable/SprintTable';
import { columns } from './components/SprintTable/columns';
import { columns as activeSprintcolumns } from './components/ActiveSprintTable/columns';
import CreateSprintWidget from '../components/Sprint/CreateSprintWidget';
import StartFirstSprintDialog from './components/StartFirstSprintDialog';
import ActiveSprintTable from './components/ActiveSprintTable/ActiveSprintTable';

const SprintPage: React.FC = () => {
  const { userId } = useAuth();
  const { data, isLoading, error, mutate: reloadSprints } = useSWRClient<Sprint[]>(`/v1/sprint/createdBy/${userId}`);
  const { data: activeSprints, mutate: reloadActiveSprints } = useSWRClient<ActiveSprint[]>('/v1/sprint/active');
  const { completeSprint } = useSprintConfigClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const hasActiveSprints = (sprints: Sprint[]) => sprints.some((sprint) => sprint.status === 'IN_PROGRESS');
  const activeSprintExists = data ? hasActiveSprints(data) : false;

  const handleSprintStartSuccess = () => {
    setIsDialogOpen(false);
    reloadSprints();
    reloadActiveSprints();
  };

  const handleSprintComplete = async (rowData: ActiveSprint) => {
    const { id: sprintId } = rowData.sprint;
    try {
      await completeSprint(sprintId);
      toast.success('Sprint successfully completed');
      reloadSprints();
      reloadActiveSprints();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(`Something went wrong: ${e.message}`);
      } else {
        console.warn('Error', e);
      }
    }
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
            <div className="mb-8 space-y-4">
              <div className="space-y-1">
                <h2>Active sprints</h2>
                <p className="text-sm font-thin">Active sprints for all your teams, where you part of.</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsDialogOpen(true)}>Start Sprint</Button>
                </DialogTrigger>
                <DialogContent>
                  <StartFirstSprintDialog onSuccess={handleSprintStartSuccess} />
                </DialogContent>
              </Dialog>
              <ActiveSprintTable<ActiveSprint>
                columns={activeSprintcolumns}
                data={activeSprints ?? []}
                completeSprint={handleSprintComplete}
              />
            </div>
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
