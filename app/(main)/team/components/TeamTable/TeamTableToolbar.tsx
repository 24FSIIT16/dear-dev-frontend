/* eslint-disable @typescript-eslint/no-unsafe-return */

import * as React from 'react';
import { Button } from '@components/ui/Buttons/Button';
import { Table } from '@tanstack/react-table';
import Input from '@components/ui/Input/Input';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/Dialog/Dialog';
import CreateTeamDialog from '@/(onboarding)/onboarding/components/CreateTeamDialog';
import JoinTeamDialog from '@/(onboarding)/onboarding/components/JoinTeamDialog';
import TeamTableViewOptions from './TeamTableViewOptions';

interface TeamTableToolbarProps<TData> {
  table: Table<TData>;
}

const TeamTableToolbar = <TData,>({ table }: TeamTableToolbarProps<TData>) => (
  <div className="flex items-center justify-between">
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Team</Button>
        </DialogTrigger>
        <DialogContent>
          <CreateTeamDialog />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Join Team</Button>
        </DialogTrigger>
        <DialogContent>
          <JoinTeamDialog />
        </DialogContent>
      </Dialog>
    </div>
    <div className="flex gap-2">
      <Input
        placeholder="Search name"
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        className="h-10"
      />
      <TeamTableViewOptions table={table} />
    </div>
  </div>
);

export default TeamTableToolbar;
